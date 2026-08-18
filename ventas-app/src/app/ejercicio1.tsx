import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function Ejercicio1() {
    const [nombre, setNombre] = useState('');
    const [sueldoBase, setSueldoBase] = useState('');
    const [venta1, setVenta1] = useState('');
    const [venta2, setVenta2] = useState('');

    // Guardaremos el resultado como un objeto para mostrarlo más ordenado
    const [resultado, setResultado] = useState<any>(null);

    const calcular = () => {
        const base = parseFloat(sueldoBase) || 0;
        const v1 = parseFloat(venta1) || 0;
        const v2 = parseFloat(venta2) || 0;

        const comisiones = (v1 + v2) * 0.05; // 5% de las 2 ventas
        const sueldoTotal = base + comisiones;

        setResultado({
            nombre: nombre || "No ingresado",
            comisiones: comisiones,
            total: sueldoTotal
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Calculadora de Planilla</Text>
            <Text style={styles.description}>
                El vendedor recibe 5% de comisión por sus 2 ventas más su sueldo base.
            </Text>

            <Text style={styles.label}>Nombre del Vendedor:</Text>
            <TextInput style={styles.input} placeholder="Ej. Juan Pérez" value={nombre} onChangeText={setNombre} />

            <Text style={styles.label}>Sueldo Base (S/):</Text>
            <TextInput style={styles.input} placeholder="Ej. 1500" keyboardType="numeric" value={sueldoBase} onChangeText={setSueldoBase} />

            <Text style={styles.label}>Monto de la Venta 1 (S/):</Text>
            <TextInput style={styles.input} placeholder="Ej. 500" keyboardType="numeric" value={venta1} onChangeText={setVenta1} />

            <Text style={styles.label}>Monto de la Venta 2 (S/):</Text>
            <TextInput style={styles.input} placeholder="Ej. 800" keyboardType="numeric" value={venta2} onChangeText={setVenta2} />

            <TouchableOpacity style={styles.button} onPress={calcular}>
                <Text style={styles.buttonText}>Calcular Sueldo Final</Text>
            </TouchableOpacity>

            {/* Solo se muestra si ya se presionó el botón calcular */}
            {resultado && (
                <View style={styles.resultCard}>
                    <Text style={styles.resultTitle}>Resumen de Pago</Text>
                    <Text style={styles.resultText}>👤 Vendedor: <Text style={styles.bold}>{resultado.nombre}</Text></Text>
                    <Text style={styles.resultText}>💰 Comisiones (5%): <Text style={styles.bold}>S/ {resultado.comisiones.toFixed(2)}</Text></Text>
                    <Text style={styles.resultTotal}>Total a Recibir: S/ {resultado.total.toFixed(2)}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1a365d', marginBottom: 5 },
    description: { fontSize: 14, color: '#4a5568', marginBottom: 20 },
    label: { fontSize: 16, fontWeight: 'bold', color: '#2d3748', marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#cbd5e0', borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: '#fff', fontSize: 16 },
    button: { backgroundColor: '#3182ce', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    resultCard: { marginTop: 25, padding: 20, backgroundColor: '#ebf8ff', borderRadius: 10, borderWidth: 1, borderColor: '#bee3f8' },
    resultTitle: { fontSize: 18, fontWeight: 'bold', color: '#2b6cb0', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#bee3f8', paddingBottom: 5 },
    resultText: { fontSize: 16, color: '#2d3748', marginBottom: 5 },
    bold: { fontWeight: 'bold' },
    resultTotal: { fontSize: 18, fontWeight: 'bold', color: '#2c5282', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#bee3f8' }
});