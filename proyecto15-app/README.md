# Proyecto 15: Sistema de Autenticación Completo con AsyncStorage

Aplicación móvil desarrollada con **React Native** y **Expo** para la **Actividad Práctica Grupal** de la Unidad 2 (Semana 9). Implementa un flujo completo de **Registro, Inicio de Sesión, Validación de Formularios, Persistencia Local y Cierre de Sesión** utilizando **`AsyncStorage`**.

---

## 📱 Pantallas de la Aplicación

El diseño replica con exactitud cada una de las 5 vistas presentadas en la diapositiva:

1. **Pantalla de Carga:** Spinner con el mensaje *"Verificando sesión..."* mientras consulta si hay una sesión activa guardada.
2. **Iniciar Sesión:** Encabezado azul curvo con ícono de candado, campos para usuario y contraseña (con botón de ojo para ver/ocultar) y enlace a registro.
3. **Crear Cuenta:** Encabezado con ícono de nuevo usuario (`user-plus`), campos de Nombre completo, Usuario, Contraseña y Confirmar contraseña.
4. **Modal de Registro Exitoso:** Diálogo emergente con el mensaje *"El usuario fue registrado correctamente"* y botón **CONTINUAR** que redirige al login.
5. **Sesión Iniciada (Home):** Encabezado con nombre completo del usuario, ícono de verificación verde, detalle del usuario logueado y botón rojo de **Cerrar sesión**.

---

## 💻 Código Completo (`App.js`)

```javascript
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
// 1. Importamos AsyncStorage para persistencia local de usuarios y sesión
import AsyncStorage from '@react-native-async-storage/async-storage';
// 2. Importamos los íconos de vector-icons
import { Ionicons, Feather } from '@expo/vector-icons';

// Claves únicas de almacenamiento en AsyncStorage
const USERS_STORAGE_KEY = '@usuarios_registrados';
const SESSION_STORAGE_KEY = '@sesion_activa';

export default function App() {
  // Estado para la navegación entre vistas: 'login', 'register' o 'home'
  const [currentScreen, setCurrentScreen] = useState('login');
  const [loading, setLoading] = useState(true);

  // Estados para el formulario de Login
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Estados para el formulario de Registro
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regConfirmPass, setRegConfirmPass] = useState('');
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);
  const [modalRegistroExitoso, setModalRegistroExitoso] = useState(false);

  // Estado del usuario con sesión activa
  const [currentUser, setCurrentUser] = useState(null);

  // -------------------------------------------------------------
  // PASO 1: Verificar si ya existe una sesión activa al abrir la App
  // -------------------------------------------------------------
  useEffect(() => {
    checkActiveSession();
  }, []);

  const checkActiveSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
      if (sessionData !== null) {
        const userObj = JSON.parse(sessionData);
        setCurrentUser(userObj);
        setCurrentScreen('home'); // Pasa directo a la pantalla de bienvenida
      }
    } catch (error) {
      console.error('Error al verificar sesión:', error);
    } finally {
      // Breve pausa para mostrar la pantalla de "Verificando sesión..."
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  };

  // -------------------------------------------------------------
  // PASO 2: Registro de nuevo usuario en AsyncStorage
  // -------------------------------------------------------------
  const handleRegister = async () => {
    // Validación de campos obligatorios
    if (
      !regFullName.trim() ||
      !regUsername.trim() ||
      !regPass.trim() ||
      !regConfirmPass.trim()
    ) {
      Alert.alert('Campos incompletos', 'Por favor complete todos los campos.');
      return;
    }

    // Validación de contraseñas iguales
    if (regPass !== regConfirmPass) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      // 1. Obtener lista actual de usuarios
      const existingUsersData = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      let usersList = existingUsersData ? JSON.parse(existingUsersData) : [];

      // 2. Verificar que el nombre de usuario no esté repetido
      const userExists = usersList.some(
        (u) => u.username.toLowerCase() === regUsername.trim().toLowerCase()
      );

      if (userExists) {
        Alert.alert('Usuario existente', 'El nombre de usuario ya está registrado.');
        return;
      }

      // 3. Crear nuevo objeto de usuario
      const newUser = {
        fullName: regFullName.trim(),
        username: regUsername.trim(),
        password: regPass,
      };

      usersList.push(newUser);

      // 4. Guardar lista actualizada en AsyncStorage
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersList));

      // 5. Mostrar modal de Registro exitoso
      setModalRegistroExitoso(true);
    } catch (error) {
      Alert.alert('Error', 'No se pudo completar el registro.');
    }
  };

  const handleContinuarTrasRegistro = () => {
    setModalRegistroExitoso(false);
    // Limpiar campos y precargar usuario en el login
    setLoginUser(regUsername);
    setLoginPass('');
    setRegFullName('');
    setRegUsername('');
    setRegPass('');
    setRegConfirmPass('');
    setCurrentScreen('login');
  };

  // -------------------------------------------------------------
  // PASO 3: Inicio de sesión validando contra usuarios de AsyncStorage
  // -------------------------------------------------------------
  const handleLogin = async () => {
    if (!loginUser.trim() || !loginPass.trim()) {
      Alert.alert('Campos vacíos', 'Por favor ingrese usuario y contraseña.');
      return;
    }

    try {
      const existingUsersData = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const usersList = existingUsersData ? JSON.parse(existingUsersData) : [];

      // Validamos contra los usuarios registrados localmente
      const userFound = usersList.find(
        (u) =>
          u.username.toLowerCase() === loginUser.trim().toLowerCase() &&
          u.password === loginPass
      );

      if (userFound) {
        // Guardar sesión activa en AsyncStorage
        await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userFound));
        setCurrentUser(userFound);
        setCurrentScreen('home');
        setLoginUser('');
        setLoginPass('');
      } else {
        Alert.alert('Error de autenticación', 'Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión.');
    }
  };

  // -------------------------------------------------------------
  // PASO 4: Cerrar sesión y eliminarla de AsyncStorage
  // -------------------------------------------------------------
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
      setCurrentUser(null);
      setCurrentScreen('login');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar la sesión.');
    }
  };

  // =============================================================
  // VISTA 1: Pantalla de carga inicial (Verificando sesión...)
  // =============================================================
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.topRightTools}>
          <View style={styles.toolsBadge}>
            <Ionicons name="settings" size={16} color="#fff" />
          </View>
        </View>
        <ActivityIndicator size="large" color="#2979ff" />
        <Text style={styles.loadingText}>Verificando sesión...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2979ff" />

      {/* =======================================================
          VISTA 2: PANTALLA DE INICIAR SESIÓN
      ======================================================= */}
      {currentScreen === 'login' && (
        <View style={styles.screenWrapper}>
          <View style={styles.headerCurve}>
            <View style={styles.headerIconsRow}>
              <View />
              <View style={styles.toolsBadge}>
                <Ionicons name="settings" size={16} color="#fff" />
              </View>
            </View>
            <View style={styles.iconCircle}>
              <Ionicons name="lock-closed" size={30} color="#2979ff" />
            </View>
            <Text style={styles.headerTitle}>Iniciar sesión</Text>
            <Text style={styles.headerSubtitle}>Acceda a su cuenta</Text>
          </View>

          <View style={styles.formContent}>
            <View style={styles.inputContainer}>
              <Feather name="user" size={18} color="#9e9e9e" style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="Usuario"
                placeholderTextColor="#9e9e9e"
                value={loginUser}
                onChangeText={setLoginUser}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Feather name="lock" size={18} color="#9e9e9e" style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="Contraseña"
                placeholderTextColor="#9e9e9e"
                value={loginPass}
                onChangeText={setLoginPass}
                secureTextEntry={!showLoginPass}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowLoginPass(!showLoginPass)}
                style={styles.eyeBtn}
              >
                <Ionicons
                  name={showLoginPass ? 'eye-outline' : 'eye-off-outline'}
                  size={19}
                  color="#9e9e9e"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Ionicons name="log-in-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.btnPrimaryText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setCurrentScreen('register')}
              style={styles.switchScreenBtn}
            >
              <Text style={styles.switchScreenText}>
                ¿No tiene una cuenta? <Text style={styles.linkBold}>Registrarse</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* =======================================================
          VISTA 3: PANTALLA DE CREAR CUENTA
      ======================================================= */}
      {currentScreen === 'register' && (
        <View style={styles.screenWrapper}>
          <View style={styles.headerCurve}>
            <View style={styles.headerIconsRow}>
              <TouchableOpacity
                style={styles.menuRoundBtn}
                onPress={() => setCurrentScreen('login')}
              >
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
              <TouchableOpacity
                onPress={() => setShowRegPass(!showRegPass)}
                style={styles.eyeBtn}
              >
                <Ionicons
                  name={showRegPass ? 'eye-outline' : 'eye-off-outline'}
                  size={19}
                  color="#9e9e9e"
                />
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
              <TouchableOpacity
                onPress={() => setShowRegConfirmPass(!showRegConfirmPass)}
                style={styles.eyeBtn}
              >
                <Ionicons
                  name={showRegConfirmPass ? 'eye-outline' : 'eye-off-outline'}
                  size={19}
                  color="#9e9e9e"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Feather name="user-check" size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.btnPrimaryText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setCurrentScreen('login')}
              style={styles.switchScreenBtn}
            >
              <Text style={styles.switchScreenText}>
                ¿Ya tiene una cuenta? <Text style={styles.linkBold}>Iniciar sesión</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* =======================================================
          VISTA 4: PANTALLA DE BIENVENIDO / SESIÓN INICIADA
      ======================================================= */}
      {currentScreen === 'home' && (
        <View style={styles.screenWrapper}>
          <View style={styles.headerCurve}>
            <View style={styles.headerIconsRow}>
              <View />
              <View style={styles.toolsBadge}>
                <Ionicons name="settings" size={16} color="#fff" />
              </View>
            </View>
            <View style={styles.iconCircle}>
              <Ionicons name="person" size={32} color="#2979ff" />
            </View>
            <Text style={styles.headerTitle}>¡Bienvenido!</Text>
            <Text style={styles.headerSubtitle}>{currentUser?.fullName || 'Usuario'}</Text>
          </View>

          <View style={styles.homeContent}>
            <View style={styles.greenCheckCircle}>
              <Ionicons name="checkmark" size={32} color="#fff" />
            </View>

            <Text style={styles.sessionActiveTitle}>Sesión iniciada</Text>
            <Text style={styles.sessionActiveSubtitle}>
              Has ingresado correctamente a la aplicación.
            </Text>

            <View style={styles.userCard}>
              <Feather name="user" size={16} color="#2979ff" style={{ marginRight: 8 }} />
              <Text style={styles.userCardText}>
                Usuario: <Text style={{ fontWeight: '600' }}>{currentUser?.username}</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={styles.btnLogout}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Ionicons name="log-out-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.btnLogoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* =======================================================
          MODAL: REGISTRO EXITOSO
      ======================================================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalRegistroExitoso}
        onRequestClose={handleContinuarTrasRegistro}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Registro exitoso</Text>
            <Text style={styles.modalSubtitle}>
              El usuario fue registrado correctamente.
            </Text>

            <TouchableOpacity
              style={styles.modalBtn}
              onPress={handleContinuarTrasRegistro}
              activeOpacity={0.7}
            >
              <Text style={styles.modalBtnText}>CONTINUAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// -------------------------------------------------------------
// ESTILOS DE LA APLICACIÓN
// -------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  screenWrapper: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 14,
    color: '#757575',
    fontSize: 14,
  },
  topRightTools: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  toolsBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCurve: {
    backgroundColor: '#2979ff',
    paddingTop: 12,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: 'center',
  },
  headerIconsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  menuRoundBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#e3f2fd',
  },
  formContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginBottom: 14,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    height: '100%',
  },
  eyeBtn: {
    padding: 6,
  },
  btnPrimary: {
    backgroundColor: '#2979ff',
    flexDirection: 'row',
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
    shadowColor: '#2979ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  switchScreenBtn: {
    marginTop: 18,
    alignItems: 'center',
  },
  switchScreenText: {
    color: '#2979ff',
    fontSize: 13,
  },
  linkBold: {
    fontWeight: 'bold',
  },
  homeContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  greenCheckCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
  },
  sessionActiveTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 6,
  },
  sessionActiveSubtitle: {
    fontSize: 13,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 24,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 24,
    backgroundColor: '#fafafa',
  },
  userCardText: {
    fontSize: 14,
    color: '#424242',
  },
  btnLogout: {
    backgroundColor: '#ef5350',
    flexDirection: 'row',
    width: '100%',
    height: 46,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  btnLogoutText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 26,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 22,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 20,
  },
  modalBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  modalBtnText: {
    color: '#2979ff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
```

---

## 🧠 Explicación Detallada Paso a Paso

### 1. Las Claves de Persistencia
```javascript
const USERS_STORAGE_KEY = '@usuarios_registrados';
const SESSION_STORAGE_KEY = '@sesion_activa';
```
- Se manejan dos claves independientes: una para almacenar el listado de usuarios creados en la base de datos local y otra para recordar al usuario que actualmente tiene la sesión iniciada.

### 2. Comprobación de Sesión al Inicio (`checkActiveSession`)
```javascript
const sessionData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
if (sessionData !== null) {
  setCurrentUser(JSON.parse(sessionData));
  setCurrentScreen('home');
}
```
- Si la app ya tenía una sesión activa, no le vuelve a pedir credenciales y va directo a la pantalla de bienvenida.

### 3. Registro y Validación de Nuevos Usuarios
```javascript
const newUser = {
  fullName: regFullName.trim(),
  username: regUsername.trim(),
  password: regPass,
};
usersList.push(newUser);
await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersList));
```
- Valida que no haya campos en blanco, que la contraseña y su confirmación coincidan, y que el usuario no esté duplicado.
- Al tener éxito, levanta el `Modal` que informa al usuario que el registro fue completado.

### 4. Inicio de Sesión
- Compara el usuario y contraseña contra la lista traída de `USERS_STORAGE_KEY`.
- Si coinciden, crea la entrada en `SESSION_STORAGE_KEY` y cambia la vista a `'home'`.

### 5. Cierre de Sesión (`handleLogout`)
```javascript
await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
setCurrentUser(null);
setCurrentScreen('login');
```
- Borra la clave `@sesion_activa`, manteniendo guardados a los usuarios registrados pero requiriendo un nuevo inicio de sesión.

---
