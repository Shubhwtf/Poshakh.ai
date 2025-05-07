import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput, Modal, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Camera, Grid2x2 as Grid, Clock, Heart, Check, X, Instagram, Twitter, Facebook, Link, ChevronDown, ChevronUp, MapPin, Mail } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('Sarah Anderson');
  const [bio, setBio] = useState('Fashion enthusiast | Personal Stylist');
  const [profileImage, setProfileImage] = useState('https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg');
  const [activeTab, setActiveTab] = useState('posts');
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // Additional profile fields
  const [socialLinks, setSocialLinks] = useState({
    instagram: 'sarah_stylist',
    twitter: 'sarahstylist',
    facebook: 'sarahstylist',
    website: 'sarahstylist.com'
  });
  
  const [contactInfo, setContactInfo] = useState({
    email: 'sarah@example.com',
    location: 'New York, USA'
  });

  // These would normally come from a backend
  const stats = {
    posts: 286,
    followers: '15.3k',
    following: 892
  };

  const posts = [
    'https://images.pexels.com/photos/2466756/pexels-photo-2466756.jpeg',
    'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg',
    'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg',
    'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg',
    'https://images.pexels.com/photos/3310695/pexels-photo-3310695.jpeg',
    'https://images.pexels.com/photos/4380970/pexels-photo-4380970.jpeg'
  ];

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library to change profile picture');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSocialLinksChange = (field: keyof typeof socialLinks, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactInfoChange = (field: keyof typeof contactInfo, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
    setUsername('Sarah Anderson');
    setBio('Fashion enthusiast | Personal Stylist');
    setSocialLinks({
      instagram: 'sarah_stylist',
      twitter: 'sarahstylist',
      facebook: 'sarahstylist',
      website: 'sarahstylist.com'
    });
    setContactInfo({
      email: 'sarah@example.com',
      location: 'New York, USA'
    });
  };

  const handleSave = () => {
    if (username.trim() === '') {
      Alert.alert('Invalid Input', 'Username cannot be empty');
      return;
    }
    
    // Would normally save to backend here
    setIsEditing(false);
    Alert.alert('Profile Updated', 'Your profile has been updated successfully');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image 
                source={{ uri: profileImage }}
              style={styles.profileImage}
            />
              <TouchableOpacity 
                style={styles.editImageButton}
                onPress={handleImagePick}
              >
              <Camera size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          
            {isEditing ? (
              <View style={styles.editContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <TextInput
                    style={styles.textInput}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Your name"
                    maxLength={30}
                  />
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Bio</Text>
                  <TextInput
                    style={[styles.textInput, styles.bioInput]}
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Tell us about yourself"
                    multiline
                    maxLength={100}
                  />
                  <Text style={styles.charCount}>{bio.length}/100</Text>
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.sectionTitle}>Contact Information</Text>
                  
                  <View style={styles.inputRow}>
                    <Mail size={18} color="#767676" style={styles.inputIcon} />
                    <TextInput
                      style={[styles.textInput, styles.rowInput]}
                      value={contactInfo.email}
                      onChangeText={(value) => handleContactInfoChange('email', value)}
                      placeholder="Email address"
                      keyboardType="email-address"
                    />
                  </View>
                  
                  <View style={styles.inputRow}>
                    <MapPin size={18} color="#767676" style={styles.inputIcon} />
                    <TextInput
                      style={[styles.textInput, styles.rowInput]}
                      value={contactInfo.location}
                      onChangeText={(value) => handleContactInfoChange('location', value)}
                      placeholder="Location"
                    />
                  </View>
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.sectionTitle}>Social Media Links</Text>
                  
                  <View style={styles.inputRow}>
                    <Instagram size={18} color="#767676" style={styles.inputIcon} />
                    <TextInput
                      style={[styles.textInput, styles.rowInput]}
                      value={socialLinks.instagram}
                      onChangeText={(value) => handleSocialLinksChange('instagram', value)}
                      placeholder="Instagram username"
                    />
                  </View>
                  
                  <View style={styles.inputRow}>
                    <Twitter size={18} color="#767676" style={styles.inputIcon} />
                    <TextInput
                      style={[styles.textInput, styles.rowInput]}
                      value={socialLinks.twitter}
                      onChangeText={(value) => handleSocialLinksChange('twitter', value)}
                      placeholder="Twitter username"
                    />
                  </View>
                  
                  <View style={styles.inputRow}>
                    <Facebook size={18} color="#767676" style={styles.inputIcon} />
                    <TextInput
                      style={[styles.textInput, styles.rowInput]}
                      value={socialLinks.facebook}
                      onChangeText={(value) => handleSocialLinksChange('facebook', value)}
                      placeholder="Facebook username"
                    />
                  </View>
                  
                  <View style={styles.inputRow}>
                    <Link size={18} color="#767676" style={styles.inputIcon} />
                    <TextInput
                      style={[styles.textInput, styles.rowInput]}
                      value={socialLinks.website}
                      onChangeText={(value) => handleSocialLinksChange('website', value)}
                      placeholder="Website"
                    />
                  </View>
                </View>
                
                <View style={styles.editActions}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.cancelButton]} 
                    onPress={handleCancel}
                  >
                    <X size={18} color="#FF5A39" />
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.saveButton]} 
                    onPress={handleSave}
                  >
                    <Check size={18} color="#fff" />
                    <Text style={styles.saveText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <Text style={styles.userName}>{username}</Text>
                <Text style={styles.userBio}>{bio}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{stats.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{stats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{stats.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
          
                <TouchableOpacity 
                  style={styles.editProfileButton}
                  onPress={() => setIsEditing(true)}
                >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.moreInfoButton}
                  onPress={() => setShowMoreInfo(!showMoreInfo)}
                >
                  <Text style={styles.moreInfoText}>
                    {showMoreInfo ? 'Hide Details' : 'Show More'}
                  </Text>
                  {showMoreInfo ? 
                    <ChevronUp size={16} color="#4DAB73" /> : 
                    <ChevronDown size={16} color="#4DAB73" />
                  }
                </TouchableOpacity>
                
                {showMoreInfo && (
                  <View style={styles.moreInfoContainer}>
                    {/* Contact Info */}
                    <View style={styles.infoSection}>
                      <Text style={styles.infoSectionTitle}>Contact Information</Text>
                      
                      <View style={styles.infoRow}>
                        <Mail size={16} color="#767676" />
                        <Text style={styles.infoText}>{contactInfo.email}</Text>
                      </View>
                      
                      <View style={styles.infoRow}>
                        <MapPin size={16} color="#767676" />
                        <Text style={styles.infoText}>{contactInfo.location}</Text>
                      </View>
        </View>

                    {/* Social Links */}
                    <View style={styles.infoSection}>
                      <Text style={styles.infoSectionTitle}>Social Media</Text>
                      
                      <View style={styles.socialLinksContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                          <Instagram size={20} color="#E1306C" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.socialButton}>
                          <Twitter size={20} color="#1DA1F2" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.socialButton}>
                          <Facebook size={20} color="#4267B2" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.socialButton}>
                          <Link size={20} color="#000000" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </>
            )}
          </View>

          {!isEditing && (
            <>
        <View style={styles.tabsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScroll}
          >
                  <TouchableOpacity 
                    style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
                    onPress={() => setActiveTab('posts')}
                  >
                    <Grid size={20} color={activeTab === 'posts' ? "#FF5A39" : "#767676"} />
                    <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>Posts</Text>
            </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
                    onPress={() => setActiveTab('recent')}
                  >
                    <Clock size={20} color={activeTab === 'recent' ? "#FF5A39" : "#767676"} />
                    <Text style={[styles.tabText, activeTab === 'recent' && styles.activeTabText]}>Recent</Text>
            </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.tab, activeTab === 'liked' && styles.activeTab]}
                    onPress={() => setActiveTab('liked')}
                  >
                    <Heart size={20} color={activeTab === 'liked' ? "#FF5A39" : "#767676"} />
                    <Text style={[styles.tabText, activeTab === 'liked' && styles.activeTabText]}>Liked</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.postsGrid}>
                {posts.map((imageUrl, index) => (
            <TouchableOpacity key={index} style={styles.postItem}>
              <Image 
                source={{ uri: imageUrl }}
                style={styles.postImage}
              />
            </TouchableOpacity>
          ))}
        </View>
            </>
          )}
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
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
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FF5A39',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F9F9F9',
  },
  userName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 4,
  },
  userBio: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#767676',
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E9E9E9',
  },
  statNumber: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#767676',
  },
  editProfileButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#F2F9F5',
    borderWidth: 1,
    borderColor: '#80C39B',
    marginBottom: 12,
  },
  editProfileText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4DAB73',
  },
  moreInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  moreInfoText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4DAB73',
    marginRight: 4,
  },
  moreInfoContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  infoSectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#767676',
    marginLeft: 12,
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 4,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  tabsContainer: {
    borderTopWidth: 1,
    borderColor: '#E9E9E9',
    marginTop: 12,
  },
  tabsScroll: {
    paddingHorizontal: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#FF5A39',
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#767676',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#FF5A39',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  postItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 2,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  // Edit mode styles
  editContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  charCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
    marginTop: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  rowInput: {
    flex: 1,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    width: '48%',
  },
  cancelButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF5A39',
  },
  saveButton: {
    backgroundColor: '#FF5A39',
  },
  cancelText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FF5A39',
    marginLeft: 8,
  },
  saveText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFF',
    marginLeft: 8,
  },
});