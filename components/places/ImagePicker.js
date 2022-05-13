import {useState} from 'react';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import { Button, View, Alert, Image, Text, StyleSheet } from "react-native";
import { Colors } from '../../constants/Colors';

export default function ImagePicker() {
    const [currentImage, setCurrentImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
        Alert.alert('Insufficient Permissions', 'You need to grant camera permissions to use this app.');
        return false;
    }

    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
        return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log('image', image)
    setCurrentImage(image.uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>

  if (currentImage) {
    imagePreview = <Image style={styles.image} source={{uri: currentImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>
          {imagePreview}
      </View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%',
    }
})
