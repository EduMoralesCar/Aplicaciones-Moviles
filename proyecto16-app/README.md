# Proyecto 16: Cámara y Galería Local (Expo Camera & AsyncStorage)

Aplicación móvil desarrollada en **React Native** con **Expo** para la **Práctica de Hardware** de la Unidad 3 (Semana 12 - *Acceso a la cámara del dispositivo móvil y almacenamiento local*). Permite tomar fotografías con la cámara del dispositivo y persistir la última captura en `AsyncStorage`.

---

## 📱 Funcionalidades

1. **Permisos de Cámara Dinámicos:** Comprobación y solicitud de permisos nativos utilizando el hook `useCameraPermissions()` de `expo-camera`.
2. **Visor de Cámara Nativo:** Apertura de la cámara en pantalla completa con `<CameraView>` y control de disparo asíncrono con `takePictureAsync()`.
3. **Persistencia Automática en AsyncStorage:** La ruta URI de la fotografía tomada se guarda bajo la clave `@ultima_foto_guardada`.
4. **Visualización en Galería Local:** Muestra la última foto tomada con opciones para **"TOMAR NUEVA FOTO"** (reemplazo) o **"ELIMINAR FOTO"** (borrado del almacenamiento local).

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** React Native / Expo (SDK 52+)
- **Cámara:** `expo-camera` (`CameraView`)
- **Persistencia:** `@react-native-async-storage/async-storage`

---

## 🚀 Instalación y Ejecución

```bash
cd proyecto16-app
npx expo install expo-camera @react-native-async-storage/async-storage
npx expo start
```
Presiona `a` para abrir en emulador Android o escanea el QR en tu dispositivo físico con **Expo Go**.
