import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

// Clave única en AsyncStorage para almacenar el arreglo de productos
const STORAGE_KEY = '@productos_list';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null); // id del producto en edición o null

  // 1. Cargar productos desde AsyncStorage al iniciar la app
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const datos = await AsyncStorage.getItem(STORAGE_KEY);
      if (datos !== null) {
        setProductos(JSON.parse(datos));
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  // 2. Guardar arreglo de productos en AsyncStorage
  const guardarEnStorage = async (nuevaLista) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevaLista));
    } catch (error) {
      console.error('Error al guardar en AsyncStorage:', error);
    }
  };

  // 3. Registrar o Actualizar producto
  const handleGuardarProducto = async () => {
    if (!nombre.trim() || !precio.trim()) {
      Alert.alert('Campos incompletos', 'Ingrese el nombre y el precio del producto.');
      return;
    }

    if (editandoId !== null) {
      // Modo edición: actualizamos el producto existente
      const listaActualizada = productos.map((item) =>
        item.id === editandoId
          ? { ...item, nombre: nombre.trim(), precio: precio.trim() }
          : item
      );
      setProductos(listaActualizada);
      await guardarEnStorage(listaActualizada);
      setEditandoId(null);
    } else {
      // Modo registro: nuevo producto con ID único
      const nuevoProducto = {
        id: Date.now().toString(),
        nombre: nombre.trim(),
        precio: precio.trim(),
      };
      const nuevaLista = [...productos, nuevoProducto];
      setProductos(nuevaLista);
      await guardarEnStorage(nuevaLista);
    }

    setNombre('');
    setPrecio('');
  };

  // 4. Cargar datos del producto en los inputs para editar
  const handleEditar = (item) => {
    setNombre(item.nombre);
    setPrecio(item.precio);
    setEditandoId(item.id);
  };

  // Cancelar la edición
  const handleCancelarEdicion = () => {
    setNombre('');
    setPrecio('');
    setEditandoId(null);
  };

  // 5. Eliminar un producto individual
  const handleEliminarIndividual = (id) => {
    Alert.alert(
      'Confirmar',
      '¿Desea eliminar este producto?',
      [
        { text: 'CANCELAR', style: 'cancel' },
        {
          text: 'ELIMINAR',
          style: 'destructive',
          onPress: async () => {
            const listaFiltrada = productos.filter((item) => item.id !== id);
            setProductos(listaFiltrada);
            await guardarEnStorage(listaFiltrada);
            if (editandoId === id) {
              handleCancelarEdicion();
            }
          },
        },
      ]
    );
  };

  // 6. Eliminar todos los productos con modal de confirmación
  const handleEliminarTodos = () => {
    if (productos.length === 0) {
      Alert.alert('Aviso', 'No hay productos para eliminar.');
      return;
    }

    Alert.alert(
      'Confirmar',
      '¿Desea eliminar todos los productos?',
      [
        { text: 'CANCELAR', style: 'cancel' },
        {
          text: 'ELIMINAR',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(STORAGE_KEY);
              setProductos([]);
              handleCancelarEdicion();
            } catch (error) {
              Alert.alert('Error', 'No se pudieron eliminar los productos.');
            }
          },
        },
      ]
    );
  };

  // Renderizar cada fila de la lista de productos
  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemText} numberOfLines={1}>
        {item.nombre} - S/. {item.precio}
      </Text>
      <View style={styles.actionsContainer}>
        {/* Botón Editar (lápiz celeste) */}
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => handleEditar(item)}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="pencil-alt" size={15} color="#00bcd4" />
        </TouchableOpacity>

        {/* Botón Eliminar (tacho rojo) */}
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => handleEliminarIndividual(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash" size={18} color="#e53935" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header con icono de tuerca */}
      <View style={styles.header}>
        <View style={{ width: 30 }} />
        <Text style={styles.title}>Gestor de Productos</Text>
        <TouchableOpacity style={styles.settingsBtn}>
          <Ionicons name="settings" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Input Nombre del producto */}
        <TextInput
          style={styles.input}
          placeholder="Nombre del producto"
          placeholderTextColor="#9e9e9e"
          value={nombre}
          onChangeText={setNombre}
        />

        {/* Input Precio */}
        <TextInput
          style={styles.input}
          placeholder="Precio"
          placeholderTextColor="#9e9e9e"
          keyboardType="numeric"
          value={precio}
          onChangeText={setPrecio}
        />

        {/* Botón Guardar / Actualizar Producto */}
        <TouchableOpacity
          style={styles.btnGuardar}
          onPress={handleGuardarProducto}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>
            {editandoId !== null ? 'ACTUALIZAR PRODUCTO' : 'GUARDAR PRODUCTO'}
          </Text>
        </TouchableOpacity>

        {/* Botón cancelar si está en modo edición */}
        {editandoId !== null && (
          <TouchableOpacity
            style={styles.btnCancelar}
            onPress={handleCancelarEdicion}
            activeOpacity={0.8}
          >
            <Text style={styles.btnTextCancelar}>CANCELAR EDICIÓN</Text>
          </TouchableOpacity>
        )}

        {/* Botón Eliminar Todos */}
        <TouchableOpacity
          style={styles.btnEliminarTodos}
          onPress={handleEliminarTodos}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>ELIMINAR TODOS</Text>
        </TouchableOpacity>

        {/* Lista de productos registrados */}
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay productos registrados.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  settingsBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f', // Rojo según la captura
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  btnGuardar: {
    backgroundColor: '#0288d1', // Azul según la captura
    height: 42,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnCancelar: {
    backgroundColor: '#757575',
    height: 36,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnTextCancelar: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  btnEliminarTodos: {
    backgroundColor: '#d32f2f', // Rojo según la captura
    height: 42,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#80cbc4', // Verde menta según la captura
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#004d40',
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    padding: 6,
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9e9e9e',
    fontSize: 14,
    marginTop: 20,
  },
});
