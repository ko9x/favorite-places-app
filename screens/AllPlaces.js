import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/places/PlacesList";
import { fetchPlaces } from "../util/database";

export default function AllPlaces() {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchPlaces()
        .then((result) => {
          setPlaces(result.rows._array);
        })
        .catch((error) => {
          console.log("error", error); //@DEBUG
        });
    }
  }, [isFocused]);

  return <PlacesList places={places} />;
}
