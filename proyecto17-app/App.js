import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';

const STORAGE_KEY = '@vehiculo_estacionado';

export default function App() {
  const [ubicacionActual, setUbicacionActual] = useState(null);
  const [vehiculoGuardado, setVehiculoGuardado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    iniciarApp();
  }, []);

  const iniciarApp = async () => {
    await obtenerGPS();
    await cargarVehiculoGuardado();
    setCargando(false);
  };

  // 1. Obtener ubicación GPS actual
  const obtenerGPS = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Active los permisos de GPS para usar la aplicación.');
        return null;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setUbicacionActual(coords);
      return coords;
    } catch (error) {
      console.error('Error GPS:', error);
      return null;
    }
  };

  // 2. Recuperar vehículo guardado de AsyncStorage
  const cargarVehiculoGuardado = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setVehiculoGuardado(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  // 3. Guardar ubicación actual como estacionamiento
  const handleGuardarUbicacion = async () => {
    const coords = (await obtenerGPS()) || ubicacionActual;

    if (!coords) {
      Alert.alert('Error', 'No se pudo obtener la ubicación actual.');
      return;
    }

    const ahora = new Date();
    const fechaHora = ahora.toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const datosEstacionamiento = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      fecha: fechaHora,
    };

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(datosEstacionamiento));
      setVehiculoGuardado(datosEstacionamiento);
      Alert.alert('Guardado', 'La ubicación de tu vehículo ha sido registrada.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar en almacenamiento local.');
    }
  };

  // 4. Centrar mapa y enfocar vehículo
  const handleEncontrarVehiculo = () => {
    if (!vehiculoGuardado) {
      Alert.alert('Aviso', 'No hay ningún vehículo guardado aún.');
      return;
    }

    if (mapRef.current && ubicacionActual) {
      mapRef.current.fitToCoordinates(
        [
          ubicacionActual,
          {
            latitude: vehiculoGuardado.latitude,
            longitude: vehiculoGuardado.longitude,
          },
        ],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    } else if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: vehiculoGuardado.latitude,
        longitude: vehiculoGuardado.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      });
    }
  };

  // 5. Eliminar ubicación guardada
  const handleEliminarUbicacion = () => {
    Alert.alert(
      'Confirmar',
      '¿Desea eliminar la ubicación del vehículo?',
      [
        { text: 'CANCELAR', style: 'cancel' },
        {
          text: 'ELIMINAR',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(STORAGE_KEY);
              setVehiculoGuardado(null);
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la ubicación.');
            }
          },
        },
      ]
    );
  };

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00a859" />
      </View>
    );
  }

  // Coordenadas base para centrar el mapa
  const centroMapa = vehiculoGuardado || ubicacionActual || {
    latitude: -12.046374,
    longitude: -77.042793,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f7fb" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabecera idéntica a la diapositiva */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🚗 Localizador de{'\n'}Vehículo</Text>
        </View>

        {/* Tarjeta: Mi Ubicación Actual */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mi Ubicación Actual</Text>
          <Text style={styles.cardText}>
            Latitud: {ubicacionActual ? ubicacionActual.latitude.toFixed(7) : 'Obteniendo...'}
          </Text>
          <Text style={styles.cardText}>
            Longitud: {ubicacionActual ? ubicacionActual.longitude.toFixed(7) : 'Obteniendo...'}
          </Text>
        </View>

        {/* Botón Verde: Guardar Ubicación */}
        <TouchableOpacity
          style={styles.btnGuardar}
          onPress={handleGuardarUbicacion}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>📍  Guardar Ubicación</Text>
        </TouchableOpacity>

        {/* Pantalla con vehículo guardado (10:55) */}
        {vehiculoGuardado ? (
          <>
            {/* Tarjeta: Vehículo Estacionado */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Vehículo Estacionado</Text>
              <Text style={styles.cardText}>Fecha:</Text>
              <Text style={styles.cardText}>{vehiculoGuardado.fecha}</Text>
              <Text style={styles.cardText}>
                Latitud: {vehiculoGuardado.latitude.toFixed(7)}
              </Text>
              <Text style={styles.cardText}>
                Longitud: {vehiculoGuardado.longitude.toFixed(7)}
              </Text>
            </View>

            {/* Botón Azul: Encontrar Mi Vehículo */}
            <TouchableOpacity
              style={styles.btnEncontrar}
              onPress={handleEncontrarVehiculo}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>🚗  Encontrar Mi Vehículo</Text>
            </TouchableOpacity>

            {/* Mapa directamente visible debajo del botón */}
            <View style={styles.mapWrapper}>
              <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                  latitude: centroMapa.latitude,
                  longitude: centroMapa.longitude,
                  latitudeDelta: 0.008,
                  longitudeDelta: 0.008,
                }}
              >
                {/* Marcador del vehículo estacionado */}
                <Marker
                  coordinate={{
                    latitude: vehiculoGuardado.latitude,
                    longitude: vehiculoGuardado.longitude,
                  }}
                  title="Vehículo Estacionado"
                  description={vehiculoGuardado.fecha}
                  pinColor="#e53935"
                />

                {/* Marcador de la ubicación del usuario */}
                {ubicacionActual && (
                  <Marker
                    coordinate={ubicacionActual}
                    title="Mi Ubicación Actual"
                    pinColor="#007aff"
                  />
                )}
              </MapView>
            </View>

            {/* Botón Rojo: Eliminar Ubicación */}
            <TouchableOpacity
              style={styles.btnEliminar}
              onPress={handleEliminarUbicacion}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>🗑️  Eliminar Ubicación</Text>
            </TouchableOpacity>
          </>
        ) : (
          /* Pantalla sin vehículo guardado (10:54) */
          <>
            <TouchableOpacity
              style={styles.btnEncontrar}
              onPress={handleEncontrarVehiculo}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>🚗  Encontrar Mi Vehículo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnEliminar}
              onPress={handleEliminarUbicacion}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>🗑️  Eliminar Ubicación</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 16 : 24,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 34,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 13,
    color: '#444444',
    lineHeight: 19,
  },
  btnGuardar: {
    backgroundColor: '#00a859', // Verde idéntico a la imagen
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  btnEncontrar: {
    backgroundColor: '#0091ea', // Azul idéntico a la imagen
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  btnEliminar: {
    backgroundColor: '#ff2d20', // Rojo idéntico a la imagen
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  mapWrapper: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});