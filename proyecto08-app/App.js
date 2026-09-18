import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Importamos la librería instalada

export default function App() {
  // 1. ESTADOS (useState)
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: 'Rosa Cardenas', cargo: 'Secretaria' },
    { id: 2, nombre: 'Juan Lopez', cargo: 'Gerente' },
    { id: 3, nombre: 'Sergio Poma', cargo: 'Analista' }
  ]);
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const [total, setTotal] = useState(0);

  // 2. EFECTOS (useEffect)
  // Cada vez que la lista de "empleados" cambia, actualiza el contador total
  useEffect(() => {
    setTotal(empleados.length);
  }, [empleados]);

  // 3. FUNCIONES
  const agregarEmpleado = () => {
    // Si los campos están vacíos, no hace nada
    if (nombre.trim() === '' || cargo.trim() === '') return;

    const nuevoEmpleado = {
      id: Date.now(),
      nombre: nombre,
      cargo: cargo
    };

    setEmpleados([...empleados, nuevoEmpleado]);
    setNombre(''); // Limpia los inputs
    setCargo('');
  };

  const eliminarEmpleado = (id) => {
    const nuevaLista = empleados.filter(emp => emp.id !== id);
    setEmpleados(nuevaLista);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* --- CABECERA --- */}
        <View style={styles.header}>
          <FontAwesome5 name="users" size={22} color="#0000FF" />
          <Text style={styles.title}> Registro de Empleados</Text>
        </View>

        {/* --- FORMULARIO --- */}
        {/* Input Nombre */}
        <View style={styles.inputContainer}>
          <FontAwesome5 name="user" size={16} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre del empleado"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        {/* Input Cargo */}
        <View style={styles.inputContainer}>
          <FontAwesome5 name="briefcase" size={16} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Cargo"
            value={cargo}
            onChangeText={setCargo}
          />
        </View>

        {/* Botón Agregar */}
        <TouchableOpacity style={styles.btnAgregar} onPress={agregarEmpleado}>
          <FontAwesome5 name="plus-circle" size={16} color="#fff" />
          <Text style={styles.btnTextoBlanco}> Agregar</Text>
        </TouchableOpacity>

        {/* --- CONTADOR DINÁMICO --- */}
        <View style={styles.totalContainer}>
          <FontAwesome5 name="users" size={14} color="#000" />
          <Text style={styles.totalText}> Total empleados: {total}</Text>
        </View>

        {/* --- LISTA DE EMPLEADOS --- */}
        {empleados.map((emp) => (
          <View key={emp.id} style={styles.card}>
            {/* Info del empleado */}
            <View style={styles.cardInfo}>
              <View style={styles.row}>
                <FontAwesome5 name="user-circle" size={14} color="#000" />
                <Text style={styles.empNombre}> {emp.nombre}</Text>
              </View>
              <View style={styles.row}>
                <FontAwesome5 name="briefcase" size={14} color="#666" />
                <Text style={styles.empCargo}> {emp.cargo}</Text>
              </View>
            </View>

            {/* Botón Rojo Eliminar */}
            <TouchableOpacity style={styles.btnEliminar} onPress={() => eliminarEmpleado(emp.id)}>
              <FontAwesome5 name="trash" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

// 4. ESTILOS
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  content: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#0000FF' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15 },
  icon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 12 },
  btnAgregar: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  btnTextoBlanco: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  totalContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  totalText: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  card: { backgroundColor: '#F8F9FA', padding: 15, borderRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#E9ECEF' },
  cardInfo: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  empNombre: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  empCargo: { fontSize: 14, color: '#666' },
  btnEliminar: { backgroundColor: '#FF3B30', padding: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }
});