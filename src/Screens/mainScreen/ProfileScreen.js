import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  collection,
  getDocs,
  orderBy,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectUserId } from "../../redux/auth/authSelectors";
import { Feather } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const flatListRef = useRef(null);
  const userId = useSelector(selectUserId);

  const getUsersPosts = async () => {
    const postRef = query(
      collection(db, "posts"),

      where("userId", "==", userId),
      orderBy("timePublished", "desc")
    );
    onSnapshot(postRef, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUserPosts(posts);
    });
  };

  useEffect(() => {
    getUsersPosts();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={userPosts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.photo }} style={styles.photo} />

            <Text style={styles.titleLocation}>{item.comment}</Text>
            <View style={styles.navigateBar}>
              <View style={styles.barContainer}>
                <TouchableOpacity
                  onPress={() => toComentsScreen(item)}
                  activeOpacity={0.7}
                >
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
                  activeOpacity={0.7}
                >
                  <Text>{item.nameLocation}</Text>
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
    alignItems: "center",
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

export default ProfileScreen;
