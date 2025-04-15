import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Sarah Anderson</Text>
        <Text style={styles.bio}>Fashion Enthusiast</Text>
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
  profileInfo: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 8,
  },
  bio: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#64748B',
  },
});