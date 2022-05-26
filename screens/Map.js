import { useState, useLayoutEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";

import IconButton from "../components/ui/IconButton";

export default function Map({ navigation, route }) {
  const favoritePlace = route.params && route.params.favoritePlace;
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [region, setRegion] = useState();
  const defaultRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useLayoutEffect(() => {
    if (favoritePlace) {
      setRegion(() => ({
        latitude: favoritePlace.location.lat,
        longitude: favoritePlace.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }));
      navigation.setOptions({
        headerTitle: favoritePlace.title,
      });
    }
  }, [favoritePlace, route]);

  useLayoutEffect(() => {
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
  }, [navigation, selectedLocation]);

  function selectLocationHandler(event) {
    if (!favoritePlace) {
      const lat = event.nativeEvent.coordinate.latitude;
      const lng = event.nativeEvent.coordinate.longitude;

      setSelectedLocation({
        lat: lat,
        lng: lng,
      });
    }
  }

  if (!region && favoritePlace) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Loading...</Text>
      </View>
    );
  }

  if (!region && !favoritePlace) {
    setRegion(defaultRegion);
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
      {favoritePlace && (
        <Marker
          title={favoritePlace.title}
          coordinate={{
            latitude: favoritePlace.location.lat,
            longitude: favoritePlace.location.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    alignItems: "center",
  },
  fallbackText: {
    color: "white",
  },
  map: {
    flex: 1,
  },
});
