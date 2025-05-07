import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // Load fonts
  useEffect(() => {
    // Set true immediately to prevent loading screen issues
    setFontsLoaded(true);
  }, []);

  const handleSignIn = () => {
    if (!validateInputs()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    
    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return false;
    }
    
    return true;
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    Alert.alert('Forgot Password', 'A password reset link will be sent to your email');
  };

  const navigateToGetStarted = () => {
    router.push('/auth/get-started');
  };

  const goBack = () => {
    router.back();
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF5A39" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={[styles.logoText, getFontStyle('PlayfairDisplay-Bold')]}>POSHAKH.AI</Text>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2960&auto=format&fit=crop' }} 
              style={styles.logoImage}
            />
          </View>

          <Text style={[styles.title, getFontStyle('PlayfairDisplay-Bold')]}>Welcome Back</Text>
          <Text style={[styles.subtitle, getFontStyle('Lato-Regular')]}>Sign in to continue your fashion journey</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingContainer}
          >
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, getFontStyle('Lato-Bold')]}>Email</Text>
                <View style={styles.inputContainer}>
                  <Feather name="mail" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, getFontStyle('Lato-Regular')]}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, getFontStyle('Lato-Bold')]}>Password</Text>
                <View style={styles.inputContainer}>
                  <Feather name="lock" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, getFontStyle('Lato-Regular')]}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
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
              </View>

              <View style={styles.optionsRow}>
                <TouchableOpacity 
                  style={styles.rememberMeOption}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && <Feather name="check" size={14} color="#fff" />}
                  </View>
                  <Text style={[styles.rememberMeText, getFontStyle('Lato-Regular')]}>Remember me</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={[styles.forgotPasswordText, getFontStyle('Lato-Bold')]}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.signInButton}
                onPress={handleSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={[styles.signInButtonText, getFontStyle('Lato-Bold')]}>Sign In</Text>
                )}
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={[styles.dividerText, getFontStyle('Lato-Regular')]}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <Feather name="facebook" size={20} color="#4267B2" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.googleIcon}>G</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.socialButton}>
                  <Feather name="twitter" size={20} color="#1DA1F2" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.socialButton}>
                  <Feather name="instagram" size={20} color="#E1306C" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.footer}>
                <Text style={[styles.footerText, getFontStyle('Lato-Regular')]}>Don't have an account? </Text>
                <TouchableOpacity onPress={navigateToGetStarted}>
                  <Text style={[styles.footerLink, getFontStyle('Lato-Bold')]}>Get Started</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
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
    marginTop: 10,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    width: '100%',
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
  content: {
    flex: 1,
    paddingHorizontal: 25,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logoText: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 15,
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#000',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    height: 54,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 54,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#333',
  },
  visibilityIcon: {
    padding: 5,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  rememberMeOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF5A39',
    borderColor: '#FF5A39',
  },
  rememberMeText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#666',
  },
  forgotPasswordText: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: '#FF5A39',
  },
  signInButton: {
    backgroundColor: '#FF5A39',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF5A39',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  signInButtonText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#fff',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#666',
    marginHorizontal: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 30,
    width: '100%',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  footerText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#666',
  },
  footerLink: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: '#FF5A39',
  },
  googleIcon: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    color: '#4285F4', // Google blue
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
}); 