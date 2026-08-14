import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const libros = [
  { titulo: 'Historia del Perú', autor: 'José R. Flores', color: '#d4af37' },
  { titulo: 'Literatura Universal', autor: 'Ana M. Torres', color: '#0ea5e9' },
  { titulo: 'Cultura Andina', autor: 'Luis R. Vega', color: '#34d399' },
];

const categorias = ['Historia', 'Literatura', 'Arte', 'Tecnología'];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.topLabel}>Biblioteca del Perú</Text>
          <Text style={styles.welcome}>Bienvenido</Text>
        </View>
        <Pressable onPress={() => router.replace('/')} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Salir</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Colección</Text>
          <Text style={styles.heroTitle}>Descubre tus próximos libros</Text>
          <TextInput
            placeholder="Buscar por título, autor o tema"
            placeholderTextColor="#9ca3af"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categorías</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categorias.map((categoria) => (
            <View key={categoria} style={styles.categoryChip}>
              <Text style={styles.categoryText}>{categoria}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Libros destacados</Text>
        </View>

        {libros.map((libro) => (
          <View key={libro.titulo} style={styles.bookCard}>
            <View style={[styles.bookCover, { backgroundColor: libro.color }]}>
              <Text style={styles.bookCoverText}>B</Text>
            </View>

            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{libro.titulo}</Text>
              <Text style={styles.bookAuthor}>{libro.autor}</Text>
              <Pressable style={styles.readButton}>
                <Text style={styles.readButtonText}>Leer</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 60,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  topLabel: {
    color: '#f5d77a',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  welcome: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  heroCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8,
  },
  heroLabel: {
    color: '#f5d77a',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 14,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0f172a',
    fontSize: 14,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '800',
  },
  categoryScroll: {
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.28)',
  },
  categoryText: {
    color: '#f5d77a',
    fontWeight: '700',
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  bookCover: {
    width: 76,
    height: 96,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  bookCoverText: {
    color: '#0f172a',
    fontSize: 32,
    fontWeight: '900',
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  bookAuthor: {
    color: '#cbd5e1',
    fontSize: 13,
    marginBottom: 10,
  },
  readButton: {
    backgroundColor: '#d4af37',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    width: 90,
  },
  readButtonText: {
    color: '#111827',
    fontWeight: '800',
  },
});
