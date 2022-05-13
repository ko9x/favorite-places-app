import { FlatList, StyleSheet, View, Text } from "react-native";

import { Colors } from "../../constants/Colors";
import PlaceItem from "./PlaceItem";

export default function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  function renderItems({ item }) {
    return <PlaceItem place={item} />;
  }

  return;
  <FlatList
    data={places}
    renderItem={renderItems}
    keyExtractor={(item) => item.id}
  />;
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200
  },
});
