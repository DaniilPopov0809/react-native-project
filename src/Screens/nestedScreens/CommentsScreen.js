import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import ArrowUP from "../../image/send.svg";

import {
  doc,
  addDoc,
  updateDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectName } from "../../redux/auth/authSelectors";

const CommentsScreen = ({ route }) => {
  const postId = route.params.id;
  const photo = route.params.photo;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const userName = useSelector(selectName);

  useEffect(() => {
    getAllComments();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const createComment = async () => {
    // const date = new Date().toLocaleDateString("uk-UA");
    // const time = new Date().toLocaleTimeString();

    const newComment = {
      timePublished: new Date().toLocaleString(),
      userName,
      comment,
    };

    try {
      const ref = doc(db, "posts", postId);
      await addDoc(collection(ref, "comments"), newComment);
      // await updateDoc(ref, {
      //   comments: [...comments, newComment],

      // });
      console.log("document updated");
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const getAllComments = async () => {
    try {
      const postsRef = collection(db, "posts");
      const postDoc = doc(postsRef, postId);
      const commentsRef = collection(postDoc, "comments");
      // const sortedCommentsQuery = query(commentsRef, orderBy("timePublished", "desc"));

      onSnapshot(commentsRef, (snapshot) => {
        const sortedComments = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setComments(sortedComments);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        
          
          {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 0}>
            <View  style={{
            marginBottom: isShowKeyboard ? -100 : 31,
          }}> */}
          <Image source={{ uri: photo }} style={styles.photo} 
          />
          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <View>
                <Text>{item.comment}</Text>
                <Text>{item.userName}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          {/* </View>
        </KeyboardAvoidingView> */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setComment}
            value={comment}
          />
          <TouchableOpacity
            onPress={createComment}
            activeOpacity={0.7}
            style={styles.sendBtn}
            disabled={comment.length === 0}
          >
            <ArrowUP width={34} height={34} fill={"#FF6C00"} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    backgroundColor: "#ffffff",
    justifyContent: "flex-end",
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    height: 51,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  inputContainer: {
    position: "relative",
  },
  sendBtn: {
    position: "absolute",
    right: 8,
    top: 8,
  },
});

export default CommentsScreen;
