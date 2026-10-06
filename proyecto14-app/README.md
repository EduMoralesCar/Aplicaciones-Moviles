# Proyecto 14: Gestor de Productos con AsyncStorage

Aplicación móvil desarrollada con **React Native** y **Expo** que permite gestionar un inventario de productos (nombre y precio) con persistencia local mediante **`AsyncStorage`**. Los datos no se pierden al cerrar o reiniciar la aplicación.

---

## 📱 Funcionalidades Principales

1. **Registrar productos:** Permite ingresar el nombre y precio del producto y guardarlo en la lista.
2. **Persistencia local en AsyncStorage:** Convierte el arreglo de productos a formato JSON (`JSON.stringify`) y lo almacena en el teléfono.
3. **Listar productos en pantalla:** Muestra cada producto con diseño en tarjeta (color verde menta, nombre y precio en soles).
4. **Editar producto:** Al presionar el botón de lápiz celeste, carga los datos del producto en los campos para actualizarlos.
5. **Eliminar producto individual:** Al presionar el tacho de basura rojo de un producto, pide confirmación y lo borra de la lista y del almacenamiento.
6. **Eliminar todos los productos:** Al presionar el botón rojo "ELIMINAR TODOS", abre un cuadro de diálogo de confirmación (`Alert.alert`) idéntico a la diapositiva para limpiar todo el inventario.

---

## 💻 Código Completo (`App.js`)

A continuación se encuentra el código completo con comentarios explicativos línea por línea:

```javascript
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
// 1. Importamos AsyncStorage para almacenamiento persistente
import AsyncStorage from '@react-native-async-storage/async-storage';
// 2. Importamos los íconos (lápiz para editar, tacho para eliminar, tuerca para ajustes)
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

// Clave única en AsyncStorage para almacenar el arreglo de productos
const STORAGE_KEY = '@productos_list';

export default function App() {
  // Estados para los campos de entrada y la lista de productos
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null); // Guarda el ID si se está editando

  // -------------------------------------------------------------
  // PASO 1: Cargar los productos guardados al abrir la aplicación
  // -------------------------------------------------------------
  useEffect(() => {
    cargarProductos();
  }, []); // Se ejecuta únicamente al montar la pantalla

  const cargarProductos = async () => {
    try {
      // Obtenemos el texto en formato JSON almacenado con la clave '@productos_list'
      const datos = await AsyncStorage.getItem(STORAGE_KEY);
      if (datos !== null) {
        // Convertimos el string JSON de vuelta a un arreglo de objetos en JavaScript
        setProductos(JSON.parse(datos));
      }
    } catch (error) {
      console.error('Error al cargar productos desde AsyncStorage:', error);
    }
  };

  // -------------------------------------------------------------
  // PASO 2: Guardar el arreglo completo en AsyncStorage
  // -------------------------------------------------------------
  const guardarEnStorage = async (nuevaLista) => {
    try {
      // AsyncStorage solo guarda texto, por eso usamos JSON.stringify
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevaLista));
    } catch (error) {
      console.error('Error al guardar en AsyncStorage:', error);
    }
  };

  // -------------------------------------------------------------
  // PASO 3: Registrar un nuevo producto o actualizar uno existente
  // -------------------------------------------------------------
  const handleGuardarProducto = async () => {
    // Validar que ambos campos tengan información
    if (!nombre.trim() || !precio.trim()) {
      Alert.alert('Campos incompletos', 'Ingrese el nombre y el precio del producto.');
      return;
    }

    if (editandoId !== null) {
      // MODO EDICIÓN: Buscamos el producto por su ID y actualizamos sus datos
      const listaActualizada = productos.map((item) =>
        item.id === editandoId
          ? { ...item, nombre: nombre.trim(), precio: precio.trim() }
          : item
      );
      setProductos(listaActualizada);
      await guardarEnStorage(listaActualizada);
      setEditandoId(null);
    } else {
      // MODO REGISTRO: Creamos un objeto con ID único generado por Date.now()
      const nuevoProducto = {
        id: Date.now().toString(),
        nombre: nombre.trim(),
        precio: precio.trim(),
      };
      // Agregamos el nuevo producto al final del arreglo
      const nuevaLista = [...productos, nuevoProducto];
      setProductos(nuevaLista);
      await guardarEnStorage(nuevaLista);
    }

    // Limpiamos los campos de texto
    setNombre('');
    setPrecio('');
  };

  // -------------------------------------------------------------
  // PASO 4: Cargar producto en los inputs para modo edición
  // -------------------------------------------------------------
  const handleEditar = (item) => {
    setNombre(item.nombre);
    setPrecio(item.precio);
    setEditandoId(item.id);
  };

  const handleCancelarEdicion = () => {
    setNombre('');
    setPrecio('');
    setEditandoId(null);
  };

  // -------------------------------------------------------------
  // PASO 5: Eliminar un producto individual
  // -------------------------------------------------------------
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
            // Filtramos la lista para quitar el elemento con ese ID
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

  // -------------------------------------------------------------
  // PASO 6: Eliminar todos los productos con ventana de confirmación
  // -------------------------------------------------------------
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
              // Borramos la clave completa de AsyncStorage
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

  // -------------------------------------------------------------
  // RENDER: Renderizado de cada tarjeta de producto
  // -------------------------------------------------------------
  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemText} numberOfLines={1}>
        {item.nombre} - S/. {item.precio}
      </Text>
      <View style={styles.actionsContainer}>
        {/* Botón Editar (icono lápiz celeste) */}
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => handleEditar(item)}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="pencil-alt" size={15} color="#00bcd4" />
        </TouchableOpacity>

        {/* Botón Eliminar (icono tacho rojo) */}
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

      {/* Header superior */}
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

        {/* Botón Guardar / Actualizar */}
        <TouchableOpacity
          style={styles.btnGuardar}
          onPress={handleGuardarProducto}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>
            {editandoId !== null ? 'ACTUALIZAR PRODUCTO' : 'GUARDAR PRODUCTO'}
          </Text>
        </TouchableOpacity>

        {/* Botón cancelar visible únicamente en modo edición */}
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

        {/* Lista de productos registrados con FlatList */}
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

// -------------------------------------------------------------
// ESTILOS DE LA APLICACIÓN (StyleSheet)
// -------------------------------------------------------------
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
    color: '#d32f2f', // Título en rojo según la diapositiva
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
    backgroundColor: '#0288d1', // Azul según la diapositiva
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
    backgroundColor: '#d32f2f', // Rojo según la diapositiva
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
    backgroundColor: '#80cbc4', // Verde menta según la diapositiva
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
```

---

## 🧠 Explicación Detallada Paso a Paso

### 1. Guardar Arreglos con `JSON.stringify` en `AsyncStorage`
`AsyncStorage` solo puede guardar cadenas de texto (`string`). Como manejamos un arreglo de productos (con `id`, `nombre` y `precio`), debemos convertirlo a texto usando:
```javascript
await AsyncStorage.setItem('@productos_list', JSON.stringify(nuevaLista));
```

### 2. Recuperar y Convertir con `JSON.parse`
Al iniciar la aplicación, recuperamos el texto plano y lo volvemos a convertir a un arreglo de objetos de JavaScript:
```javascript
const datos = await AsyncStorage.getItem('@productos_list');
if (datos !== null) {
  setProductos(JSON.parse(datos));
}
```

### 3. Edición en el Mismo Formulario
Para no complicar con múltiples pantallas, cuando el usuario presiona el botón del lápiz celeste:
```javascript
const handleEditar = (item) => {
  setNombre(item.nombre);
  setPrecio(item.precio);
  setEditandoId(item.id);
};
```
Carga los datos en los inputs y cambia el texto del botón azul a **"ACTUALIZAR PRODUCTO"**, permitiendo sobrescribir ese ítem sin duplicarlo.

### 4. Diálogo de Confirmación para "ELIMINAR TODOS"
La diapositiva muestra una ventana modal de alerta con dos opciones: **CANCELAR** y **ELIMINAR**:
```javascript
Alert.alert(
  'Confirmar',
  '¿Desea eliminar todos los productos?',
  [
    { text: 'CANCELAR', style: 'cancel' },
    {
      text: 'ELIMINAR',
      style: 'destructive',
      onPress: async () => {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setProductos([]);
      },
    },
  ]
);
```
Al presionar **ELIMINAR**, se destruye la clave del almacenamiento y se vacía el estado.

---

## 💡 Concepto Teórico de la Clase: Diferencia entre `let` y `const`

| Palabra clave | ¿Puede reasignarse su valor? | Uso principal |
|---|---|---|
| `const` | ❌ No | Para valores que no cambian (funciones, importaciones, referencias fijas). **Es la más recomendada**. |
| `let` | ✔️ Sí | Para variables cuyo valor cambia en el tiempo (contadores, acumuladores). |
