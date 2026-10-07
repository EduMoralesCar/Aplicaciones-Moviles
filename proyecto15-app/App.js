import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Feather } from '@expo/vector-icons';

const USERS_STORAGE_KEY = '@usuarios_registrados';
const SESSION_STORAGE_KEY = '@sesion_activa';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('register');
  const [loading, setLoading] = useState(false);

  // Estados para Registro
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regConfirmPass, setRegConfirmPass] = useState('');
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);
  const [modalRegistroExitoso, setModalRegistroExitoso] = useState(false);

  const handleRegister = async () => {
    if (
      !regFullName.trim() ||
      !regUsername.trim() ||
      !regPass.trim() ||
      !regConfirmPass.trim()
    ) {
      Alert.alert('Campos incompletos', 'Por favor complete todos los campos.');
      return;
    }

    if (regPass !== regConfirmPass) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const existingUsersData = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      let usersList = existingUsersData ? JSON.parse(existingUsersData) : [];

      const userExists = usersList.some(
        (u) => u.username.toLowerCase() === regUsername.trim().toLowerCase()
      );

      if (userExists) {
        Alert.alert('Usuario existente', 'El nombre de usuario ya está registrado.');
        return;
      }

      const newUser = {
        fullName: regFullName.trim(),
        username: regUsername.trim(),
        password: regPass,
      };

      usersList.push(newUser);
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersList));
      setModalRegistroExitoso(true);
    } catch (error) {
      Alert.alert('Error', 'No se pudo completar el registro.');
    }
  };

  const handleContinuarTrasRegistro = () => {
    setModalRegistroExitoso(false);
    setRegFullName('');
    setRegUsername('');
    setRegPass('');
    setRegConfirmPass('');
    setCurrentScreen('login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2979ff" />

      <View style={styles.screenWrapper}>
        <View style={styles.headerCurve}>
          <View style={styles.headerIconsRow}>
            <TouchableOpacity style={styles.menuRoundBtn} onPress={() => setCurrentScreen('login')}>
              <Ionicons name="menu" size={20} color="#2979ff" />
            </TouchableOpacity>
            <View style={styles.toolsBadge}>
              <Ionicons name="settings" size={16} color="#fff" />
            </View>
          </View>
          <View style={styles.iconCircle}>
            <Feather name="user-plus" size={30} color="#2979ff" />
          </View>
          <Text style={styles.headerTitle}>Crear cuenta</Text>
          <Text style={styles.headerSubtitle}>Registre un nuevo usuario</Text>
        </View>

        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Feather name="user" size={18} color="#9e9e9e" style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder="Nombre completo"
              placeholderTextColor="#9e9e9e"
              value={regFullName}
              onChangeText={setRegFullName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Feather name="at-sign" size={18} color="#9e9e9e" style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder="Usuario"
              placeholderTextColor="#9e9e9e"
              value={regUsername}
              onChangeText={setRegUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Feather name="lock" size={18} color="#9e9e9e" style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder="Contraseña"
              placeholderTextColor="#9e9e9e"
              value={regPass}
              onChangeText={setRegPass}
              secureTextEntry={!showRegPass}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowRegPass(!showRegPass)} style={styles.eyeBtn}>
              <Ionicons name={showRegPass ? 'eye-outline' : 'eye-off-outline'} size={19} color="#9e9e9e" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Feather name="lock" size={18} color="#9e9e9e" style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#9e9e9e"
              value={regConfirmPass}
              onChangeText={setRegConfirmPass}
              secureTextEntry={!showRegConfirmPass}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowRegConfirmPass(!showRegConfirmPass)} style={styles.eyeBtn}>
              <Ionicons name={showRegConfirmPass ? 'eye-outline' : 'eye-off-outline'} size={19} color="#9e9e9e" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister} activeOpacity={0.8}>
            <Feather name="user-check" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.btnPrimaryText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setCurrentScreen('login')} style={styles.switchScreenBtn}>
            <Text style={styles.switchScreenText}>
              ¿Ya tiene una cuenta? <Text style={styles.linkBold}>Iniciar sesión</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalRegistroExitoso} onRequestClose={handleContinuarTrasRegistro}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Registro exitoso</Text>
            <Text style={styles.modalSubtitle}>El usuario fue registrado correctamente.</Text>
            <TouchableOpacity style={styles.modalBtn} onPress={handleContinuarTrasRegistro} activeOpacity={0.7}>
              <Text style={styles.modalBtnText}>CONTINUAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  screenWrapper: { flex: 1 },
  toolsBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.25)', justifyContent: 'center', alignItems: 'center' },
  headerCurve: { backgroundColor: '#2979ff', paddingTop: 12, paddingBottom: 28, paddingHorizontal: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, alignItems: 'center' },
  headerIconsRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  menuRoundBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginBottom: 10, elevation: 3 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
  headerSubtitle: { fontSize: 13, color: '#e3f2fd' },
  formContent: { flex: 1, paddingHorizontal: 24, paddingTop: 28 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 10, backgroundColor: '#ffffff', marginBottom: 14, paddingHorizontal: 12, height: 48 },
  inputIcon: { marginRight: 10 },
  inputField: { flex: 1, fontSize: 14, color: '#333', height: '100%' },
  eyeBtn: { padding: 6 },
  btnPrimary: { backgroundColor: '#2979ff', flexDirection: 'row', height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, elevation: 2 },
  btnPrimaryText: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
  switchScreenBtn: { marginTop: 18, alignItems: 'center' },
  switchScreenText: { color: '#2979ff', fontSize: 13 },
  linkBold: { fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.65)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 26 },
  modalCard: { width: '100%', backgroundColor: '#ffffff', borderRadius: 12, padding: 22, elevation: 6 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#212121', marginBottom: 8 },
  modalSubtitle: { fontSize: 14, color: '#616161', marginBottom: 20 },
  modalBtn: { alignSelf: 'flex-end', paddingVertical: 8, paddingHorizontal: 14 },
  modalBtnText: { color: '#2979ff', fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5 },
});
