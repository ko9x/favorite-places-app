import { useState, useLayoutEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

import IconButton from "../components/ui/IconButton";

export default function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  useLayoutEffect(() => {
    {selectedLocation && navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={() => {
            navigation.navigate("AddPlace", {location: selectedLocation});
          }}
        />
      ),
    });}
  }, [navigation, selectedLocation]);

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      lat: lat,
      lng: lng,
    });
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
