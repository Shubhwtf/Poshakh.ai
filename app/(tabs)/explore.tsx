import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MoveVertical as MoreVertical } from 'lucide-react-native';

// Add TypeScript types for the FilterChips component
interface FilterChipsProps {
  filters: string[];
  activeFilters: string[];
}

const FilterChips: React.FC<FilterChipsProps> = ({ filters, activeFilters }) => (
  <View style={{ flexDirection: 'row', marginBottom: 16 }}>
    {filters.map((filter: string, index: number) => (
      <TouchableOpacity
        key={index}
        style={{
          backgroundColor: activeFilters.includes(filter) ? '#FF5A39' : '#E0E0E0',
          padding: 8,
          borderRadius: 16,
          marginRight: 8,
        }}
      >
        <Text style={{ color: activeFilters.includes(filter) ? '#fff' : '#000' }}>{filter}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default function OutfitSuggestionScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity style={styles.backButton}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Outfit Suggestion</Text>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <FilterChips 
          filters={['Occasion', 'Rainy', 'Relaxed']}
          activeFilters={['Rainy', 'Relaxed']}
        />
        
        <View style={styles.outfitGrid}>
          <View style={styles.outfitRow}>
            <View style={styles.outfitItem}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg' }} 
                style={styles.outfitImage}
              />
              <TouchableOpacity style={styles.shopButton}>
                <Text style={styles.shopButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.outfitItem}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg' }} 
                style={styles.outfitImage}
              />
              <TouchableOpacity style={styles.shopButton}>
                <Text style={styles.shopButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.outfitRow}>
            <View style={styles.outfitItem}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/7319473/pexels-photo-7319473.jpeg' }} 
                style={styles.outfitImage}
              />
              <TouchableOpacity style={styles.shopButton}>
                <Text style={styles.shopButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.outfitItem}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/6046183/pexels-photo-6046183.jpeg' }} 
                style={styles.outfitImage}
              />
              <TouchableOpacity style={styles.shopButton}>
                <Text style={styles.shopButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.saveContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Outfit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeftContainer: {
    width: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 22,
    color: '#000',
  },
  moreButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  outfitGrid: {
    padding: 16,
  },
  outfitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  outfitItem: {
    width: '48%',
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  outfitImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  shopButton: {
    padding: 8,
    alignItems: 'center',
  },
  shopButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FF5A39',
  },
  saveContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: '#FF5A39',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});