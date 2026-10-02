import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const API_URL = 'https://dummyjson.com/products';
// const API_URL = 'https://dummyjson.com/productsa13'; // Error con Fetch

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  // 1. Obtener productos de la API con fetch()
  const fetchProducts = async () => {
    setLoading(true);
    setError(false);
    setProducts([]);
    setFilteredProducts([]);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      setProducts(data.products || []);
      setFilteredProducts(data.products || []);
      setSearch('');
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Filtrado por nombre o categoría
  const handleSearch = (text) => {
    setSearch(text);
    if (!text.trim()) {
      setFilteredProducts(products);
      return;
    }
    const query = text.toLowerCase();
    const filtered = products.filter((item) => {
      const titleMatch = item.title?.toLowerCase().includes(query);
      const categoryMatch = item.category?.toLowerCase().includes(query);
      return titleMatch || categoryMatch;
    });
    setFilteredProducts(filtered);
  };

  // Render: Vista de Carga
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f7fb" />
        <MaterialCommunityIcons name="storefront-outline" size={70} color="#0066cc" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
        <ActivityIndicator size="large" color="#0066cc" style={{ marginTop: 15 }} />
      </View>
    );
  }

  // Render: Vista de Error
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f7fb" />
        <MaterialCommunityIcons name="cloud-off-outline" size={80} color="#e53935" />
        <Text style={styles.errorTitle}>Ocurrió un problema</Text>
        <Text style={styles.errorSubtitle}>No se pudieron cargar los productos.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts} activeOpacity={0.8}>
          <Ionicons name="reload" size={18} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render: Tarjeta de Producto
  const renderProductItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.thumbnail || (item.images && item.images[0]) }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.rowMeta}>
          <Ionicons name="pricetag-outline" size={13} color="#888" />
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>

        <View style={styles.rowMeta}>
          <Ionicons name="star" size={13} color="#f5a623" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>

        <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>

        {item.discountPercentage ? (
          <View style={styles.discountBadge}>
            <Ionicons name="arrow-down" size={11} color="#2e7d32" />
            <Text style={styles.discountText}>
              {item.discountPercentage}% de descuento
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0066cc" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Catálogo de Productos</Text>
          <Text style={styles.headerSubtitle}>Productos obtenidos desde una API REST</Text>
        </View>
        <MaterialCommunityIcons name="storefront" size={28} color="#fff" />
      </View>

      <View style={styles.container}>
        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#8e8e93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar producto o categoría..."
            placeholderTextColor="#8e8e93"
            value={search}
            onChangeText={handleSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={18} color="#8e8e93" />
            </TouchableOpacity>
          )}
        </View>

        {/* Contador de productos */}
        <View style={styles.counterCard}>
          <View style={styles.counterIconWrapper}>
            <MaterialCommunityIcons name="cube-outline" size={20} color="#0066cc" />
          </View>
          <View>
            <Text style={styles.counterLabel}>Productos encontrados</Text>
            <Text style={styles.counterValue}>{filteredProducts.length}</Text>
          </View>
        </View>

        {/* Lista de productos */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron productos coincidentes.</Text>
            </View>
          }
        />
      </View>

      {/* Botón flotante para refrescar */}
      <TouchableOpacity style={styles.fab} onPress={fetchProducts} activeOpacity={0.8}>
        <Ionicons name="reload" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0066cc',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#d0e2ff',
    fontSize: 12,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },
  counterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#edf0f5',
  },
  counterIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e6f0fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  counterLabel: {
    fontSize: 11,
    color: '#666',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  listContent: {
    paddingBottom: 80,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eef1f6',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  productInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  rowMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  categoryText: {
    fontSize: 12,
    color: '#777',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  ratingText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 4,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0066cc',
    marginTop: 4,
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  discountText: {
    fontSize: 10,
    color: '#2e7d32',
    fontWeight: 'bold',
    marginLeft: 2,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0066cc',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 14,
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 14,
  },
  errorSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    marginBottom: 16,
  },
  retryButton: {
    flexDirection: 'row',
    backgroundColor: '#0066cc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
  },
});