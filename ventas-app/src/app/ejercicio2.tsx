import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function Ejercicio2() {
    const [refacciones, setRefacciones] = useState('');
    const [servicio, setServicio] = useState('');
    const [autos, setAutos] = useState('');

    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const vRefacciones = parseFloat(refacciones) || 0;
        const vServicio = parseFloat(servicio) || 0;
        const vAutos = parseFloat(autos) || 0;

        const importeTotal = vRefacciones + vServicio + vAutos;
        const promedio = importeTotal / 3;

        // Condición de 500,000 soles solicitada en el problema
        const metaAlcanzada = promedio >= 500000;
        const mensaje = metaAlcanzada ? "Se alcanzó el objetivo" : "Buscar nuevas estrategias de ventas";

        setResultado({
            total: importeTotal,
            promedio: promedio,
            mensaje: mensaje,
            exito: metaAlcanzada
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Reporte de Concesionaria</Text>
            <Text style={styles.description}>
                Ingrese los importes de ventas. La meta es un promedio de S/ 500,000.
            </Text>

            <Text style={styles.label}>Ventas de Refacciones (S/):</Text>
            <TextInput style={styles.input} placeholder="Ej. 150000" keyboardType="numeric" value={refacciones} onChangeText={setRefacciones} />

            <Text style={styles.label}>Ventas de Servicio (S/):</Text>
            <TextInput style={styles.input} placeholder="Ej. 200000" keyboardType="numeric" value={servicio} onChangeText={setServicio} />

            <Text style={styles.label}>Ventas de Autos y Camiones (S/):</Text>
            <TextInput style={styles.input} placeholder="Ej. 800000" keyboardType="numeric" value={autos} onChangeText={setAutos} />

            <TouchableOpacity style={styles.button} onPress={calcular}>
                <Text style={styles.buttonText}>Calcular Rendimiento</Text>
            </TouchableOpacity>

            {/* Panel de resultados */}
            {resultado && (
                <View style={styles.resultCard}>
                    <Text style={styles.resultTitle}>Resultados del Mes</Text>
                    <Text style={styles.resultText}>Importe Total: <Text style={styles.bold}>S/ {resultado.total.toFixed(2)}</Text></Text>
                    <Text style={styles.resultText}>Promedio de Ventas: <Text style={styles.bold}>S/ {resultado.promedio.toFixed(2)}</Text></Text>

                    {/* Mostramos el mensaje en verde si llegó a la meta, o rojo si no llegó */}
                    <View style={[styles.messageBox, resultado.exito ? styles.bgSuccess : styles.bgWarning]}>
                        <Text style={[styles.messageText, resultado.exito ? styles.textSuccess : styles.textWarning]}>
                            {resultado.mensaje}
                        </Text>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#744210', marginBottom: 5 },
    description: { fontSize: 14, color: '#718096', marginBottom: 20 },
    label: { fontSize: 16, fontWeight: 'bold', color: '#2d3748', marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#cbd5e0', borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: '#fff', fontSize: 16 },
    button: { backgroundColor: '#d69e2e', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

    resultCard: { marginTop: 25, padding: 20, backgroundColor: '#fffff0', borderRadius: 10, borderWidth: 1, borderColor: '#f6e05e' },
    resultTitle: { fontSize: 18, fontWeight: 'bold', color: '#975a16', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#f6e05e', paddingBottom: 5 },
    resultText: { fontSize: 16, color: '#2d3748', marginBottom: 8 },
    bold: { fontWeight: 'bold' },

    messageBox: { marginTop: 15, padding: 15, borderRadius: 8, alignItems: 'center' },
    messageText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },

    // Colores dinámicos para el mensaje final
    bgSuccess: { backgroundColor: '#c6f6d5' },
    textSuccess: { color: '#22543d' },
    bgWarning: { backgroundColor: '#fed7d7' },
    textWarning: { color: '#822727' }
});