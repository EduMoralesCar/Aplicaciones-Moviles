import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('Completa todos los campos');
      return;
    }

    router.replace('/home');
  };

  const handleForgotPassword = () => {
    alert('Recuperar contraseña');
  };

  const handleRegister = () => {
    alert('Ir a registrarse');
  };

  return (
    <View style={styles.container}>
      <View style={styles.orbOne} />
      <View style={styles.orbTwo} />
      <View style={styles.orbThree} />

      <View style={styles.card}>
        <Text style={styles.eyebrow}>Biblioteca del Perú</Text>
        <Text style={styles.title}>BIBLIOTECA</Text>
        <Text style={styles.subtitle}>Accede a tu cuenta institucional</Text>

        <TextInput
          placeholder="Correo institucional"
          placeholderTextColor="#a8b2c7"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#a8b2c7"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </Pressable>

        <View style={styles.linksRow}>
          <Pressable onPress={handleForgotPassword}>
            <Text style={styles.linkText}>Recuperar contraseña</Text>
          </Pressable>

          <Pressable onPress={handleRegister}>
            <Text style={styles.linkText}>Registrarse</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0f172a',
    overflow: 'hidden',
  },
  orbOne: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: '#d4af37',
    opacity: 0.22,
    top: 35,
    left: -50,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 40,
  },
  orbTwo: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#0ea5e9',
    opacity: 0.20,
    right: -30,
    bottom: 90,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 35,
  },
  orbThree: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: '#ffffff',
    opacity: 0.08,
    bottom: 120,
    left: 60,
  },
  card: {
    width: '100%',
    maxWidth: 390,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.32)',
    borderRadius: 30,
    padding: 28,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.45,
    shadowRadius: 28,
    elevation: 15,
  },
  eyebrow: {
    textAlign: 'center',
    color: '#f5d77a',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  title: {
    fontSize: 33,
    fontWeight: '900',
    textAlign: 'center',
    color: '#f8fafc',
    letterSpacing: 2,
    textShadowColor: 'rgba(212, 175, 55, 0.75)',
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 18,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#dbeafe',
    fontSize: 15,
    marginBottom: 22,
  },
  input: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    color: '#f8fafc',
    fontSize: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  button: {
    backgroundColor: '#d4af37',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 8,
  },
  buttonText: {
    color: '#111827',
    fontWeight: '900',
    fontSize: 16,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  linkText: {
    color: '#dbeafe',
    fontSize: 12,
    fontWeight: '600',
  },
});