
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import RegistrationScreen from "./src/assets/Screens/RegistrationScreen";
import LoginScreen from "./src/assets/Screens/LoginScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
  // <RegistrationScreen />
  <LoginScreen/>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
