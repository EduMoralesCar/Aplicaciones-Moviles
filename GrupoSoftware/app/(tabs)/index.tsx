import { ScrollView, StyleSheet, Text, View } from 'react-native';

const integrantes = [
  'Taypicahuana Montalvo Renzo Andre',
  'Edu Morales Carlos',
  'Hurtado Lorenzo Ronal Dany',
  'Gu\u00e9tierrez Cu\u00e9llar Josu\u00e9 \u00c1ngel',
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>UTP</Text>
        </View>

        <Text style={styles.universityName}>Universidad Tecnol\u00f3gica del Per\u00fa</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Carrera:</Text>
            <Text style={styles.value}>Ingenier\u00eda de Software</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Ciclo:</Text>
            <Text style={styles.value}>Octavo</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Integrantes:</Text>
            <Text style={styles.value}>{integrantes.length} estudiantes</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Integrantes del Grupo</Text>

        {integrantes.map((nombre, index) => (
          <View key={index} style={styles.memberCard}>
            <View style={styles.memberNumber}>
              <Text style={styles.memberNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.memberName}>{nombre}</Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Ciclo Acad\u00e9mico 2024</Text>
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
  logoBox: {
    backgroundColor: '#c41e3a',
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 4,
  },
  universityName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 20,
  },
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 14,
  },
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
