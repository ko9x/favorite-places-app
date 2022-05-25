import Ionicons from "@expo/vector-icons/Ionicons";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Button } from "react-native";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/Colors";
import { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { init } from "./util/database";
import AppLoading from "expo-app-loading";

LogBox.ignoreLogs([
  "expo-app-loading",
]);

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init().then(() => {
      setDbInitialized(true);
    }).catch((error) => {
      console.log('error', error)
    });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 }
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={30}
                  color={tintColor}
                  onPress={() => {
                    navigation.navigate("AddPlace");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new Place",
            }}
          />
          <Stack.Screen
          name="Map"
          component={Map}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
