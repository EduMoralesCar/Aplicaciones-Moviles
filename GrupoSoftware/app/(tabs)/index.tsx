import { ScrollView, StyleSheet, Text, View } from 'react-native';

// Nombres en orden alfabético
const integrantes = [
  'Edu Morales Carlos',
  'Guétierrez Cuéllar Josuée Ángel',
  'Hurtado Lorenzo Ronal Dany',
  'Taypicahuana Montalvo Renzo Andre',
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Logo UTP estilo "A" geométrico */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <View style={styles.logoA}>
              <View style={styles.logoLeftLeg} />
              <View style={styles.logoRightLeg} />
              <View style={styles.logoCrossbar} />
            </View>
          </View>
          <Text style={styles.universityName}>Universidad Tecnológica del Perú</Text>
        </View>

        {/* Información del Grupo */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Carrera:</Text>
            <Text style={styles.value}>Ingeniería de Software</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Curso:</Text>
            <Text style={styles.value}>Aplicaciones Móviles</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Ciclo:</Text>
            <Text style={styles.value}>Octavo (VIII)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Integrantes:</Text>
            <Text style={styles.value}>{integrantes.length} estudiantes</Text>
          </View>
        </View>

        {/* Título Integrantes */}
        <Text style={styles.sectionTitle}>Integrantes del Grupo</Text>

        {/* Lista de integrantes */}
        {integrantes.map((nombre, index) => (
          <View key={index} style={styles.memberCard}>
            <View style={styles.memberNumber}>
              <Text style={styles.memberNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.memberName}>{nombre}</Text>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Ciclo Académico 2024</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 50,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  // Logo styles
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBox: {
    backgroundColor: '#c41e3a',
    borderRadius: 20,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  logoA: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoLeftLeg: {
    position: 'absolute',
    width: 12,
    height: 80,
    backgroundColor: '#ffffff',
    left: 20,
    top: 10,
    transform: [{ rotate: '-20deg' }],
    borderRadius: 6,
  },
  logoRightLeg: {
    position: 'absolute',
    width: 12,
    height: 80,
    backgroundColor: '#ffffff',
    right: 20,
    top: 10,
    transform: [{ rotate: '20deg' }],
    borderRadius: 6,
  },
  logoCrossbar: {
    position: 'absolute',
    width: 60,
    height: 10,
    backgroundColor: '#ffffff',
    top: 55,
    borderRadius: 5,
  },

  universityName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 0,
    letterSpacing: 0.5,
  },

  // Info card styles
  infoCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(196, 30, 58, 0.35)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '700',
  },
  value: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  // Section title
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 14,
  },

  // Member card styles
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(196, 30, 58, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(196, 30, 58, 0.25)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  memberNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#c41e3a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberNumberText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
  },
  memberName: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },

  // Footer
  footer: {
    marginTop: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  footerText: {
    color: '#cbd5e1',
    fontSize: 12,
  },
});
