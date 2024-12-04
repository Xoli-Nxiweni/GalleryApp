import React, { useState } from 'react';
import { 
  View, 
  Image, 
  Text, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import LocationMap from '../components/LocationMarker';
import { deleteImage } from '../utils/database';
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

// More Info Icon Component
const MoreInfoIcon = ({ onPress }) => (
  <TouchableOpacity 
    style={styles.moreInfoButton} 
    onPress={onPress}
  >
    <Ionicons name="information-circle-outline" size={24} color="white" />
  </TouchableOpacity>
);

export default function SingleImageViewer({ route }) {
  const { image } = route.params;
  const navigation = useNavigation();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleDeleteImage = async () => {
    // Create a detailed message for the alert box
    const formattedLocation = image.latitude && image.longitude 
      ? `Latitude: ${image.latitude.toFixed(4)}, Longitude: ${image.longitude.toFixed(4)}`
      : 'Location data not available';
    
    const formattedTimestamp = new Date(image.timestamp).toLocaleString();
    const imageSize = image.size ? `${(image.size / (1024 * 1024)).toFixed(2)} MB` : 'Unknown';

    const imageDetails = `
      Location: ${formattedLocation}
      Taken on: ${formattedTimestamp}
      Size: ${imageSize}
    `;

    Alert.alert(
      'Delete Image',
      `Are you sure you want to delete this image?\n\nDetails:\n${imageDetails}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const deleted = await deleteImage(image.id);
              
              if (deleted) {
                Alert.alert(
                  'Success', 
                  'Image deleted successfully',
                  [{
                    text: 'OK',
                    onPress: () => navigation.goBack()
                  }]
                );
              } else {
                Alert.alert('Error', 'Could not delete the image');
              }
            } catch (error) {
              console.error('Error deleting image:', error);
              Alert.alert('Error', 'Failed to delete image');
            }
          },
        },
      ]
    );
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <View style={styles.container}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={toggleFullScreen}>
          <Image 
            source={{ uri: image.uri }} 
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Delete Button */}
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={handleDeleteImage}
      >
        <Ionicons name="trash-bin-outline" size={24} color="white" />
      </TouchableOpacity>

      {/* More Info Button */}
      <MoreInfoIcon onPress={() => alert('More Info Pressed')} />

      {/* Image Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.modalTitle}>Image Details</Text>
        
        {/* Location Details */}
        {image.latitude && image.longitude && (
          <>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>
                Latitude: {image.latitude.toFixed(4)}
              </Text>
              <Text style={styles.locationText}>
                Longitude: {image.longitude.toFixed(4)}
              </Text>
            </View>

            <LocationMap
              latitude={image.latitude} 
              longitude={image.longitude} 
              style={styles.modalMap}
            />
          </>
        )}

        {/* Timestamp */}
        <Text style={styles.timestampText}>
          Taken on: {new Date(image.timestamp).toLocaleString()}
        </Text>
      </View>

      {/* Full Screen Image Viewer */}
      <Modal visible={isFullScreen} transparent={true} onRequestClose={toggleFullScreen}>
        <ImageViewer 
          imageUrls={[{ url: image.uri }]}
          enableSwipeDown={true}
          onSwipeDown={toggleFullScreen}
          saveToLocalByLongPress={false}
          backgroundColor="black"
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 15,
  },
  image: {
    width: width - 40,
    height: height * 0.5,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  deleteButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: '#ff4747',
    padding: 10,
    borderRadius: 30,
    zIndex: 10,
  },
  moreInfoButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 25,
    zIndex: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  detailsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  locationContainer: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  locationText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalMap: {
    width: width * 0.9,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  timestampText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
