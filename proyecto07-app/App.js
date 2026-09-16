import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  // 1. useState: Crea un estado llamado contador que inicia en 0
  const [contador, setContador] = useState(0);

  // 2. useEffect: Escucha cambios en contador y muestra un mensaje en consola
  useEffect(() => {
    console.log(`✅ El contador cambió: ${contador}`);
  }, [contador]);

  // 3. Funciones para los botones
  const incrementar = () => setContador(contador + 1);
  const decrementar = () => setContador(contador - 1);
  const reiniciar = () => setContador(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Título e Indicador */}
        <Text style={styles.title}>📱 Ejemplo con Hooks</Text>
        <Text style={styles.counterText}>Contador: {contador}</Text>

        {/* Contenedor de Botones alineados en fila */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={incrementar}>
            <Text style={styles.buttonText}>➕ INCREMENTAR</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={decrementar}>
            <Text style={styles.buttonText}>➖ DECREMENTAR</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={reiniciar}>
            <Text style={styles.buttonText}>🔄 REINICIAR</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

// Estilos de la aplicación
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Centrado vertical
    alignItems: 'center',     // Centrado horizontal
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  counterText: {
    fontSize: 16,
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row', // Alinea los botones de izquierda a derecha
    justifyContent: 'space-between',
    width: '95%',
  },
  button: {
    backgroundColor: '#2196F3', // Color azul como en la imagen
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1, // Permite que los 3 botones compartan el mismo espacio
    alignItems: 'center',
    elevation: 3, // Sombreado en Android
  },
  buttonText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});