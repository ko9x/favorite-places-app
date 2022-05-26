import { useState, useLayoutEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";

import IconButton from "../components/ui/IconButton";

export default function Map({ navigation, route }) {
  const placeTitle = route.params && route.params.favoritePlace.title;
  const initialLocation = route.params && {
    lat: route.params.favoritePlace.location.lat,
    lng: route.params.favoritePlace.location.lng,
  };
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useLayoutEffect(() => {
    if (placeTitle) {
      navigation.setOptions({
        headerTitle: placeTitle,
      });
      return;
    }
    if (selectedLocation) {
      navigation.setOptions({
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="save"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("AddPlace", { location: selectedLocation });
            }}
          />
        ),
      });
    }
  }, [navigation, selectedLocation, placeTitle]);

  function selectLocationHandler(event) {
    if (!placeTitle) {
      const lat = event.nativeEvent.coordinate.latitude;
      const lng = event.nativeEvent.coordinate.longitude;

      setSelectedLocation({
        lat: lat,
        lng: lng,
      });
    }
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title={placeTitle ? placeTitle : "Picked Location"}
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
