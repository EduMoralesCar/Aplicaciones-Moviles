# Proyecto 06 - Lista de tareas

Aplicacion React Native creada con Expo para agregar, editar y eliminar tareas.

## Instalaciones realizadas

1. Se trabajo con Expo SDK `57.0.0`, React Native `0.86.3` y React `19.2.3`, versiones que ya estaban configuradas en el proyecto.

2. Se instalo AsyncStorage desde la carpeta del proyecto:

   ```bash
   npx expo install @react-native-async-storage/async-storage
   ```

3. La dependencia quedo registrada en `package.json` y `package-lock.json` con la version `2.2.0`.

## Cambios realizados

1. Se cambio el estado inicial de tareas a un arreglo vacio:

   ```javascript
   const [tareas, setTareas] = useState([]);
   ```

2. Al abrir la aplicacion, `AsyncStorage.getItem('mis_tareas')` busca las tareas guardadas y las carga en pantalla.

3. Cada vez que cambia la lista, se ejecuta `AsyncStorage.setItem('mis_tareas', JSON.stringify(tareas))`.

4. Las tareas se guardan automaticamente al agregar, editar o eliminar.

5. Se corrigio el estado del campo de entrada para iniciar como texto vacio:

   ```javascript
   const [nuevaTarea, setNuevaTarea] = useState('');
   ```

## Archivos modificados

- `App01.js`: logica de carga y guardado local con AsyncStorage.
- `package.json`: dependencia de AsyncStorage.
- `package-lock.json`: versiones y registro de instalacion.
- `README.md`: documentacion del proyecto.

## Validación

- La sintaxis JSX de `App01.js` fue comprobada correctamente.
- No se encontraron errores de diagnostico en `App01.js`.

## Ejecutar el proyecto

Desde esta carpeta:

```bash
npm start
```

Tambien se puede ejecutar directamente en Android:

```bash
npm run android
```

> Expo inicia actualmente `App.js` como archivo principal. Para probar la pantalla con persistencia, `App01.js` debe conectarse desde `App.js` o configurarse como entrada de la aplicacion.

---
