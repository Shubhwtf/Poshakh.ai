import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';

const CLOTHING_CATEGORIES = [
  'T-Shirt',
  'Shirt',
  'Sweater',
  'Hoodie',
  'Jacket',
  'Coat',
  'Jeans',
  'Pants',
  'Shorts',
  'Skirt',
  'Dress',
  'Socks',
  'Shoes',
  'Hat',
  'Accessory',
];

export default function CreateScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [recognizedItem, setRecognizedItem] = useState<string | null>(null);
  const [showAIFailed, setShowAIFailed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cameraVisible, setCameraVisible] = useState(false);
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  
  const handleGalleryPick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      processImage(result.assets[0].uri);
    }
  };

  const handleCameraCapture = async () => {
    if (!permission?.granted) {
      const newPermission = await requestPermission();
      if (!newPermission.granted) {
        alert('Permission to access camera is required!');
        return;
      }
    }
    setCameraVisible(true);
  };

  const takePicture = async () => {
    // The expo-camera CameraView doesn't support direct takePictureAsync
    // We'd need to implement this with a different approach
    // For now, we'll simulate taking a picture
    setCameraVisible(false);
    
    // Simulate photo capture with a sample image
    const sampleImageUri = 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?auto=format&fit=crop&w=800&q=80';
    processImage(sampleImageUri);
  };

  const processImage = (uri: string) => {
    setImage(uri);
    setProcessing(true);
    setRecognizedItem(null);
    setShowAIFailed(false);
    
    // Simulate AI processing
    setTimeout(() => {
      setProcessing(false);
      
      // Simulate success/failure (70% success rate)
      const success = Math.random() > 0.3;
      
      if (success) {
        // Pick a random clothing category
        const randomCategory = CLOTHING_CATEGORIES[
          Math.floor(Math.random() * CLOTHING_CATEGORIES.length)
        ];
        setRecognizedItem(randomCategory);
      } else {
        setShowAIFailed(true);
      }
    }, 2000);
  };

  const handleCancel = () => {
    setImage(null);
    setProcessing(false);
    setRecognizedItem(null);
    setShowAIFailed(false);
    setSelectedCategory('');
    setCameraVisible(false);
  };

  const handleSave = () => {
    const itemToSave = recognizedItem || selectedCategory;
    if (!itemToSave) {
      alert('Please select a clothing category');
      return;
    }
    
    // Here you would save the item to your outfit collection
    alert(`Saved ${itemToSave} to your outfit`);
    handleCancel(); // Reset the form
  };

  if (cameraVisible) {
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera}>
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.cameraCancelButton} 
              onPress={() => setCameraVisible(false)}
            >
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.captureButton} 
              onPress={takePicture}
            >
              <View style={styles.captureInner} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => setCameraType(
                current => current === 'front' ? 'back' : 'front'
              )}>
              <Feather name="refresh-cw" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Outfit</Text>
      </View>
      
      <View style={styles.content}>
        {!image ? (
          <View style={styles.uploadSection}>
            <Text style={styles.instructionText}>
              Add clothing items to create your outfit
            </Text>
            
            <View style={styles.uploadButtons}>
              <TouchableOpacity 
                style={styles.uploadButton} 
                onPress={handleGalleryPick}
              >
                <Feather name="image" size={24} color="#333" />
                <Text style={styles.buttonText}>Gallery</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.uploadButton} 
                onPress={handleCameraCapture}
              >
                <Feather name="camera" size={24} color="#333" />
                <Text style={styles.buttonText}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.imageProcessingContainer}>
            <Image source={{ uri: image }} style={styles.previewImage} />
            
            {processing && (
              <View style={styles.processingOverlay}>
                <ActivityIndicator size="large" color="#ff5678" />
                <Text style={styles.processingText}>
                  Recognizing clothing item...
                </Text>
              </View>
            )}
            
            {recognizedItem && (
              <View style={styles.recognizedContainer}>
                <Text style={styles.recognizedLabel}>
                  Recognized Item:
                </Text>
                <Text style={styles.recognizedItem}>
                  {recognizedItem}
                </Text>
              </View>
            )}
            
            {showAIFailed && (
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryLabel}>
                  Please select clothing type:
                </Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select category..." value="" />
                    {CLOTHING_CATEGORIES.map((category) => (
                      <Picker.Item 
                        key={category} 
                        label={category} 
                        value={category} 
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            )}
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.cancelButton]} 
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.saveButton]} 
                onPress={handleSave}
                disabled={processing || (!recognizedItem && !selectedCategory)}
              >
                <Text style={styles.saveButtonText}>Save Item</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

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
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  uploadSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    width: '100%',
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
    fontFamily: 'Lato-Regular',
  },
  uploadButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  uploadButton: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Lato-Regular',
  },
  imageProcessingContainer: {
    width: '100%',
    alignItems: 'center',
  },
  previewImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 12,
    marginVertical: 20,
  },
  processingOverlay: {
    position: 'absolute',
    top: 20,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
  recognizedContainer: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
    width: '90%',
    alignItems: 'center',
  },
  recognizedLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Lato-Regular',
  },
  recognizedItem: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  categoryContainer: {
    width: '90%',
    marginVertical: 15,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Lato-Regular',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
    marginBottom: 40,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },
  cancelButton: {
    backgroundColor: '#f2f2f2',
  },
  saveButton: {
    backgroundColor: '#ff5678',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Lato-Regular',
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Lato-Bold',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 30,
  },
  cameraCancelButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  flipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});