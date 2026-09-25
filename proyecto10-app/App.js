import 'react-native-gesture-handler'; // ¡Obligatorio arriba de todo para el menú lateral!
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';

// ==========================================
// 1. PANTALLA: LOGIN
// ==========================================
function LoginScreen({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() === '') {
      Alert.alert('Aviso', 'Por favor ingresa un nombre de usuario');
      return;
    }
    // Iniciamos sesión exitosamente y guardamos el nombre del usuario globalmente
    setUser(username);
  };

  return (
    <SafeAreaView style={styles.containerCenter}>
      <FontAwesome5 name="shopping-cart" size={80} color="#03A9F4" style={{ marginBottom: 20 }} />
      <Text style={styles.titleLogin}>Sistema de Ventas</Text>

      {/* Input de Usuario */}
      <View style={styles.inputContainer}>
        <FontAwesome5 name="user" size={16} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Input de Contraseña */}
      <View style={styles.inputContainer}>
        <FontAwesome5 name="lock" size={16} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
        <Text style={styles.btnTextBlanco}>INGRESAR</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ==========================================
// 2. PANTALLA: INICIO
// ==========================================
function InicioScreen({ route, setUser }) {
  const { username } = route.params; // Recibimos el nombre del usuario desde el Login

  return (
    <View style={styles.containerCenter}>
      <Text style={styles.textoBienvenida}>Bienvenido {username} al sistema de ventas</Text>
      <TouchableOpacity style={styles.btnLogout} onPress={() => setUser(null)}>
        <Text style={styles.btnTextBlanco}>CERRAR SESIÓN</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// 3. PANTALLA: VENTAS
// ==========================================
function VentasScreen() {
  return (
    <View style={styles.containerCenter}>
      <FontAwesome5 name="store" size={100} color="#03A9F4" />
      <Text style={styles.moduloTitle}>Módulo de Ventas</Text>
      <FontAwesome5 name="shopping-cart" size={50} color="#4CAF50" style={{ marginTop: 30 }} />
    </View>
  );
}

// ==========================================
// 4. PANTALLA: CLIENTES
// ==========================================
function ClientesScreen() {
  return (
    <View style={styles.containerCenter}>
      <Text style={{ fontSize: 24, color: '#03A9F4', fontWeight: 'bold', marginBottom: 10 }}>Clientes</Text>
      <FontAwesome5 name="id-card" size={80} color="#03A9F4" />
      <Text style={styles.moduloTitle}>Módulo de Clientes</Text>
      <FontAwesome5 name="users" size={50} color="#FF9800" style={{ marginTop: 30 }} />
    </View>
  );
}

// ==========================================
// NAVEGADORES
// ==========================================
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Navegador del Menú Lateral (Aparece sólo cuando ya estás logueado)
function DrawerNavigator({ username, setUser }) {
  return (
    <Drawer.Navigator initialRouteName="Inicio">
      <Drawer.Screen
        name="Inicio"
        options={{ drawerIcon: ({ color }) => <FontAwesome5 name="home" size={20} color={color} /> }}
      >
        {/* Le pasamos el nombre de usuario y la función para cerrar sesión */}
        {props => <InicioScreen {...props} route={{ params: { username } }} setUser={setUser} />}
      </Drawer.Screen>

      <Drawer.Screen
        name="Ventas"
        component={VentasScreen}
        options={{ drawerIcon: ({ color }) => <FontAwesome5 name="shopping-cart" size={20} color={color} /> }}
      />

      <Drawer.Screen
        name="Clientes"
        component={ClientesScreen}
        options={{ drawerIcon: ({ color }) => <FontAwesome5 name="users" size={20} color={color} /> }}
      />
    </Drawer.Navigator>
  );
}

// Componente Raíz de la Aplicación
export default function App() {
  // Manejador Global de Sesión
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      {/* Lógica Condicional: Si 'user' tiene datos, muestra el Menú. Si está null, muestra el Login */}
      {user ? (
        <DrawerNavigator username={user} setUser={setUser} />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

// ==========================================
// ESTILOS
// ==========================================
const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  titleLogin: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '90%'
  },
  icon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 10 },
  btnLogin: {
    backgroundColor: '#03A9F4',
    padding: 12,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
    marginTop: 10
  },
  btnLogout: {
    backgroundColor: '#03A9F4',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
  },
  btnTextBlanco: { color: '#fff', fontWeight: 'bold' },
  textoBienvenida: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  moduloTitle: { fontSize: 18, color: '#333', marginTop: 20, fontWeight: 'bold' }
});