import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Dimensions,
  StatusBar,
  Animated,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

type FeatureItem = {
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
};

export default function LandingScreen() {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  // Track current page for pagination dots
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Features data
  const features: FeatureItem[] = [
    {
      title: "Personalized Style",
      description: "Create your own digital wardrobe and get outfit recommendations based on your style preferences.",
      icon: "star"
    },
    {
      title: "Outfit Planning",
      description: "Plan your outfits for any occasion or weather condition with just a few taps.",
      icon: "calendar"
    },
    {
      title: "AI Recognition",
      description: "Our AI automatically identifies and categorizes your clothing items for effortless organization.",
      icon: "camera"
    }
  ];

  // Sample outfit data
  const todaysOutfit = {
    image: 'https://images.unsplash.com/photo-1624177539165-2cd2ee52c795?q=80&w=320&auto=format',
    temp: '72°'
  };

  const virtualCloset = [
    { id: '1', name: 'T-shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=150&auto=format', category: 'Tops' },
    { id: '2', name: 'Jeans', image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=150&auto=format', category: 'Bottoms' },
    { id: '3', name: 'Handbag', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=150&auto=format', category: 'Accessories' },
    { id: '4', name: 'Sneakers', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=150&auto=format', category: 'Shoes' },
    { id: '5', name: 'White Sneakers', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=150&auto=format', category: 'Shoes' },
    { id: '6', name: 'Earrings', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=150&auto=format', category: 'Accessories' },
  ];

  const categories = ['Tops', 'Bottoms', 'Shoes', 'Accessories'];
  const [activeCategory, setActiveCategory] = useState('Tops');

  const filteredItems = virtualCloset.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  const navigateToHome = () => {
    router.push('/auth/get-started');
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentPage(currentIndex);
  };

  const scrollToPage = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Main Header */}
      <Animated.View 
        style={[
          styles.mainHeader, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={styles.brandText}>POSHAKH.AI</Text>
        <Text style={styles.tagline}>Your Personal Fashion Assistant</Text>
      </Animated.View>
      
      {/* Phone mockups with content */}
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* First Screen: App Introduction */}
        <View style={styles.page}>
          <Animated.View 
            style={[
              styles.phoneContainer, 
              { 
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <LinearGradient
              colors={['#FFF3F0', '#FFF8F7']}
              style={styles.gradientBackground}
            >
              <View style={styles.introScreen}>
                <View style={styles.logoContainer}>
                  <Text style={styles.logoLetter}>P</Text>
                  <Text style={styles.logoText}>Poshakh.ai</Text>
                </View>
                
                <View style={styles.featuresContainer}>
                  {features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <View style={styles.featureIconContainer}>
                        <Feather name={feature.icon} size={24} color="#FF5A39" />
                      </View>
                      <View style={styles.featureTextContainer}>
                        <Text style={styles.featureTitle}>{feature.title}</Text>
                        <Text style={styles.featureDescription}>{feature.description}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Second Screen: Today's Outfit */}
        <View style={styles.page}>
          <View style={styles.phoneContainer}>
            <View style={styles.phoneContent}>
              <View style={styles.outfitContainer}>
                <Text style={styles.sectionTitle}>Today's Outfit</Text>
                
                <View style={styles.outfitContent}>
                  <Image 
                    source={{ uri: todaysOutfit.image }} 
                    style={styles.outfitImage}
                    resizeMode="contain"
                  />
                  <View style={styles.weatherContainer}>
                    <Feather name="sun" size={24} color="#F97316" style={styles.weatherIcon} />
                    <Text style={styles.temperature}>{todaysOutfit.temp}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.planButton}>
                  <Text style={styles.planButtonText}>Plan Tomorrow</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add New Clothes</Text>
                </TouchableOpacity>

                <View style={styles.bottomTabBar}>
                  <TouchableOpacity style={styles.tabItem}>
                    <Feather name="home" size={24} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.tabItem}>
                    <View style={styles.tabCircle} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.tabItem}>
                    <Feather name="user" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Third Screen: Virtual Closet */}
        <View style={styles.page}>
          <View style={styles.phoneContainer}>
            <View style={styles.phoneContent}>
              <View style={styles.closetContainer}>
                <Text style={styles.sectionTitle}>Virtual Closet</Text>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                  {categories.map((category) => (
                    <TouchableOpacity 
                      key={category}
                      style={[
                        styles.categoryTab, 
                        activeCategory === category && styles.activeCategory
                      ]}
                      onPress={() => setActiveCategory(category)}
                    >
                      <Text style={[
                        styles.categoryText,
                        activeCategory === category && styles.activeCategoryText
                      ]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <View style={styles.closetGrid}>
                  {filteredItems.map((item) => (
                    <View key={item.id} style={styles.closetItem}>
                      <Image 
                        source={{ uri: item.image }} 
                        style={styles.closetItemImage}
                        resizeMode="contain"
                      />
                      <Text style={styles.closetItemName}>{item.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Fourth Screen: Weekly Outfit Planner */}
        <View style={styles.page}>
          <View style={styles.phoneContainer}>
            <View style={styles.phoneContent}>
              <View style={styles.plannerContainer}>
                <View style={styles.plannerHeader}>
                  <Feather name="arrow-left" size={24} color="#000" />
                  <Text style={styles.plannerTitle}>Weekly Outfit Planner</Text>
                  <View style={{width: 24}} />
                </View>
                
                <View style={styles.weekdaysRow}>
                  {['Mo', 'Tu', 'We', 'Th', 'Sa'].map((day, index) => (
                    <Text key={index} style={styles.weekdayText}>{day}</Text>
                  ))}
                </View>
                
                <View style={styles.calendarGrid}>
                  {/* First Row */}
                  <View style={[styles.calendarCell, {backgroundColor: '#FFF2F0'}]}>
                    <Text style={styles.dateText}>25</Text>
                  </View>
                  <View style={[styles.calendarCell, {backgroundColor: '#FFF5F0'}]} />
                  <View style={[styles.calendarCell, {backgroundColor: '#F0F9F4'}]} />
                  <View style={[styles.calendarCell, {backgroundColor: '#F1E6FF'}]} />
                  <View style={[styles.calendarCell, {backgroundColor: '#F0F9F4'}]} />
                  
                  {/* Second Row */}
                  <View style={[styles.calendarCell, {backgroundColor: '#F0F9F4'}]} />
                  <View style={[styles.calendarCell, {backgroundColor: '#F0F9F4'}]}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=150&auto=format' }} style={styles.outfitPlannerImage} />
                  </View>
                  <View style={[styles.calendarCell, {backgroundColor: '#FFF5F0'}]}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1624177539165-2cd2ee52c795?q=80&w=100&auto=format' }} style={styles.outfitPlannerImage} />
                  </View>
                  <View style={[styles.calendarCell, {backgroundColor: '#FFF5F0'}]} />
                  <View style={[styles.calendarCell, {backgroundColor: '#FFF5F0'}]} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {[0, 1, 2, 3].map((index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.paginationDot,
              currentPage === index && styles.paginationDotActive
            ]}
            onPress={() => scrollToPage(index)}
          />
        ))}
      </View>

      {/* Get Started Button */}
      <Animated.View 
        style={[
          styles.buttonContainer, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: Animated.multiply(slideAnim, -1) }]
          }
        ]}
      >
        <TouchableOpacity style={styles.getStartedButton} onPress={navigateToHome}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
          <Text style={styles.loginText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mainHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  brandText: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000000',
    letterSpacing: 1,
  },
  tagline: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
  },
  page: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneContainer: {
    width: width * 0.8,
    height: height * 0.65,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  phoneContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradientBackground: {
    flex: 1,
  },
  // Intro Screen
  introScreen: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoLetter: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 80,
    color: '#000000',
  },
  logoText: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 24,
    color: '#000000',
    marginTop: -15,
  },
  featuresContainer: {
    width: '100%',
    marginTop: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 90, 57, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
  featureDescription: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
  },
  // Today's Outfit Screen
  outfitContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 20,
  },
  outfitContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  outfitImage: {
    width: '50%',
    height: 140,
  },
  weatherContainer: {
    backgroundColor: '#F0F9F4',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: 80,
  },
  weatherIcon: {
    marginBottom: 5,
  },
  temperature: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000000',
  },
  planButton: {
    backgroundColor: '#F1E6FF',
    borderRadius: 25,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  planButtonText: {
    fontFamily: 'Lato-Bold',
    color: '#000000',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#FFE5DD',
    borderRadius: 25,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Lato-Bold',
    color: '#000000',
    fontSize: 16,
  },
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#F0F9F4',
    borderRadius: 30,
    padding: 15,
    justifyContent: 'space-around',
    marginTop: 'auto',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
  },
  // Virtual Closet Screen
  closetContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  categoriesScroll: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  categoryTab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 10,
  },
  activeCategory: {
    backgroundColor: '#E5F5EB',
    borderRadius: 20,
  },
  categoryText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#888888',
  },
  activeCategoryText: {
    fontFamily: 'Lato-Bold',
    color: '#000000',
  },
  closetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  closetItem: {
    width: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  closetItemImage: {
    width: '80%',
    height: 100,
  },
  closetItemName: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#000000',
    marginTop: 5,
    textAlign: 'center',
  },
  // Weekly Planner Screen
  plannerContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 15,
  },
  plannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  plannerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#000000',
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekdayText: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: '#000000',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calendarCell: {
    width: '19%',
    aspectRatio: 0.8,
    marginBottom: 5,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: '#000000',
  },
  outfitPlannerImage: {
    width: '90%',
    height: '90%',
    borderRadius: 8,
  },
  // Pagination
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D0D0D0',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#FF5A39',
    width: 20,
  },
  // Get Started Button
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  getStartedButton: {
    backgroundColor: '#FF5A39',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    marginBottom: 15,
    shadowColor: '#FF5A39',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  getStartedText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  loginText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#666666',
    textDecorationLine: 'underline',
  }
}); 