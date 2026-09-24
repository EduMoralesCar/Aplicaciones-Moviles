import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Importamos los íconos

export default function App() {
  // 1. Estado estático para los productos de la tienda
  const [productos] = useState([
    { id: 1, nombre: 'Camisa', precio: 50 },
    { id: 2, nombre: 'Pantalón', precio: 80 },
    { id: 3, nombre: 'Zapatos', precio: 120 },
  ]);

  // 2. Estado dinámico para el Carrito de compras (inicia vacío)
  const [carrito, setCarrito] = useState([]);

  // --- FUNCIONES CON EL OPERADOR DE PROPAGACIÓN (...) ---

  // Agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    // Verificamos si el producto ya está en el carrito
    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
      // Si ya existe, recorremos el carrito y le sumamos 1 a la cantidad de ese producto
      const nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(nuevoCarrito);
    } else {
      // Si no existe, usamos el operador spread (...) para copiar lo que ya hay en el carrito
      // y agregamos el nuevo producto con cantidad 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // Aumentar cantidad (+)
  const incrementarCantidad = (id) => {
    const nuevoCarrito = carrito.map(item =>
      item.id === id
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    );
    setCarrito(nuevoCarrito);
  };

  // Disminuir cantidad (-)
  const decrementarCantidad = (id) => {
    const nuevoCarrito = carrito.map(item =>
      item.id === id && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    );
    setCarrito(nuevoCarrito);
  };

  // Eliminar por completo del carrito (Tacho de basura rojo)
  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    setCarrito(nuevoCarrito);
  };

  // Función matemática para sumar el total
  const calcularTotal = () => {
    let total = 0;
    carrito.forEach(item => {
      total += item.precio * item.cantidad;
    });
    return total;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* --- CABECERA --- */}
        <View style={styles.header}>
          <FontAwesome5 name="shopping-cart" size={24} color="red" />
          <Text style={styles.headerTitle}> Carrito de Compras</Text>
        </View>

        {/* --- SECCIÓN 1: PRODUCTOS DISPONIBLES --- */}
        <Text style={styles.sectionTitle}>Productos disponibles:</Text>
        {productos.map(prod => (
          <View key={prod.id} style={styles.cardProducto}>
            <Text style={styles.textoProducto}>{prod.nombre} - ${prod.precio}</Text>

            {/* Botón verde para agregar */}
            <TouchableOpacity style={styles.btnAgregar} onPress={() => agregarAlCarrito(prod)}>
              <FontAwesome5 name="plus-circle" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}

        {/* --- SECCIÓN 2: EL CARRITO --- */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Carrito:</Text>
        {carrito.map(item => (
          <View key={item.id} style={styles.cardCarrito}>
            {/* Info del producto en carrito */}
            <View style={styles.infoCarrito}>
              <Text style={styles.textoProducto}>{item.nombre} - ${item.precio}</Text>
              <Text style={styles.textoCantidad}>Cantidad: {item.cantidad}</Text>
            </View>

            {/* Botones de acción del carrito */}
            <View style={styles.botonesCarrito}>
              <TouchableOpacity style={styles.btnGris} onPress={() => incrementarCantidad(item.id)}>
                <FontAwesome5 name="plus" size={12} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnGris} onPress={() => decrementarCantidad(item.id)}>
                <FontAwesome5 name="minus" size={12} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnRojo} onPress={() => eliminarDelCarrito(item.id)}>
                <FontAwesome5 name="trash" size={12} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* --- TOTAL DE LA COMPRA --- */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalTexto}>Total: ${calcularTotal()}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- ESTILOS CSS ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  content: { padding: 20 },

  header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: 'red' },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: 'blue', marginBottom: 15 },

  cardProducto: {
    backgroundColor: '#F5B7B1', // Fondo rosado
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  textoProducto: { fontSize: 14, color: '#333' },
  btnAgregar: { backgroundColor: '#28B463', padding: 6, borderRadius: 5 }, // Botón Verde

  cardCarrito: {
    backgroundColor: '#F5B7B1', // Fondo rosado
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  infoCarrito: { flex: 1 },
  textoCantidad: { fontSize: 12, color: '#555', marginTop: 3 },
  botonesCarrito: { flexDirection: 'row', alignItems: 'center' },
  btnGris: { backgroundColor: '#424949', padding: 10, borderRadius: 5, marginLeft: 5 },
  btnRojo: { backgroundColor: '#FF0000', padding: 10, borderRadius: 5, marginLeft: 5 },

  totalContainer: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#000', // Línea negra debajo del total (según imagen)
    paddingBottom: 5,
    alignItems: 'flex-start'
  },
  totalTexto: { fontSize: 20, fontWeight: 'bold', color: '#009900' } // Verde
});