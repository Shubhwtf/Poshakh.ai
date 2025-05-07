import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as ImagePicker from 'expo-image-picker';

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function GetStartedScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Casual']);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  // Image picker states
  const [uploadedClothes, setUploadedClothes] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);

  // Step titles and descriptions
  const steps = [
    {
      title: 'Create Your Account',
      description: "Let's get started with your personal fashion journey!",
    },
    {
      title: 'Tell Us About Yourself',
      description: 'Help us personalize your fashion experience.',
    },
    {
      title: 'Build Your Wardrobe',
      description: 'Add clothes from your closet to create outfits.',
    },
  ];

  // Define available styles and colors
  const styleOptions = ['Casual', 'Formal', 'Sporty', 'Bohemian', 'Vintage', 'Minimalist'];
  const colorOptions = [
    { name: 'Pink', color: '#E91E63' },
    { name: 'Blue', color: '#3F51B5' },
    { name: 'Green', color: '#4CAF50' },
    { name: 'Yellow', color: '#FFC107' },
    { name: 'Purple', color: '#9C27B0' }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - Navigate to main app
      router.replace('/(tabs)');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // Go back to landing if on first step
      router.back();
    }
  };

  const isFormValid = () => {
    if (currentStep === 0) {
      return formData.name && formData.email && formData.password;
    }
    return true;
  };

  // Define fallback font styles with proper typing
  const getFontStyle = (fontFamily: string): { fontFamily: string } | { fontFamily: string, fontWeight: 'normal' | 'bold' } => {
    if (!fontsLoaded) {
      return {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontWeight: fontFamily.includes('Bold') ? 'bold' : 'normal'
      };
    }
    return { fontFamily };
  };

  // Handle gallery image picking
  const handleGalleryPick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      addClothingItem(result.assets[0].uri);
    }
  };

  // Simulate taking a photo (since we removed camera functionality)
  const simulatePhotoCapture = () => {
    setProcessing(true);
    
    // Sample images to simulate camera capture
    const sampleImages = [
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604176424772-8d0f961e9b18?q=80&w=150&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=150&auto=format&fit=crop',
    ];
    
    // Random sample image
    const sampleImageUri = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    
    // Simulate processing delay
    setTimeout(() => {
      setProcessing(false);
      addClothingItem(sampleImageUri);
    }, 1500);
  };

  // Add clothing item to wardrobe
  const addClothingItem = (imageUri: string) => {
    setUploadedClothes(prev => [...prev, imageUri]);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.formContainer}>
            <Text style={[styles.label, getFontStyle('Lato-Bold')]}>Full Name</Text>
            <View style={styles.inputContainer}>
              <Feather name="user" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, getFontStyle('Lato-Regular')]}
                placeholder="Enter your name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                autoCapitalize="words"
              />
            </View>

            <Text style={[styles.label, getFontStyle('Lato-Bold')]}>Email</Text>
            <View style={styles.inputContainer}>
              <Feather name="mail" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, getFontStyle('Lato-Regular')]}
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={[styles.label, getFontStyle('Lato-Bold')]}>Password</Text>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, getFontStyle('Lato-Regular')]}
                placeholder="Create a password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.visibilityIcon}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Feather name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={[styles.privacyText, getFontStyle('Lato-Regular')]}>
              By continuing, you agree to our <Text style={[styles.textLink, getFontStyle('Lato-Bold')]}>Terms of Service</Text> and{' '}
              <Text style={[styles.textLink, getFontStyle('Lato-Bold')]}>Privacy Policy</Text>
            </Text>
          </View>
        );
      
      case 1:
        return (
          <View style={styles.stylePreferencesContainer}>
            <Text style={[styles.sectionTitle, getFontStyle('Lato-Bold')]}>Select Your Style Preferences</Text>
            
            <View style={styles.styleOptions}>
              {styleOptions.map((style) => (
                <TouchableOpacity
                  key={style}
                  style={[styles.styleOption, selectedStyles.includes(style) && styles.selectedStyle]}
                  onPress={() => {
                    if (selectedStyles.includes(style)) {
                      setSelectedStyles(selectedStyles.filter((s) => s !== style));
                    } else {
                      setSelectedStyles([...selectedStyles, style]);
                    }
                  }}
                >
                  <Text style={[styles.styleOptionText, getFontStyle('Lato-Regular')]}>{style}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={[styles.sectionTitle, getFontStyle('Lato-Bold')]}>Favorite Colors</Text>
            <View style={styles.colorOptions}>
              {colorOptions.map(({ name, color }) => (
                <TouchableOpacity
                  key={name}
                  style={[
                    styles.colorCircle, 
                    { backgroundColor: color },
                    selectedColors.includes(name) && styles.selectedColorCircle
                  ]}
                  onPress={() => {
                    if (selectedColors.includes(name)) {
                      setSelectedColors(selectedColors.filter((c) => c !== name));
                    } else {
                      setSelectedColors([...selectedColors, name]);
                    }
                  }}
                >
                  {selectedColors.includes(name) && (
                    <Feather name="check" size={20} color="#fff" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.selectionSummary}>
              <Text style={[styles.summaryText, getFontStyle('Lato-Regular')]}>
                {selectedStyles.length} styles and {selectedColors.length} colors selected
              </Text>
            </View>
          </View>
        );
      
      case 2:
        return (
          <View style={styles.uploadContainer}>
            <View style={styles.uploadInstructions}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=2052&auto=format&fit=crop' }}
                style={styles.uploadImage}
              />
              <Text style={[styles.uploadText, getFontStyle('Lato-Regular')]}>
                Start building your virtual wardrobe by taking photos of your clothes or uploading them from your gallery.
              </Text>

              <View style={styles.uploadButtons}>
                <TouchableOpacity 
                  style={styles.uploadButton}
                  onPress={simulatePhotoCapture}
                  disabled={processing}
                >
                  <Feather name="camera" size={24} color="#fff" />
                  <Text style={[styles.uploadButtonText, getFontStyle('Lato-Bold')]}>Take Photo</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.uploadButton}
                  onPress={handleGalleryPick}
                  disabled={processing}
                >
                  <Feather name="image" size={24} color="#fff" />
                  <Text style={[styles.uploadButtonText, getFontStyle('Lato-Bold')]}>Upload</Text>
                </TouchableOpacity>
              </View>

              {processing && (
                <View style={styles.processingContainer}>
                  <ActivityIndicator size="large" color="#FF5A39" />
                  <Text style={[styles.processingText, getFontStyle('Lato-Regular')]}>
                    Processing your image...
                  </Text>
                </View>
              )}

              {uploadedClothes.length > 0 && (
                <View style={styles.uploadedItemsContainer}>
                  <Text style={[styles.uploadedItemsTitle, getFontStyle('Lato-Bold')]}>
                    Uploaded Items ({uploadedClothes.length})
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.uploadedItemsScroll}>
                    {uploadedClothes.map((uri, index) => (
                      <View key={index} style={styles.uploadedItem}>
                        <Image source={{ uri }} style={styles.uploadedItemImage} />
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}

              <TouchableOpacity style={styles.skipButton}>
                <Text style={[styles.skipButtonText, getFontStyle('Lato-Bold')]}>I'll do this later</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  // Load fonts
  useEffect(() => {
    // Set true immediately to prevent loading screen issues
    setFontsLoaded(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {!fontsLoaded ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingContainer}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Feather name="arrow-left" size={24} color="#000" />
              </TouchableOpacity>
              
              <View style={styles.stepsIndicator}>
                {steps.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.stepDot,
                      currentStep === index ? styles.activeStepDot : null,
                      currentStep > index ? styles.completedStepDot : null,
                    ]}
                  />
                ))}
              </View>
            </View>

            <View style={styles.content}>
              <View style={styles.titleContainer}>
                <Text style={[styles.title, getFontStyle('PlayfairDisplay-Bold')]}>
                  {steps[currentStep].title}
                </Text>
                <Text style={[styles.description, getFontStyle('Lato-Regular')]}>
                  {steps[currentStep].description}
                </Text>
              </View>

              {renderStep()}
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.continueButton, !isFormValid() && styles.disabledButton]}
                onPress={handleContinue}
                disabled={!isFormValid()}
              >
                <Text style={[styles.continueButtonText, getFontStyle('Lato-Bold')]}>
                  {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
                </Text>
                <Feather name="arrow-right" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  stepsIndicator: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginRight: 30,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
  },
  activeStepDot: {
    width: 20,
    backgroundColor: '#FF5A39',
  },
  completedStepDot: {
    backgroundColor: '#FF5A39',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#333',
  },
  visibilityIcon: {
    padding: 5,
  },
  privacyText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20,
  },
  textLink: {
    color: '#FF5A39',
    fontFamily: 'Lato-Bold',
  },
  footer: {
    padding: 25,
    paddingBottom: Platform.OS === 'ios' ? 30 : 25,
  },
  continueButton: {
    backgroundColor: '#FF5A39',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF5A39',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#ffcdc4',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
  stylePreferencesContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    marginTop: 25,
  },
  styleOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  styleOption: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedStyle: {
    borderColor: '#FF5A39',
    backgroundColor: 'rgba(255, 90, 57, 0.05)',
  },
  styleOptionText: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: '#333',
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 15,
  },
  selectedColorCircle: {
    borderWidth: 2,
    borderColor: '#FF5A39',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionSummary: {
    marginTop: 20,
    alignItems: 'center',
  },
  summaryText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#666',
  },
  uploadContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  uploadInstructions: {
    alignItems: 'center',
  },
  uploadImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
  },
  uploadText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  uploadButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#FF5A39',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  uploadButtonText: {
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    color: '#fff',
    marginLeft: 10,
  },
  skipButton: {
    padding: 10,
  },
  skipButtonText: {
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    color: '#666',
    textDecorationLine: 'underline',
  },
  fallbackFont: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  fallbackFontBold: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: 'bold',
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  uploadedItemsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  uploadedItemsTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  uploadedItemsScroll: {
    width: '100%',
  },
  uploadedItem: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  uploadedItemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
}); 