import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const SESSION_STORAGE_KEY = '@sesion_activa';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    checkActiveSession();
  }, []);

  const checkActiveSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
      if (sessionData !== null) {
        setCurrentUser(JSON.parse(sessionData));
        setCurrentScreen('home');
      }
    } catch (error) {
      console.error('Error al verificar sesión:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  };

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
      <Text style={{ textAlign: 'center', marginTop: 40 }}>Pantalla actual: {currentScreen}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
});
