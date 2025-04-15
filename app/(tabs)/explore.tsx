import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color="#94A3B8" />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search outfits..."
          placeholderTextColor="#94A3B8"
        />
      </View>
    </View>
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
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    margin: 20,
    padding: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#000000',
  },
});