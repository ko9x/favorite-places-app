import { useEffect, useState } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";

import { fetchPlace } from "../util/database";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/Colors";

export default function PlaceDetails({ route }) {
  const [place, setPlace] = useState();
  function showOnMapHandler() {}

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    fetchPlace(selectedPlaceId)
      .then((result) => {
        setPlace(result);
      })
      .catch((error) => {});
  }, []);

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
