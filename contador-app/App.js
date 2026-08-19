import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [contador, setContador] = useState(0);

  const sumar = () => setContador(contador + 1);
  
  const restar = () => {
    if (contador > 0) {
      setContador(contador - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contador</Text>
      
      <Text style={styles.numero}>{contador}</Text>

      <View style={styles.botonesContainer}>
        
        <TouchableOpacity style={[styles.boton, styles.botonRojo]} onPress={restar}>
          <Text style={styles.textoBoton}>Decrementar (-)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boton, styles.botonAzul]} onPress={sumar}>
          <Text style={styles.textoBoton}>Incrementar (+)</Text>
        </TouchableOpacity>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  numero: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#5328c9',
    marginBottom: 40,
  },
  botonesContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  boton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
  },
  botonRojo: {
    backgroundColor: '#e53e3e',
  },
  botonAzul: {
    backgroundColor: '#3182ce',
  },
  textoBoton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
