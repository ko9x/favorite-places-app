import { useEffect, useState } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";

import { fetchPlace } from "../util/database";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/Colors";

export default function PlaceDetails({ route, navigation }) {
  const [place, setPlace] = useState();
  function showOnMapHandler() {
    navigation.navigate('Map', {favoritePlace: place})
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    fetchPlace(selectedPlaceId)
      .then((result) => {
        setPlace(result);
        navigation.setOptions({
          headerTitle: result.title,
        });
      })
      .catch((error) => {
        console.log("error", error); //@HANDLE ERROR
      });
  }, [selectedPlaceId]);

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
      </View>
      <OutlinedButton icon="map" onPress={showOnMapHandler}>
        View on Map
      </OutlinedButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
