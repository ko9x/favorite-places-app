import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/places/PlacesList";

export default function AllPlaces({ route }) {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setPlaces((prevState) => [...prevState, route.params.place]);
    }
  }, [isFocused]);

  return <PlacesList places={places}/>;
}
