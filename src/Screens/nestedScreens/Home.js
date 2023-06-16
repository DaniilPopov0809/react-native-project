import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const flatListRef = useRef(null);

  const toComentsScreen = () => {
    navigation.navigate("CommentsScreen");
  };

  const toMapScreen = (params) => {
    navigation.navigate("MapScreen", params);
  };

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  useLayoutEffect(() => {
    if (posts.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [posts.length]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.photo }} style={styles.photo} />

            <Text style={styles.titleLocation}>{item.nameLocation}</Text>
            <View style={styles.navigateBar}>
              <View style={styles.barContainer}>
                <TouchableOpacity onPress={toComentsScreen} activeOpacity={0.7}>
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#BDBDBD"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <Text>0</Text>
              </View>
              <View style={styles.barContainer}>
                <Feather
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TouchableOpacity
                  onPress={() => toMapScreen(item)}
                  // style={}
                  activeOpacity={0.7}
                >
                  <Text>{item.location}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  postContainer: {
    marginBottom: 10,
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  titleLocation: {
    fontWeight: 500,
    marginBottom: 8,
  },
  navigateBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 5,
  },
});

export default Home;
