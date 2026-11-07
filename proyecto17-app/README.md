# Proyecto 17: Localizador de Vehículo (GPS & Mapas)

Aplicación móvil desarrollada en **React Native** con **Expo** para la **Actividad Práctica Grupal** de la Unidad 3 (Semana 13 - *Gestión del hardware y solicitud de permisos en Android e iOS*). Permite al usuario guardar las coordenadas GPS del lugar donde estacionó su vehículo, visualizarlo en un mapa interactivo y reencontrarlo posteriormente.

---

## 📱 Funcionalidades del Sistema

1. **Lectura de GPS en Tiempo Real:** Solicita dinámicamente permisos de ubicación (`expo-location`) y captura latitud y longitud con alta precisión (`Accuracy.High`).
2. **Guardar Ubicación del Vehículo:** Registra las coordenadas y la marca de tiempo (fecha y hora exacta) al presionar el botón verde **"Guardar Ubicación"**.
3. **Persistencia Local con AsyncStorage:** Almacena los datos serializados en JSON bajo la clave `@vehiculo_estacionado`. La información persiste incluso si la app se cierra o se reinicia el teléfono.
4. **Visualización en Mapa:** Renderiza un mapa interactivo con `react-native-maps` mostrando dos marcadores clave:
   - 🔴 **Marcador Rojo:** Ubicación del vehículo estacionado.
   - 🔵 **Marcador Azul:** Ubicación actual del usuario.
5. **Enfocar Vehículo:** El botón **"Encontrar Mi Vehículo"** centra y anima la cámara del mapa hacia el vehículo o ajusta el encuadre para abarcar ambas posiciones (`fitToCoordinates`).
6. **Eliminar Ubicación:** Al presionar **"Eliminar Ubicación"**, solicita confirmación mediante un diálogo modal (`Alert.alert`) y borra el registro de `AsyncStorage`.

---

## 🛠️ Tecnologías y Librerías Utilizadas

- **Framework:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
- **Geolocalización:** `expo-location`
- **Mapas:** `react-native-maps`
- **Almacenamiento Local:** `@react-native-async-storage/async-storage`
- **Iconos:** `@expo/vector-icons`

---

## 🚀 Instalación y Ejecución

1. Ingresar al directorio del proyecto:
   ```bash
   cd proyecto17-app
   ```

2. Instalar dependencias requeridas:
   ```bash
   npx expo install expo-location react-native-maps @react-native-async-storage/async-storage @expo/vector-icons
   ```

3. Iniciar la aplicación en modo red local (recomendado para GPS y mapas):
   ```bash
   npx expo start --lan
   ```

4. Abrir en tu dispositivo o emulador:
   - **Dispositivo físico:** Escanea el código QR desde la app **Expo Go** conectada a la misma red WiFi.
   - **Emulador Android:** Presiona la tecla `a`.

---

## 🧠 Explicación de la Lógica Clave

### 1. Solicitud de Permisos de Ubicación (`expo-location`)
```javascript
const { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
  Alert.alert('Permiso denegado', 'Active los permisos de GPS para usar la aplicación.');
  return null;
}
const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
```
Solicita explícitamente autorización al usuario para acceder al hardware GPS en primer plano (*foreground*).

### 2. Almacenamiento Persistente (`AsyncStorage`)
```javascript
// Guardar:
await AsyncStorage.setItem('@vehiculo_estacionado', JSON.stringify(datosEstacionamiento));

// Recuperar al iniciar la app:
const data = await AsyncStorage.getItem('@vehiculo_estacionado');
if (data) setVehiculoGuardado(JSON.parse(data));

// Eliminar:
await AsyncStorage.removeItem('@vehiculo_estacionado');
```

### 3. Renderizado de MapView y Marcadores
```javascript
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
  <Marker
    coordinate={{ latitude: vehiculoGuardado.latitude, longitude: vehiculoGuardado.longitude }}
    title="Vehículo Estacionado"
    pinColor="#e53935"
  />
  {ubicacionActual && (
    <Marker coordinate={ubicacionActual} title="Mi Ubicación Actual" pinColor="#007aff" />
  )}
</MapView>
```
Muestra el entorno cartográfico en tiempo real y permite visualizar de un vistazo dónde dejaste el vehículo y dónde te encuentras tú.
