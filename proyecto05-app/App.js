import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
// 1. Importamos PropTypes para validar las propiedades del componente
import PropTypes from 'prop-types';

// 2. Componente reutilizable PerfilCard
// Recibe las props: nombre, edad y ciudad
const PerfilCard = ({ nombre, edad, ciudad }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Usuario: {nombre}</Text>
      <Text style={styles.cardText}>Edad: {edad}</Text>
      <Text style={styles.cardText}>Ciudad: {ciudad}</Text>
    </View>
  );
};

// 3. Validación con PropTypes para asegurar el tipo de dato correcto
PerfilCard.propTypes = {
  nombre: PropTypes.string.isRequired, // Debe ser texto
  edad: PropTypes.number.isRequired,   // Debe ser número
  ciudad: PropTypes.string.isRequired, // Debe ser texto
};

export default function App() {
  // Lista de usuarios según la imagen del requerimiento
  const usuarios = [
    { id: 1, nombre: 'Edu', edad: 21, ciudad: 'Lima' },
    { id: 2, nombre: 'Ana', edad: 30, ciudad: 'Huancayo' },
    { id: 3, nombre: 'Carlos', edad: 40, ciudad: 'Cusco' },
    { id: 4, nombre: 'Rosa', edad: 25, ciudad: 'Huanuco' },
    { id: 5, nombre: 'Mario', edad: 38, ciudad: 'Cusco' },
    { id: 6, nombre: 'Walter', edad: 25, ciudad: 'Lima' }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* 4. Uso de Fragments (<> </>) para agrupar sin View adicional */}
        <>
          <Text style={styles.title}>Proyecto 05</Text>
          <Text style={styles.subtitle}>Props en JavaScript</Text>
          
          {/* Mapeo de la lista de usuarios para renderizar las PerfilCard */}
          {usuarios.map((user) => (
            <PerfilCard
              key={user.id}
              nombre={user.nombre}
              edad={user.edad}
              ciudad={user.ciudad}
            />
          ))}
        </>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 40, // Espacio superior e inferior
  },
  title: {
    color: 'red',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5, // Pequeña separación
  },
  subtitle: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 25, // Separación grande antes de las tarjetas
  },
  card: {
    backgroundColor: '#F5C4C4', // Color rosado claro similar a la imagen
    width: '80%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15, // Separación entre tarjetas
    alignItems: 'center', // Centra el contenido como en la imagen
    elevation: 3, // Sombra suave
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 1,
  }
});
