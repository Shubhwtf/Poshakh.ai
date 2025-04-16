import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const TRENDING_OUTFITS = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>POSHAKH.AI</Text>
      </View>

      {/* Dashboard Stats */}
      <View style={styles.statsContainer}>
        <Link href="../(home)/calender" asChild>
          <TouchableOpacity style={styles.statCard}>
            <Feather name="calendar" size={24} color="#F97316" />
            <Text style={styles.statTitle}>Calendar</Text>
            <Text style={styles.statValue}>April</Text>
          </TouchableOpacity>
        </Link>

        <Link href="../(home)/streaks" asChild>
          <TouchableOpacity style={styles.statCard}>
            <Feather name="trending-up" size={24} color="#F97316" />
            <Text style={styles.statTitle}>Streak</Text>
            <Text style={styles.statValue}>7 days</Text>
          </TouchableOpacity>
        </Link>

        <Link href="../(home)/uploads" asChild>
          <TouchableOpacity style={styles.statCard}>
            <Feather name="upload" size={24} color="#F97316" />
            <Text style={styles.statTitle}>Uploads</Text>
            <Text style={styles.statValue}>12</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.todaysPick}>
        <Text style={styles.sectionTitle}>Today's Pick</Text>
        <View style={styles.outfitCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80' }}
            style={styles.mainOutfitImage}
          />
          <TouchableOpacity style={styles.swipeButton}>
            <Text style={styles.swipeButtonText}>Swipe →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.trendingSection}>
        <Text style={styles.sectionTitle}>Trending Outfits</Text>
        <View style={styles.trendingGrid}>
          {TRENDING_OUTFITS.map((outfit) => (
            <View key={outfit.id} style={styles.trendingItem}>
              <Image source={{ uri: outfit.image }} style={styles.trendingImage} />
              <View style={styles.pinterestIcon}>
                <Text style={styles.pinterestText}>P</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000000',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  statCard: {
    backgroundColor: '#FFF5F1',
    borderRadius: 16,
    padding: 16,
    width: '30%',
    alignItems: 'center',
  },
  statTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  statValue: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#000000',
    marginTop: 4,
  },
  todaysPick: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 24,
    color: '#000000',
    marginBottom: 16,
  },
  outfitCard: {
    backgroundColor: '#FFF5F1',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  mainOutfitImage: {
    width: '100%',
    height: 400,
    borderRadius: 16,
  },
  swipeButton: {
    backgroundColor: '#F97316',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    position: 'absolute',
    bottom: 40,
    right: 40,
  },
  swipeButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  trendingSection: {
    padding: 20,
  },
  trendingGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  trendingItem: {
    flex: 1,
    position: 'relative',
  },
  trendingImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: '#FFF5F1',
  },
  pinterestIcon: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#F97316',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinterestText: {
    color: '#FFFFFF',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
});