import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function StreaksScreen() {
  const router = useRouter();
  // Streak data
  const currentStreak = 7;
  const longestStreak = 14;

  // Past outfit suggestions data
  const pastOutfits = [
    {
      id: '1',
      date: 'April 15, 2025',
      image: 'https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?auto=format&fit=crop&w=800&q=80',
      description: 'Outdoor Event',
      worn: true,
    },
    {
      id: '2',
      date: 'April 14, 2025',
      image: 'https://images.unsplash.com/photo-1536243298747-ea8874136d64?auto=format&fit=crop&w=800&q=80',
      description: 'Weekend Brunch',
      worn: true,
    },
    {
      id: '3',
      date: 'April 13, 2025',
      image: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=800&q=80',
      description: 'Formal Business Meeting',
      worn: true,
    },
    {
      id: '4',
      date: 'April 12, 2025',
      image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?auto=format&fit=crop&w=800&q=80',
      description: 'Casual Spring Outfit',
      worn: true,
    },
    {
      id: '5',
      date: 'April 11, 2025',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      description: 'Dinner Date',
      worn: true,
    },
    {
      id: '6',
      date: 'April 10, 2025',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      description: 'Office Casual',
      worn: true,
    },
    {
      id: '7',
      date: 'April 9, 2025',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
      description: 'Shopping Day',
      worn: true,
    },
  ];

  // Weekly streak indicators
  const weekStreaks = [1, 1, 1, 1, 1, 1, 1]; // filled circles for 7 days

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Style Streaks</Text>
        <View style={{width: 24}} /> {/* Empty view for alignment */}
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.streakOverview}>
          <View style={styles.streakCard}>
            <Text style={styles.streakLabel}>Current Streak</Text>
            <View style={styles.streakValue}>
              <Text style={styles.streakNumber}>{currentStreak}</Text>
              <Text style={styles.streakDays}>days</Text>
            </View>
            <Text style={styles.streakMotivation}>Keep it going!</Text>
          </View>

          <View style={styles.streakCard}>
            <Text style={styles.streakLabel}>Longest Streak</Text>
            <View style={styles.streakValue}>
              <Text style={styles.streakNumber}>{longestStreak}</Text>
              <Text style={styles.streakDays}>days</Text>
            </View>
          </View>
        </View>

        <View style={styles.weekView}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.weekStreak}>
            {weekStreaks.map((day, index) => (
              <View key={index} style={styles.dayIndicator}>
                <View style={[styles.dayCircle, day ? styles.dayActive : styles.dayInactive]} />
                <Text style={styles.dayLabel}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.outfitsSection}>
          <Text style={styles.sectionTitle}>Your Streak Outfits</Text>
          
          {pastOutfits.map((outfit) => (
            <View key={outfit.id} style={styles.outfitCard}>
              <View style={styles.outfitHeader}>
                <Text style={styles.outfitDate}>{outfit.date}</Text>
                {outfit.worn && (
                  <View style={styles.wornBadge}>
                    <Feather name="check" size={12} color="#FFFFFF" />
                    <Text style={styles.wornText}>Worn</Text>
                  </View>
                )}
              </View>
              
              <Image 
                source={{ uri: outfit.image }} 
                style={styles.outfitImage} 
                resizeMode="cover"
              />
              
              <View style={styles.outfitFooter}>
                <Text style={styles.outfitDescription}>{outfit.description}</Text>
                <TouchableOpacity>
                  <Feather name="heart" size={24} color="#F97316" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        
        {/* Extra padding at bottom for scrolling comfort */}
        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  topBarTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 22,
    color: '#000000',
    letterSpacing: 0.5,
  },
  streakOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  streakCard: {
    backgroundColor: '#FFF5F1',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  streakLabel: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#666666',
  },
  streakValue: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  streakNumber: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 42,
    color: '#F97316',
  },
  streakDays: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
    marginLeft: 5,
  },
  streakMotivation: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: '#F97316',
  },
  weekView: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 22,
    color: '#000000',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  weekStreak: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF5F1',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  dayIndicator: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 5,
  },
  dayActive: {
    backgroundColor: '#F97316',
  },
  dayInactive: {
    backgroundColor: '#E0E0E0',
  },
  dayLabel: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#666666',
  },
  outfitsSection: {
    padding: 20,
  },
  outfitCard: {
    backgroundColor: '#FFF5F1',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  outfitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  outfitDate: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#666666',
  },
  wornBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  wornText: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  outfitImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  outfitFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  outfitDescription: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 18,
    color: '#000000',
  },
});