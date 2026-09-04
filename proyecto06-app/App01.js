import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_TAREAS = 'mis_tareas';

export default function App() {
  // 1. ESTADOS (useState) para manejar la información dinámica
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const tareasCargadas = useRef(false);

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const tareasGuardadas = await AsyncStorage.getItem(CLAVE_TAREAS);
        if (tareasGuardadas) {
          const tareasParseadas = JSON.parse(tareasGuardadas);
          if (Array.isArray(tareasParseadas)) {
            setTareas(tareasParseadas);
          }
        }
      } catch (error) {
        console.error('No se pudieron cargar las tareas:', error);
      } finally {
        tareasCargadas.current = true;
      }
    };

    cargarTareas();
  }, []);

  useEffect(() => {
    if (!tareasCargadas.current) return;

    const guardarTareas = async () => {
      try {
        await AsyncStorage.setItem(CLAVE_TAREAS, JSON.stringify(tareas));
      } catch (error) {
        console.error('No se pudieron guardar las tareas:', error);
      }
    };

    guardarTareas();
  }, [tareas]);

  // Estados para controlar la ventana emergente (Modal) de edición
  const [modalVisible, setModalVisible] = useState(false);
  const [tareaEditando, setTareaEditando] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');

  // 2. FUNCIONES DE EVENTOS
  // Agregar una tarea nueva
  const agregarTarea = () => {
    if (nuevaTarea.trim() === '') return; // Evita agregar tareas vacías
    const nueva = {
      id: Date.now(), // Genera un ID único rápido
      texto: nuevaTarea
    };
    setTareas([...tareas, nueva]);
    setNuevaTarea(''); // Limpia la caja de texto
  };

  // Eliminar una tarea
  const eliminarTarea = (id) => {
    const tareasFiltradas = tareas.filter(tarea => tarea.id !== id);
    setTareas(tareasFiltradas);
  };

  // Abrir la ventana para editar
  const abrirModalEditar = (tarea) => {
    setTareaEditando(tarea);
    setTextoEditado(tarea.texto);
    setModalVisible(true);
  };

  // Guardar los cambios de la edición
  const guardarEdicion = () => {
    const tareasActualizadas = tareas.map(tarea =>
      tarea.id === tareaEditando.id ? { ...tarea, texto: textoEditado } : tarea
    );
    setTareas(tareasActualizadas);
    setModalVisible(false); // Cierra el modal
    setTareaEditando(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Proyecto 06</Text>
      <Text style={styles.subtitle}>Lista de Tareas</Text>

      {/* --- ZONA DE AGREGAR TAREA --- */}
      <TextInput
        style={styles.input}
        placeholder="Escribe una tarea"
        value={nuevaTarea}
        onChangeText={setNuevaTarea} // Evento onChangeText
      />
      <TouchableOpacity style={styles.btnAgregar} onPress={agregarTarea}>
        <Text style={styles.btnTextoBlanco}>➕ Agregar</Text>
      </TouchableOpacity>

      {/* --- LISTA DE TAREAS --- */}
      <ScrollView style={styles.listContainer}>
        {tareas.map(tarea => (
          <View key={tarea.id} style={styles.tareaCard}>
            <Text style={styles.tareaTexto}>{tarea.texto}</Text>

            <View style={styles.botonesContainer}>
              {/* Botón Editar */}
              <TouchableOpacity style={styles.btnEditar} onPress={() => abrirModalEditar(tarea)}>
                <Text style={styles.btnTextoBlanco}>✏️ Editar</Text>
              </TouchableOpacity>

              {/* Botón Eliminar */}
              <TouchableOpacity style={styles.btnEliminar} onPress={() => eliminarTarea(tarea.id)}>
                <Text style={styles.btnTextoBlanco}>🗑️ Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* --- VENTANA EMERGENTE (MODAL) DE EDICIÓN --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalFondo}>
          <View style={styles.modalCaja}>
            <Text style={styles.modalTitulo}>Editar Tarea</Text>
            <TextInput
              style={styles.input}
              value={textoEditado}
              onChangeText={setTextoEditado}
            />
            <View style={styles.modalBotones}>
              <TouchableOpacity style={[styles.btnAgregar, styles.btnModal]} onPress={guardarEdicion}>
                <Text style={styles.btnTextoBlanco}>💾 Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnEliminar, styles.btnModal]} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnTextoBlanco}>❌ Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// 3. ESTILOS (Flexbox y colores según tu imagen)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
  title: { color: 'red', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: '#fff', fontSize: 16 },
  btnAgregar: { backgroundColor: '#00B050', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  btnTextoBlanco: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  listContainer: { flex: 1 },
  tareaCard: { backgroundColor: '#FFE6E6', padding: 15, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tareaTexto: { flex: 1, fontSize: 16, fontWeight: 'bold', marginRight: 10, color: '#333' },
  botonesContainer: { flexDirection: 'row' },
  btnEditar: { backgroundColor: '#00B0F0', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 5, marginRight: 8 },
  btnEliminar: { backgroundColor: '#FF0000', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 5 },
  modalFondo: { flex: 1, backgroundColor: 'rgba(138, 43, 226, 0.6)', justifyContent: 'center', alignItems: 'center' }, // Fondo morado transparente
  modalCaja: { backgroundColor: '#fff', padding: 20, borderRadius: 12, width: '90%', elevation: 5 },
  modalTitulo: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  modalBotones: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  btnModal: { flex: 1, marginHorizontal: 5, marginBottom: 0, padding: 15, alignItems: 'center', justifyContent: 'center' }
});