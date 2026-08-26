import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Ocultamos la barra superior para que el verde se vea limpio */}
      <StatusBar barStyle="light-content" backgroundColor="#00A651" />

      {/* --- SECCIÓN 1: CABECERA VERDE (Flex 1.5) --- */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Proyecto 04</Text>
      </View>

      {/* --- SECCIÓN 2: CUERPO BLANCO (Flex 7) --- */}
      <View style={styles.body}>
        <Text style={styles.title}>Bienvenidos</Text>
        <Text style={styles.subtitle}>
          Este es un ejemplo básico de layout responsivo con Flexbox
        </Text>

        {/* Contenedor oscuro para el logo de React */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('./assets/react-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* --- SECCIÓN 3: PIE DE PÁGINA GRIS (Flex 1.5) --- */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Estudiante: Edu Morales Carlos</Text>
        <Text style={styles.footerText}>© 2026 - Creado con React Native</Text>
      </View>
    </View>
  );
}

// Estilos usando Flexbox para que sea 100% responsivo
const styles = StyleSheet.create({
  container: {
    flex: 1, // El contenedor principal ocupa toda la pantalla
    backgroundColor: '#fff',
  },
  header: {
    flex: 1.5, // Proporción responsiva para la cabecera
    backgroundColor: '#00A651', // Verde estilo imagen
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  body: {
    flex: 7, // La mayor parte de la pantalla es para el cuerpo
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30, // Margen para que el texto no toque los bordes
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8A2BE2', // Morado claro como en la imagen
    textAlign: 'center',
    marginBottom: 40, // Separación grande antes del logo
    fontWeight: '500',
  },
  imageContainer: {
    backgroundColor: '#111', // Cuadro negro de fondo para el logo
    padding: 20,
    borderRadius: 15, // Bordes redondeados
    elevation: 5, // Sombra suave en Android
  },
  logo: {
    width: 90,
    height: 90,
  },
  footer: {
    flex: 1.5, // Proporción idéntica a la cabecera
    backgroundColor: '#333333', // Gris oscuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 2, // Pequeño espacio entre las dos líneas de texto
  }
});
