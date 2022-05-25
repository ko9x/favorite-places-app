import { FlatList, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/Colors";
import PlaceItem from "./PlaceItem";

export default function PlacesList({ places }) {
  const navigation = useNavigation();

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  function selectPlaceHandler(placeId) {
    navigation.navigate('PlaceDetails', {placeId});
  }

  function renderItems({ item }) {
    return <PlaceItem place={item} onSelect={selectPlaceHandler} />;
  }

  return (
    <FlatList
    style={styles.list}
      data={places}
      renderItem={renderItems}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 18
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
