import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* Ocultamos la barra en la pantalla principal */}
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />

      {/* Le ponemos un título bonito y formal al Ejercicio 1 */}
      <Stack.Screen
        name="ejercicio1"
        options={{ title: 'Sueldo y Comisiones' }}
      />

      {/* Le ponemos un título bonito y formal al Ejercicio 2 */}
      <Stack.Screen
        name="ejercicio2"
        options={{ title: 'Reporte Concesionaria' }}
      />
    </Stack>
  );
}