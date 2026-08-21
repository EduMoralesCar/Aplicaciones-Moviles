import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';

export default function App() {
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [promedio, setPromedio] = useState(null);

  // Función para filtrar solo números y mostrar advertencia
  const soloNumeros = (texto, setNota) => {
    if (/[^0-9.]/.test(texto)) {
      Alert.alert("Error", "¡Solo se permiten ingresar números!");
    }
    
    // Hack de React Native: Forzamos la actualización del texto erróneo para 
    // que React lo reconozca, y un milisegundo después lo limpiamos.
    // Esto evita que la letra se quede "pegada" visualmente en la pantalla.
    setNota(texto);
    setTimeout(() => {
      setNota(texto.replace(/[^0-9.]/g, ''));
    }, 10);
  };

  const calcular = () => {
    // Si alguna caja está vacía, mostramos una advertencia
    if (nota1 === '' || nota2 === '' || nota3 === '') {
      Alert.alert("Advertencia", "Por favor, ingresa las 3 notas antes de calcular.");
      return;
    }

    const n1 = parseFloat(nota1) || 0;
    const n2 = parseFloat(nota2) || 0;
    const n3 = parseFloat(nota3) || 0;
    
    // Si meten un número con más de un punto (ej: 15.5.5) se vuelve NaN, validamos:
    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
      Alert.alert("Error", "Ingresaste un número no válido.");
      return;
    }

    const calc = (n1 + n2 + n3) / 3;
    setPromedio(calc.toFixed(2));
  };

  const borrar = () => {
    setNota1('');
    setNota2('');
    setNota3('');
    setPromedio(null);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Imágenes */}
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
          style={styles.studentIcon} 
        />
        
        <View style={styles.reactIconContainer}>
          <Image 
            source={{ uri: 'https://wallpaperaccess.com/full/3909258.jpg' }} 
            style={styles.reactIcon} 
          />
        </View>

        {/* Título */}
        <Text style={styles.title}>Promedio de Notas</Text>

        {/* Cajitas de Notas - Usamos nuestra función de filtro */}
        <TextInput 
          style={styles.input} 
          keyboardType="numeric" 
          value={nota1} 
          onChangeText={(texto) => soloNumeros(texto, setNota1)} 
        />
        <TextInput 
          style={styles.input} 
          keyboardType="numeric" 
          value={nota2} 
          onChangeText={(texto) => soloNumeros(texto, setNota2)} 
        />
        <TextInput 
          style={styles.input} 
          keyboardType="numeric" 
          value={nota3} 
          onChangeText={(texto) => soloNumeros(texto, setNota3)} 
        />

        {/* Botones */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={[styles.button, styles.btnBlue]} onPress={calcular}>
            <Text style={styles.btnText}>Calcular</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.btnRed]} onPress={borrar}>
            <Text style={styles.btnText}>Borrar</Text>
          </TouchableOpacity>
        </View>

        {/* Resultado */}
        {promedio !== null && (
          <Text style={styles.result}>Promedio: {promedio}</Text>
        )}

      </ScrollView>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  studentIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  reactIconContainer: {
    backgroundColor: '#1E1E1E', 
    padding: 10,
    borderRadius: 15,
    marginBottom: 30,
  },
  reactIcon: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 60,
    height: 45,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonsRow: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  btnBlue: {
    backgroundColor: '#007BFF', 
  },
  btnRed: {
    backgroundColor: '#FF0000', 
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0000FF', 
    marginTop: 10,
  }
});
