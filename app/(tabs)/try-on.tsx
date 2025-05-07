import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Camera as CameraIcon, Image as ImageIcon } from 'lucide-react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function TryOnScreen() {
  const [mode, setMode] = useState<'select' | 'static' | 'camera'>('select');
  const [cameraType, setCameraType] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();

  const selectedOutfit = {
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    name: 'Velvet Evening Gown',
  };

  const handleCameraMode = async () => {
    if (!permission?.granted) {
      const newPermission = await requestPermission();
      if (!newPermission.granted) {
        return;
      }
    }
    setMode('camera');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Virtual Try-On</Text>
        {mode !== 'select' && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setMode('select')}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {mode === 'select' && (
        <View style={styles.modeSelection}>
          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => setMode('static')}>
            <ImageIcon size={32} color="#E6C9B5" />
            <Text style={styles.modeButtonText}>Static Preview</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modeButton}
            onPress={handleCameraMode}>
            <CameraIcon size={32} color="#E6C9B5" />
            <Text style={styles.modeButtonText}>Camera Preview</Text>
          </TouchableOpacity>
        </View>
      )}

      {mode === 'static' && (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80' }}
            style={styles.modelImage}
          />
          <Image
            source={{ uri: selectedOutfit.image }}
            style={[styles.outfitOverlay, { opacity: 0.8 }]}
          />
        </View>
      )}

      {mode === 'camera' && (
        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera}>
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={() => setCameraType(
                  current => current === 'front' ? 'back' : 'front'
                )}>
                <Text style={styles.flipButtonText}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: selectedOutfit.image }}
              style={[styles.outfitOverlay, { opacity: 0.6 }]}
            />
          </CameraView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0F0A',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#2C1810',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#E6C9B5',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  backButtonText: {
    fontFamily: 'Lato-Regular',
    color: '#8B6B5D',
    fontSize: 16,
  },
  modeSelection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  modeButton: {
    backgroundColor: '#2C1810',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  modeButtonText: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: '#E6C9B5',
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
  },
  modelImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  outfitOverlay: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  flipButton: {
    backgroundColor: '#2C1810',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  flipButtonText: {
    fontFamily: 'Lato-Regular',
    color: '#E6C9B5',
    fontSize: 16,
  },
});