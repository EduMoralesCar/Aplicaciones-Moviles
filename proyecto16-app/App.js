import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_PHOTO_KEY = '@ultima_foto_guardada';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraVisible, setCameraVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const cameraRef = useRef(null);

  // 1. Cargar la última foto guardada desde AsyncStorage al iniciar
  useEffect(() => {
    cargarFotoGuardada();
  }, []);

  const cargarFotoGuardada = async () => {
    try {
      const uriGuardada = await AsyncStorage.getItem(STORAGE_PHOTO_KEY);
      if (uriGuardada) {
        setPhotoUri(uriGuardada);
      }
    } catch (error) {
      console.error('Error al leer de AsyncStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Abrir la cámara verificando permisos
  const abrirCamara = async () => {
    if (!permission) {
      return;
    }
    if (!permission.granted) {
      const res = await requestPermission();
      if (!res.granted) {
        Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara para tomar fotografías.');
        return;
      }
    }
    setCameraVisible(true);
  };

  // 3. Capturar fotografía y guardarla en AsyncStorage
  const tomarFoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });

        if (photo?.uri) {
          // Guardar automáticamente en el almacenamiento local
          await AsyncStorage.setItem(STORAGE_PHOTO_KEY, photo.uri);
          setPhotoUri(photo.uri);
          setCameraVisible(false);
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo capturar la fotografía.');
      }
    }
  };

  // 4. Eliminar la foto de AsyncStorage y de la pantalla
  const eliminarFoto = async () => {
    Alert.alert(
      'Confirmar',
      '¿Desea eliminar la fotografía guardada?',
      [
        { text: 'CANCELAR', style: 'cancel' },
        {
          text: 'ELIMINAR',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(STORAGE_PHOTO_KEY);
              setPhotoUri(null);
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la fotografía.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0288d1" />
      </View>
    );
  }

  // ==========================================
  // VISTA 2: CÁMARA EN PANTALLA COMPLETA
  // ==========================================
  if (cameraVisible) {
    return (
      <SafeAreaView style={styles.cameraContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <CameraView style={styles.camera} facing="back" ref={cameraRef}>
          <View style={styles.cameraControlsContainer}>
            <TouchableOpacity
              style={styles.btnTomarFoto}
              onPress={tomarFoto}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>TOMAR FOTO</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={() => setCameraVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // VISTA 1 Y 3: MI GALERÍA LOCAL
  // ==========================================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.content}>
        <Text style={styles.title}>Mi Galería Local</Text>

        {photoUri ? (
          // Vista 3: Muestra la foto guardada + botón eliminar + botón tomar nueva
          <View style={styles.photoSection}>
            <Image source={{ uri: photoUri }} style={styles.previewImage} />

            <TouchableOpacity
              style={styles.btnEliminar}
              onPress={eliminarFoto}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>ELIMINAR FOTO</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnTomarNueva}
              onPress={abrirCamara}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>TOMAR NUEVA FOTO</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Vista 1: No hay foto guardada
          <View style={styles.emptySection}>
            <Text style={styles.emptyText}>No hay foto guardada</Text>
            <TouchableOpacity
              style={styles.btnTomarNueva}
              onPress={abrirCamara}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>TOMAR NUEVA FOTO</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d32f2f', // Título rojo como en la diapositiva
    marginBottom: 28,
  },
  emptySection: {
    alignItems: 'center',
    width: '100%',
  },
  emptyText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
  },
  photoSection: {
    alignItems: 'center',
    width: '100%',
  },
  previewImage: {
    width: 280,
    height: 320,
    borderRadius: 12,
    backgroundColor: '#000',
    marginBottom: 24,
  },
  btnTomarNueva: {
    backgroundColor: '#0288d1', // Azul según la captura
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    width: '80%',
    alignItems: 'center',
    marginBottom: 12,
  },
  btnEliminar: {
    backgroundColor: '#0288d1', // Azul según la captura
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    width: '80%',
    alignItems: 'center',
    marginBottom: 12,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cameraControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 34,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingTop: 16,
  },
  btnTomarFoto: {
    backgroundColor: '#0288d1',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 6,
  },
  btnCancelar: {
    backgroundColor: '#0288d1',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 6,
  },
});