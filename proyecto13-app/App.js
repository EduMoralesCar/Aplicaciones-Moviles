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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const STORAGE_KEY = '@user_session';

export default function App() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false); // Estado para ver/ocultar contraseña
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [nombreSesion, setNombreSesion] = useState('');
  const [cargando, setCargando] = useState(true);

  // 1. Al abrir la app, verificar si ya hay una sesión guardada en AsyncStorage
  useEffect(() => {
    verificarSesion();
  }, []);

  const verificarSesion = async () => {
    try {
      const sesionGuardada = await AsyncStorage.getItem(STORAGE_KEY);
      if (sesionGuardada !== null) {
        // Sesión encontrada: pasar directo a la pantalla de bienvenida
        setNombreSesion(sesionGuardada);
        setSesionIniciada(true);
      }
    } catch (error) {
      console.error('Error al leer la sesión:', error);
    } finally {
      setCargando(false);
    }
  };

  // 2. Validar credenciales y guardar sesión en AsyncStorage
  const handleLogin = async () => {
    if (!usuario.trim() || !password.trim()) {
      Alert.alert('Campos vacíos', 'Por favor ingrese usuario y contraseña.');
      return;
    }

    // Credenciales válidas: Edu / admin123
    if (usuario === 'Edu' && password === 'admin123') {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, usuario);
        setNombreSesion(usuario);
        setSesionIniciada(true);
        setUsuario('');
        setPassword('');
      } catch (error) {
        Alert.alert('Error', 'No se pudo guardar la sesión.');
      }
    } else {
      Alert.alert('Error de autenticación', 'Usuario o contraseña incorrectos.');
    }
  };

  // 3. Cerrar sesión y eliminarla de AsyncStorage
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setSesionIniciada(false);
      setNombreSesion('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar la sesión.');
    }
  };

  // Pantalla de carga mientras se lee AsyncStorage
  if (cargando) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#039be5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {sesionIniciada ? (
        // PANTALLA 2: BIENVENIDA
        <View style={styles.content}>
          <Text style={styles.welcomeTitle}>Bienvenido a la Aplicación:</Text>
          <Text style={styles.userNameText}>{nombreSesion}</Text>

          <TouchableOpacity style={styles.btnCerrarSesion} onPress={handleLogout} activeOpacity={0.8}>
            <Text style={styles.btnText}>CERRAR SESIÓN</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // PANTALLA 1: FORMULARIO DE INICIO DE SESIÓN
        <View style={styles.content}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          {/* Campo Usuario */}
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="#999"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />

          {/* Campo Contraseña con ícono para ver / ocultar */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Contraseña"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!mostrarPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setMostrarPassword(!mostrarPassword)}
            >
              <Ionicons
                name={mostrarPassword ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          {/* Botón Ingresar */}
          <TouchableOpacity style={styles.btnIngresar} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.btnText}>INGRESAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 26,
  },
  welcomeTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 6,
  },
  userNameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 6,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingHorizontal: 14,
    height: 48,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    height: '100%',
  },
  eyeIcon: {
    padding: 4,
  },
  btnIngresar: {
    backgroundColor: '#0288d1',
    height: 46,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  btnCerrarSesion: {
    backgroundColor: '#0288d1',
    height: 46,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});