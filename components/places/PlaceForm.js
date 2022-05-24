import { useCallback, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";

import { Colors } from "../../constants/Colors";
import Button from "../ui/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import { Place } from '../../models/place';

export default function PlaceForm({onAddPlace}) {
  const [enteredTitle, setEnteredTitle] = useState();
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function setImageHandler(image) {
    setImage(image);
  }

  const setLocationHandler = useCallback((location) => {
    setLocation(location);
  }, []);

  function savePlaceHandler() {
    const place = new Place(enteredTitle, image, location)
    onAddPlace(place);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
        <ImagePicker onSetImage={setImageHandler}/>
        <LocationPicker onSetLocation={setLocationHandler}/>
        <Button onPress={savePlaceHandler}>Add Place</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
