import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function CalendarScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(15); // Default to current date
  const currentMonth = 'April 2025';
  
  // Generate calendar days
  const daysInMonth = 30;
  const firstDayOfWeek = 2; // Tuesday
  const days = [...Array(daysInMonth).keys()].map(i => i + 1);
  
  // Calendar data with outfit suggestions
  const calendarData = {
    12: {
      outfit: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?auto=format&fit=crop&w=800&q=80',
      description: 'Casual Spring Outfit'
    },
    13: {
      outfit: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=800&q=80',
      description: 'Formal Business Meeting'
    },
    14: {
      outfit: 'https://images.unsplash.com/photo-1536243298747-ea8874136d64?auto=format&fit=crop&w=800&q=80',
      description: 'Weekend Brunch'
    },
    15: {
      outfit: 'https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?auto=format&fit=crop&w=800&q=80',
      description: 'Outdoor Event'
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Calendar</Text>
        <View style={{width: 24}} /> {/* Empty view for alignment */}
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.monthSelector}>
          <TouchableOpacity style={styles.monthArrow}>
            <Feather name="chevron-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.monthText}>{currentMonth}</Text>
          <TouchableOpacity style={styles.monthArrow}>
            <Feather name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.weekdaysRow}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <Text key={index} style={styles.weekday}>{day}</Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {/* Empty spaces for days before the month starts */}
          {[...Array(firstDayOfWeek)].map((_, index) => (
            <View key={`empty-${index}`} style={styles.emptyDay} />
          ))}
          
          {days.map((day) => (
            <TouchableOpacity 
              key={day} 
              style={[
                styles.calendarDay, 
                selectedDate === day && styles.selectedDay,
                calendarData[day] ? styles.hasOutfit : null
              ]}
              onPress={() => setSelectedDate(day)}
            >
              <Text style={[
                styles.dayText, 
                selectedDate === day && styles.selectedDayText
              ]}>
                {day}
              </Text>
              {calendarData[day] && (
                <View style={styles.outfitDot} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.outfitSection}>
          {selectedDate && calendarData[selectedDate] ? (
            <View style={styles.outfitCard}>
              <Text style={styles.dateHeader}>April {selectedDate}, 2025</Text>
              <Text style={styles.outfitTitle}>{calendarData[selectedDate].description}</Text>
              <Image 
                source={{ uri: calendarData[selectedDate].outfit }} 
                style={styles.outfitImage} 
                resizeMode="cover"
              />
              <View style={styles.outfitActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Feather name="thumbs-up" size={20} color="#F97316" />
                  <Text style={styles.actionText}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Feather name="refresh-cw" size={20} color="#F97316" />
                  <Text style={styles.actionText}>Try Another</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.noOutfitCard}>
              <Feather name="calendar" size={60} color="#CCC" />
              <Text style={styles.noOutfitText}>No outfit suggestion for this date</Text>
            </View>
          )}
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
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  monthArrow: {
    padding: 8,
  },
  monthText: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 20,
    color: '#000000',
    letterSpacing: 0.5,
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  weekday: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: '#666666',
    width: 36,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  emptyDay: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 5,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDay: {
    backgroundColor: '#F97316',
    borderRadius: 20,
  },
  hasOutfit: {
    position: 'relative',
  },
  dayText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#000000',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  outfitDot: {
    position: 'absolute',
    bottom: 5,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F97316',
  },
  outfitSection: {
    padding: 20,
  },
  outfitCard: {
    backgroundColor: '#FFF5F1',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dateHeader: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#666666',
  },
  outfitTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000000',
    marginVertical: 10,
  },
  outfitImage: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    marginVertical: 12,
  },
  outfitActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: '#F97316',
    marginLeft: 8,
  },
  noOutfitCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginVertical: 20,
    backgroundColor: '#FFF5F1',
    borderRadius: 20,
  },
  noOutfitText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#666666',
    marginTop: 15,
    textAlign: 'center',
  },
});