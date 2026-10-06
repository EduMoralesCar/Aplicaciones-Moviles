# Proyecto 13: Módulo de Login con Persistencia (AsyncStorage)

Aplicación móvil desarrollada en **React Native** con **Expo** que implementa un módulo de autenticación y persistencia de sesión local mediante la librería **`@react-native-async-storage/async-storage`**.

---

## 📱 Descripción del Ejercicio

La aplicación simula el ciclo de vida de un inicio de sesión persistente:
1. **Verificación de Sesión Activa:** Al iniciar la app, comprueba automáticamente en el almacenamiento local si existe una sesión previa guardada.
2. **Acceso Directo:** Si hay sesión, el usuario pasa directamente a la pantalla de bienvenida sin tener que volver a identificarse.
3. **Formulario de Login:** Si no hay sesión previa, muestra los campos de usuario y contraseña con la funcionalidad interactiva de **mostrar/ocultar contraseña** mediante el ícono de ojo.
4. **Validación de Credenciales:** 
   - **Usuario:** `Walter`
   - **Contraseña:** `1234`
5. **Cierre de Sesión:** Permite eliminar la sesión del almacenamiento local y volver a la pantalla de login.

---

## 🛠️ Tecnologías y Librerías Utilizadas

- **React Native & Expo**: Framework y entorno para desarrollo móvil.
- **`@react-native-async-storage/async-storage`**: Almacenamiento local asíncrono y persistente tipo clave-valor.
- **`@expo/vector-icons`**: Íconos interactivos para la visibilidad de la contraseña (`Ionicons`).

---

## 🚀 Instalación y Ejecución

1. Clona o entra a la carpeta del proyecto:
   ```bash
   cd proyecto13-app