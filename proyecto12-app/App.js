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
import axios from 'axios';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const API_URL = 'https://api.tvmaze.com/shows';

export default function App() {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  // 1. Obtener series de TV Maze usando axios
  const fetchShows = async () => {
    setLoading(true);
    setError(false);
    setShows([]);
    setFilteredShows([]);
    try {
      const response = await axios.get(API_URL);
      // axios almacena los datos recibidos en response.data
      const data = response.data || [];
      setShows(data);
      setFilteredShows(data);
      setSearch('');
    } catch (err) {
      console.error('Error al obtener series con Axios:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  // 2. Búsqueda por nombre o género
  const handleSearch = (text) => {
    setSearch(text);
    if (!text.trim()) {
      setFilteredShows(shows);
      return;
    }
    const query = text.toLowerCase();
    const filtered = shows.filter((item) => {
      const nameMatch = item.name?.toLowerCase().includes(query);
      const genreMatch = item.genres?.some((g) => g.toLowerCase().includes(query));
      return nameMatch || genreMatch;
    });
    setFilteredShows(filtered);
  };

  // Render: Vista de Carga
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
        <ActivityIndicator size="large" color="#7b2cbf" />
        <Text style={styles.loadingText}>Cargando series...</Text>
      </View>
    );
  }

  // Render: Vista de Error
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
        <MaterialCommunityIcons name="cloud-off-outline" size={75} color="#e63946" />
        <Text style={styles.errorTitle}>Ocurrió un problema</Text>
        <Text style={styles.errorSubtitle}>No se pudieron cargar las series.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchShows} activeOpacity={0.8}>
          <Ionicons name="reload" size={16} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Extraer año de premier (ej: "2013-06-24" -> "2013")
  const getYear = (premiered) => {
    if (!premiered) return 'N/A';
    return premiered.split('-')[0];
  };

  // Render: Tarjeta de Serie
  const renderShowItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            item.image?.medium ||
            item.image?.original ||
            'https://via.placeholder.com/210x295?text=Sin+Imagen',
        }}
        style={styles.showImage}
        resizeMode="cover"
      />
      <View style={styles.showInfo}>
        <Text style={styles.showTitle} numberOfLines={1}>
          {item.name}
        </Text>

        {/* Géneros */}
        <View style={styles.rowMeta}>
          <Feather name="tag" size={12} color="#888" />
          <Text style={styles.metaText} numberOfLines={1}>
            {item.genres && item.genres.length > 0 ? item.genres.join(', ') : 'General'}
          </Text>
        </View>

        {/* Idioma */}
        <View style={styles.rowMeta}>
          <MaterialCommunityIcons name="translate" size={13} color="#888" />
          <Text style={styles.metaText}>{item.language || 'Desconocido'}</Text>
        </View>

        {/* Año de estreno */}
        <View style={styles.rowMeta}>
          <Feather name="calendar" size={12} color="#888" />
          <Text style={styles.metaText}>{getYear(item.premiered)}</Text>
        </View>

        {/* Rating */}
        <View style={styles.rowMeta}>
          <Ionicons name="star" size={13} color="#f5a623" />
          <Text style={styles.ratingText}>
            {item.rating?.average ? item.rating.average : 'S/V'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#7b2cbf" />

      {/* Header Morado */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Explorador de Series</Text>
          <Text style={styles.headerSubtitle}>Descubre tus series favoritas</Text>
        </View>
        <Ionicons name="tv-outline" size={28} color="#fff" />
      </View>

      <View style={styles.container}>
        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#8e8e93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por título o género..."
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

        {/* Contador de series encontradas */}
        <Text style={styles.counterText}>
          {filteredShows.length} {filteredShows.length === 1 ? 'serie encontrada' : 'series encontradas'}
        </Text>

        {/* Lista de series */}
        <FlatList
          data={filteredShows}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderShowItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron series con ese criterio.</Text>
            </View>
          }
        />
      </View>

      {/* Botón flotante para refrescar */}
      <TouchableOpacity style={styles.fab} onPress={fetchShows} activeOpacity={0.8}>
        <Ionicons name="reload" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#7b2cbf',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    backgroundColor: '#7b2cbf',
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
    color: '#e0aaff',
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
    marginBottom: 8,
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
  counterText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    marginLeft: 2,
  },
  listContent: {
    paddingBottom: 80,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eef1f6',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  showImage: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  showInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  showTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  rowMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  metaText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 6,
    flexShrink: 1,
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7b2cbf',
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
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 14,
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 14,
  },
  errorSubtitle: {
    fontSize: 13,
    color: '#6c757d',
    marginTop: 4,
    marginBottom: 16,
  },
  retryButton: {
    flexDirection: 'row',
    backgroundColor: '#7b2cbf',
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