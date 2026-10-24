# 📱 Desarrollo de Aplicaciones Móviles

![React Native](https://img.shields.io/badge/React_Native-0.86%2B-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-SDK_57%2F58-000020?style=for-the-badge&logo=expo&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![UTP](https://img.shields.io/badge/UTP-Ingenier%C3%ADa_de_Software-C41E3A?style=for-the-badge)

Repositorio centralizado con los proyectos prácticos, talleres de laboratorio y aplicaciones completas desarrolladas para el curso de **Desarrollo de Aplicaciones Móviles** en la **Universidad Tecnológica del Perú (UTP)**. Las soluciones están construidas con **React Native** y el ecosistema **Expo** (JavaScript y TypeScript).

---

## 🏛️ Información Institucional

| Campo | Detalle |
| :--- | :--- |
| **Universidad** | Universidad Tecnológica del Perú (UTP) |
| **Facultad** | Facultad de Ingeniería |
| **Carrera** | Ingeniería de Software |
| **Curso** | Aplicaciones Móviles |
| **Ciclo** | Octavo (VIII) |

### 👥 Equipo de Desarrollo

| N° | Estudiante | Código Institucional | Rol |
| :---: | :--- | :---: | :--- |
| **1** | Taypicahuana Montalvo Renzo Andre | `U23200248` | Desarrollador |
| **2** | Morales Carlos Edu | `U23222093` | Desarrollador |
| **3** | Hurtado Lorenzo Ronal Dany | `U20238833` | Desarrollador |
| **4** | Gutiérrez Cuéllar Josué Ángel | `U23219921` | Desarrollador |

---

## 📂 Mapa de Proyectos y Prácticas

A continuación se detalla cada una de las aplicaciones desarrolladas a lo largo de las sesiones de clase y talleres:

### 1. Fundamentos & Estructuración de Vistas
* **[`contador-app`](./contador-app)**: Aplicación básica para el manejo de estados (`useState`), eventos táctiles con `TouchableOpacity` y control de límites numéricos (sumar, restar sin valores negativos).
* **[`promedio-app`](./promedio-app)**: Calculadora de promedios ponderados de notas con validación en tiempo real (bloqueo de caracteres no numéricos), `KeyboardAvoidingView` y feedback visual interactivo.
* **[`proyecto04-app`](./proyecto04-app)**: Maquetación responsiva con Flexbox, `StatusBar` temática, estructura modular en cabecera y cuerpo visual, tipografía y diseño adaptable.
* **[`proyecto05-app`](./proyecto05-app)**: Arquitectura de componentes reutilizables (`PerfilCard`), paso de propiedades (`props`) y validación estricta de tipos de datos mediante la librería `prop-types`.

### 2. Hooks, Ciclo de Vida & Lógica Dinámica
* **[`proyecto06-app`](./proyecto06-app)**: Lista interactiva de tareas (To-Do List) con estado dinámico (`useState`), modal emergente (`Modal`) para edición en tiempo real y eliminación de registros.
* **[`proyecto07-app`](./proyecto07-app)**: Profundización en los Hooks esenciales de React: `useState` para mutación de datos locales y `useEffect` para el seguimiento del ciclo de vida y captura de eventos.
* **[`proyecto08-app`](./proyecto08-app)**: Directorio de empleados con adición en vivo y actualización reactiva de contadores automáticos mediante dependencias controladas en `useEffect`.
* **[`proyecto09-app`](./proyecto09-app)**: Carrito de compras implementando principios de inmutabilidad funcional con el operador de propagación (`spread operator ...`), acumulación de totales, desglose de ítems y `@expo/vector-icons`.

### 3. Navegación & Consumo de APIs REST
* **[`proyecto10-app`](./proyecto10-app)**: Navegación híbrida moderna combinando `@react-navigation/native-stack` y `@react-navigation/drawer` (menú lateral), pantalla de Login con estado de sesión global.
* **[`proyecto11-app`](./proyecto11-app)**: Consumo de servicios REST mediante `Fetch API` utilizando el catálogo de DummyJSON, renderizado de alto rendimiento con `FlatList`, filtrado reactivo por texto y manejo de estados de red (`ActivityIndicator`, errores).
* **[`proyecto12-app`](./proyecto12-app)**: Consumo avanzado de endpoints externos con la biblioteca `Axios` conectando a la API de TVMaze Shows, búsqueda dinámica, tratamiento de errores HTTP y diseño de tarjetas con póster.

### 4. Persistencia Local & Autenticación (AsyncStorage)
* **[`proyecto13-app`](./proyecto13-app)**: Persistencia de sesión de usuario en almacenamiento local del dispositivo mediante `@react-native-async-storage/async-storage`, con alternancia de visibilidad de contraseña (mostrar/ocultar).
* **[`proyecto14-app`](./proyecto14-app)**: Sistema CRUD completo de productos con almacenamiento persistente en memoria local (`AsyncStorage`), formulario de registro, edición modal, alertas de confirmación y listado dinámico.
* **[`proyecto15-app`](./proyecto15-app)**: Sistema integral de gestión de cuentas y autenticación: registro con validación, inicio de sesión persistente, recuperación de credenciales y navegación entre vistas protegidas.

### 5. Acceso a Hardware Nativo (Cámara)
* **[`proyecto16-app`](./proyecto16-app)**: Integración con la cámara del dispositivo móvil (`expo-camera` - CameraView), solicitud dinámica de permisos nativos, toma de fotografías en tiempo real y persistencia de la última imagen capturada en `AsyncStorage`.

### 6. Aplicaciones de Caso de Estudio & Expo Router
* **[`GrupoSoftware`](./GrupoSoftware)**: Portal institucional desarrollado con **Expo Router** y navegación por pestañas (`(tabs)`). Presenta la ficha técnica del grupo, identidad visual oficial de la UTP y detalle de los integrantes.
* **[`MiPrimeraApp`](./MiPrimeraApp)**: Aplicación móvil de biblioteca digital ("Biblioteca del Perú") con navegación moderna por pestañas, catálogo de libros clasificados por categoría, interfaz oscura premium y pantalla de detalle.
* **[`ventas-app`](./ventas-app)**: Aplicación empresarial desarrollada con **Expo Router** para liquidaciones comerciales:
  1. *Ejercicio 1:* Cálculo de sueldo base más comisiones escalonadas por metas de venta.
  2. *Ejercicio 2:* Gestión de ventas y bonificaciones para una concesionaria automotriz.

---

## 🛠️ Tecnologías y Librerías

El desarrollo de las aplicaciones hace uso de los siguientes componentes tecnológicos:

* **Framework & Core**: [React Native](https://reactnative.dev/) (v0.86 - v0.88), [Expo](https://expo.dev/) (SDK 57 / 58)
* **Lenguajes**: JavaScript (ES6+) y TypeScript
* **Enrutamiento y Navegación**:
  * [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
  * [React Navigation](https://reactnavigation.org/) (Native Stack & Drawer)
* **Almacenamiento Local**: `@react-native-async-storage/async-storage`
* **Hardware & Sensores**: `expo-camera`
* **Peticiones HTTP**: `Axios` y `Fetch API`
* **Iconografía & Estilos**: `@expo/vector-icons` (Ionicons, FontAwesome5, Feather, MaterialCommunityIcons)

---

## 🚀 Guía de Instalación y Ejecución

### Prerrequisitos
1. Tener instalado **Node.js** (versión 18.x o superior):
   ```bash
   node -v
   npm -v
   ```
2. Tener instalado **Expo Go** en tu dispositivo físico Android o iOS (disponible en Google Play Store y App Store), o un emulador configurado (Android Studio / iOS Simulator).

### Pasos para ejecutar cualquier proyecto

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/EduMoralesCar/Aplicaciones-Moviles.git
   cd Aplicaciones-Moviles
   ```

2. **Acceder al directorio del proyecto deseado** (por ejemplo, `proyecto16-app` o `ventas-app`):
   ```bash
   cd proyecto16-app
   ```

3. **Instalar las dependencias**:
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo de Expo**:
   ```bash
   npx expo start
   # o
   npm start
   ```

5. **Visualizar la app**:
   * **Dispositivo móvil físico**: Escanea el código QR mostrado en la terminal desde la app **Expo Go** (Android) o la app **Cámara** (iOS).
   * **Emulador Android**: Presiona `a` en la terminal.
   * **Simulador iOS**: Presiona `i` en la terminal.
   * **Navegador Web**: Presiona `w` en la terminal.

---

## 📋 Resumen Sintético de Proyectos

| Proyecto | Tipo | Tecnologías / Hooks Clave |
| :--- | :---: | :--- |
| [`contador-app`](./contador-app) | Práctica | `useState`, `TouchableOpacity`, `StyleSheet` |
| [`promedio-app`](./promedio-app) | Práctica | `useState`, `Alert`, `TextInput`, `KeyboardAvoidingView` |
| [`proyecto04-app`](./proyecto04-app) | Taller | Layout Flexbox, `StatusBar`, Componentes Nativos |
| [`proyecto05-app`](./proyecto05-app) | Taller | Componentes Reutilizables, `props`, `prop-types` |
| [`proyecto06-app`](./proyecto06-app) | Laboratorio | `useState`, `Modal`, CRUD básico de tareas |
| [`proyecto07-app`](./proyecto07-app) | Laboratorio | `useState`, `useEffect`, Ciclo de vida |
| [`proyecto08-app`](./proyecto08-app) | Laboratorio | `useState`, `useEffect`, Array dinámico de empleados |
| [`proyecto09-app`](./proyecto09-app) | Laboratorio | Spread Operator (`...`), Carrito de compras, `FontAwesome5` |
| [`proyecto10-app`](./proyecto10-app) | Laboratorio | `React Navigation` (Stack + Drawer), Gestión de sesión |
| [`proyecto11-app`](./proyecto11-app) | Laboratorio | `Fetch API`, `FlatList`, `ActivityIndicator`, DummyJSON |
| [`proyecto12-app`](./proyecto12-app) | Laboratorio | `Axios`, `FlatList`, TVMaze API, Manejo de errores HTTP |
| [`proyecto13-app`](./proyecto13-app) | Laboratorio | `AsyncStorage`, Sesión persistente, Ver/ocultar password |
| [`proyecto14-app`](./proyecto14-app) | Laboratorio | `AsyncStorage`, CRUD de productos persistente, `Alert.alert` |
| [`proyecto15-app`](./proyecto15-app) | Laboratorio | `AsyncStorage`, Sistema de Autenticación (Login/Registro) |
| [`proyecto16-app`](./proyecto16-app) | Laboratorio | `expo-camera`, `CameraView`, `AsyncStorage`, Permisos |
| [`GrupoSoftware`](./GrupoSoftware) | Institucional | `Expo Router`, Tab Navigation, Branding UTP |
| [`MiPrimeraApp`](./MiPrimeraApp) | Aplicación | `Expo Router`, Biblioteca digital, UI personalizada |
| [`ventas-app`](./ventas-app) | Actividad Grupal | `Expo Router`, Cálculos de sueldos, bonos y comisiones |

---

## 📄 Licencia

Este repositorio tiene fines puramente académicos y educativos para la asignatura de **Desarrollo de Aplicaciones Móviles** (UTP). Código abierto bajo la licencia MIT o de uso universitario.
