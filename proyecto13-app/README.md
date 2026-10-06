# Proyecto 13: Módulo de Login con Persistencia en AsyncStorage

Aplicación móvil desarrollada con **React Native** y **Expo** que implementa un sistema de autenticación persistente usando **`AsyncStorage`**, permitiendo mantener la sesión activa aunque la aplicación se cierre o se reinicie.

---

## 📱 Código Completo (`App.js`)

A continuación se presenta el código completo del archivo `App.js` con comentarios explicativos línea por línea:

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
} from 'react-native';
// 1. Importamos AsyncStorage para persistencia local tipo clave-valor
import AsyncStorage from '@react-native-async-storage/async-storage';
// 2. Importamos Ionicons para el ícono de ver/ocultar contraseña
import { Ionicons } from '@expo/vector-icons';

// Clave única donde se guardará el valor de la sesión en el dispositivo
const STORAGE_KEY = '@user_session';

export default function App() {
  // ESTADOS (Hooks useState)
  const [usuario, setUsuario] = useState('');                 // Texto ingresado en el input usuario
  const [password, setPassword] = useState('');               // Texto ingresado en el input contraseña
  const [mostrarPassword, setMostrarPassword] = useState(false); // Alterna ver/ocultar la contraseña
  const [sesionIniciada, setSesionIniciada] = useState(false); // Define qué pantalla mostrar (login o bienvenida)
  const [nombreSesion, setNombreSesion] = useState('');       // Nombre del usuario recuperado de la sesión
  const [cargando, setCargando] = useState(true);             // Spinner mientras verifica AsyncStorage al iniciar

  // -------------------------------------------------------------
  // PASO 1: Verificar si ya hay una sesión guardada al abrir la App
  // -------------------------------------------------------------
  useEffect(() => {
    verificarSesion();
  }, []); // [] asegura que solo se ejecute una vez al montar el componente

  const verificarSesion = async () => {
    try {
      // Leemos de la memoria local si existe el valor con la clave '@user_session'
      const sesionGuardada = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (sesionGuardada !== null) {
        // Si no es null, significa que ya existía una sesión previa activa
        setNombreSesion(sesionGuardada);
        setSesionIniciada(true); // Pasa directo a la pantalla de bienvenida
      }
    } catch (error) {
      console.error('Error al leer la sesión:', error);
    } finally {
      // Ocultamos el indicador de carga inicial
      setCargando(false);
    }
  };

  // -------------------------------------------------------------
  // PASO 2: Validar credenciales y guardar la sesión
  // -------------------------------------------------------------
  const handleLogin = async () => {
    // Validación de campos vacíos
    if (!usuario.trim() || !password.trim()) {
      Alert.alert('Campos vacíos', 'Por favor ingrese usuario y contraseña.');
      return;
    }

    // Validación de usuario y contraseña
    if (usuario === 'Edu' && password === 'admin123') {
      try {
        // Guardamos el usuario en AsyncStorage para persistir la sesión
        await AsyncStorage.setItem(STORAGE_KEY, usuario);
        setNombreSesion(usuario);
        setSesionIniciada(true);
        // Limpiamos los inputs del formulario
        setUsuario('');
        setPassword('');
      } catch (error) {
        Alert.alert('Error', 'No se pudo guardar la sesión en el dispositivo.');
      }
    } else {
      Alert.alert('Error de autenticación', 'Usuario o contraseña incorrectos.');
    }
  };

  // -------------------------------------------------------------
  // PASO 3: Cerrar sesión y borrar los datos de AsyncStorage
  // -------------------------------------------------------------
  const handleLogout = async () => {
    try {
      // Eliminamos la clave del almacenamiento local
      await AsyncStorage.removeItem(STORAGE_KEY);
      setSesionIniciada(false); // Regresa a la pantalla de formulario de login
      setNombreSesion('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar la sesión.');
    }
  };

  // -------------------------------------------------------------
  // PASO 4: Renderizado condicional según el estado de la app
  // -------------------------------------------------------------

  // Si aún está comprobando AsyncStorage al inicio, mostramos un spinner
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
        // =========================================================
        // PANTALLA DE BIENVENIDA (Cuando sesionIniciada es true)
        // =========================================================
        <View style={styles.content}>
          <Text style={styles.welcomeTitle}>Bienvenido a la Aplicación:</Text>
          <Text style={styles.userNameText}>{nombreSesion}</Text>

          {/* Botón para desloguear y borrar la clave de AsyncStorage */}
          <TouchableOpacity style={styles.btnCerrarSesion} onPress={handleLogout} activeOpacity={0.8}>
            <Text style={styles.btnText}>CERRAR SESIÓN</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // =========================================================
        // PANTALLA DE FORMULARIO (Cuando sesionIniciada es false)
        // =========================================================
        <View style={styles.content}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          {/* Input para el Usuario */}
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="#999"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />

          {/* Contenedor del Input de Contraseña + Ícono de Ojo */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Contraseña"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              // Si mostrarPassword es false, secureTextEntry oculta el texto con puntos
              secureTextEntry={!mostrarPassword}
              autoCapitalize="none"
            />
            {/* Botón que alterna el estado mostrarPassword al presionarse */}
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

          {/* Botón para enviar las credenciales */}
          <TouchableOpacity style={styles.btnIngresar} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.btnText}>INGRESAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

// -------------------------------------------------------------
// ESTILOS DE LA INTERFAZ (StyleSheet)
// -------------------------------------------------------------
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
```

---

## 📖 Explicación Detallada Paso a Paso

### 1. La Clave de Almacenamiento (`STORAGE_KEY`)
```javascript
const STORAGE_KEY = '@user_session';
```
- `AsyncStorage` trabaja como un diccionario **clave-valor** (similar a `localStorage` en la web).
- Definimos un identificador único (por convención con `@` al inicio) para no confundirlo con otros datos.

---

### 2. Recuperación de Sesión al Iniciar (`useEffect` + `AsyncStorage.getItem`)
```javascript
useEffect(() => {
  verificarSesion();
}, []);
```
- Tan pronto el componente se monta por primera vez, se llama a `verificarSesion()`.
- Dentro de la función usamos:
  ```javascript
  const sesionGuardada = await AsyncStorage.getItem(STORAGE_KEY);
  ```
- **Si devuelve un valor (distinto de `null`):** significa que el usuario ya inició sesión con anterioridad y no ha cerrado sesión. El estado `sesionIniciada` se pone en `true` y la aplicación muestra directo la bienvenida sin pasar por el login.
- **Si devuelve `null`:** significa que no hay sesión, así que `sesionIniciada` se mantiene en `false` y se muestra el formulario.

---

### 3. Validación y Guardado (`AsyncStorage.setItem`)
```javascript
if (usuario === 'Edu' && password === 'admin123') {
  await AsyncStorage.setItem(STORAGE_KEY, usuario);
  setNombreSesion(usuario);
  setSesionIniciada(true);
}
```
- Evaluamos que el usuario coincida con las credenciales configuradas.
- Con `AsyncStorage.setItem(STORAGE_KEY, usuario)` escribimos de forma física en el almacenamiento del dispositivo el nombre del usuario.
- A partir de ese segundo, si el usuario sale de la aplicación o presiona recargar (`r` en la consola), los datos permanecerán intactos.

---

### 4. Borrado de Sesión (`AsyncStorage.removeItem`)
```javascript
const handleLogout = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
  setSesionIniciada(false);
  setNombreSesion('');
};
```
- Cuando el usuario presiona el botón **CERRAR SESIÓN**, se ejecuta `AsyncStorage.removeItem(STORAGE_KEY)`.
- Esto destruye la clave guardada en la memoria del teléfono y resetea el estado a `false`, regresando de inmediato a la pantalla de login.

---

### 5. Mecanismo de Mostrar / Ocultar Contraseña
```javascript
const [mostrarPassword, setMostrarPassword] = useState(false);

<TextInput
  secureTextEntry={!mostrarPassword}
  ...
/>
<TouchableOpacity onPress={() => setMostrarPassword(!mostrarPassword)}>
  <Ionicons name={mostrarPassword ? 'eye-outline' : 'eye-off-outline'} size={22} color="#888" />
</TouchableOpacity>
```
- **`secureTextEntry`**: Si es `true`, reemplaza las letras por círculos/puntos de seguridad; si es `false`, muestra el texto plano.
- **El botón del ojo**: Cada vez que se toca, invierte el valor de `mostrarPassword` (`true` pasa a `false`, y viceversa).
- **El icono dinámico**: Con un operador ternario, muestra el ojo abierto (`eye-outline`) cuando el texto está visible o tachado/cerrado (`eye-off-outline`) cuando está protegido.