import { View, StyleSheet, Image } from "react-native";
import MapView, {Marker} from "react-native-maps";


const MapScreen = ({ route }) => {
const {coords, nameLocation} = route.params;

  return (
    <View style={styles.container}>
     <MapView style={{flex:1}}  initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
 <Marker
        coordinate={{ latitude: coords.latitude, longitude: coords.longitude }}
        title={nameLocation}
      />
     </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
   
  },
});

export default MapScreen;
