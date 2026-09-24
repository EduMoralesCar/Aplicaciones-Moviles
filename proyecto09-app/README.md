## Paso 1: Crear el proyecto

Abre una terminal dentro de la carpeta **Aplicaciones Móviles** y ejecuta los siguientes comandos:

```bash
npx create-expo-app proyecto09-app --template blank
cd proyecto09-app
```

## Paso 2: Instalar los íconos (y configurar el atajo del emulador)

Instala la librería de iconos tal como pide la diapositiva:

```bash
npx expo install @expo/vector-icons
```

> Opcional: Si quieres usar tu nuevo truco para abrir el emulador fácil, abre tu package.json y en la sección de "scripts" agrégale la línea del emulador:

```bash
"emulador": "C:\\Users\\edomo\\AppData\\Local\\Android\\Sdk\\emulator\\emulator.exe -avd TX"
```

## Paso 3: Ejecútalo

Enciende tu emulador y luego arranca el proyecto:

```bash
npm run android
```