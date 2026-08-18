import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function MenuPrincipal() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actividad Grupal</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/ejercicio1')}>
        <Text style={styles.buttonText}>1. Sueldo y Comisiones</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/ejercicio2')}>
        <Text style={styles.buttonText}>2. Ventas Concesionaria</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f8', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a365d', textAlign: 'center', marginBottom: 30 },
  button: { backgroundColor: '#3182ce', padding: 15, borderRadius: 10, marginBottom: 15 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }
});