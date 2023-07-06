import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera } from "expo-camera";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import * as Location from "expo-location";
import getLocation from "../../API/getLocation";
import { verificationAddress } from "../../utils/utils";
import { selectUserId, selectName } from "../../redux/auth/authSelectors";

import { db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from 'firebase/firestore'; 

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [nameLocation, setNameLocation] = useState("");
  const [comment, setComment] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [location, setLocation] = useState(null);

  const userId = useSelector(selectUserId);
  const name = useSelector(selectName);

  const isSend =
    nameLocation.length !== 0 && comment.length !== 0 && photo !== null;
  const isRemove =
    nameLocation.length !== 0 || comment.length !== 0 || photo !== null;

  useEffect(() => {
    (async () => {
      try {
        const { status: cameraStatus } =
          await Camera.requestCameraPermissionsAsync();
        setHasPermission(cameraStatus === "granted");
        const { status: locationStatus } =
          await Location.requestForegroundPermissionsAsync();
        if (locationStatus !== "granted") {
          console.log("Permission to access location was denied");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const takePhoto = async () => {
    {
      const getUrl = await camera.takePictureAsync();
      const  {coords}  = await Location.getCurrentPositionAsync();

      const { address } = await getLocation(coords.latitude, coords.longitude);
      setLocation(coords);
      setNameLocation(verificationAddress(address));
      setPhoto(getUrl.uri);
    }
  };

  const sendData = () => {
    uploadPostToServer();
    navigation.navigate("Home");
  };

  const uploadPhotoToServer = async () => {

    try {
      const response = await fetch(photo);
      const file = await response.blob();

      const uniquePhotoId = Date.now().toString();

      const path = `images/${uniquePhotoId}.jpeg`;

      const storageRef = ref(storage, path);

      const metadata = {
        contentType: "image/jpeg",
      };

      await uploadBytes(storageRef, file, metadata);

      const downloadPhoto = await getDownloadURL(storageRef);
      return downloadPhoto;
    } catch (e) {
      console.error(e);
    }
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    const newPost = {
      photo,
      userId,
      name,
      comment,
      nameLocation,
      location,
      timePublished: +Date.now(),
    };

    try {
      await addDoc(collection(db, 'posts'), newPost);
    } catch (error) {
      console.error('Error while adding doc: ', error.message);
    }
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const removeFields = () => {
    setPhoto(null);
    setNameLocation("");
    setComment("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 0}>
          {!isShowKeyboard && (
            <View style={styles.cameraСontainer}>
              <Camera style={styles.camera} ref={setCamera}>
                {photo && (
                  <View style={styles.takePhotoContainer}>
                    <Image
                      source={{ uri: photo }}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </View>
                )}
                <TouchableOpacity onPress={takePhoto}>
                  <View
                    style={[
                      styles.cameraButtonConteiner,
                      photo
                        ? styles.cameraButtonConteinerTransparent
                        : styles.cameraButtonConteinerWhite,
                    ]}
                  >
                    <MaterialIcons
                      name="camera-alt"
                      size={24}
                      color={photo ? "#FFFFFF" : "#BDBDBD"}
                    />
                  </View>
                </TouchableOpacity>
              </Camera>
            </View>
          )}
          {!isShowKeyboard && (
            <Text style={styles.titleCamera}>
              {" "}
              {photo ? "Редактировать фото" : "Загрузите фото"}
            </Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Название..."
            placeholderTextColor="#BDBDBD"
            value={comment}
            onFocus={() => setIsShowKeyboard(true)}
            // onSubmitEditing={keyboardHide}
            onChangeText={(value) => setComment(value)}
          />
          <View style={styles.locationInputContainer}>
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={styles.locationIcon}
            />
            <TextInput
              style={[styles.input, styles.lastInput]}
              placeholder="Местность..."
              placeholderTextColor="#BDBDBD"
              value={nameLocation}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) => setNameLocation(value)}
            />
          </View>
          <TouchableOpacity
            onPress={sendData}
            style={[
              styles.buttonSend,
              isSend ? styles.buttonOrange : styles.buttonGrey,
            ]}
            disabled={!isSend}
          >
            <Text
              style={
                isSend ? styles.buttonSendTitle : styles.buttonNotSendTitle
              }
            >
              Опубликовать
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.buttonRemove,
                isRemove ? styles.buttonOrange : styles.buttonGrey,
              ]}
              onPress={removeFields}
              disabled={!isRemove}
            >
              <Feather
                name="trash-2"
                size={24}
                color={isRemove ? "#FFFFFF" : "#BDBDBD"}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  },
  cameraСontainer: {
    marginTop: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  titleCamera: {
    marginBottom: 32,
    color: "#BDBDBD",
  },
  cameraButtonConteiner: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButtonConteinerWhite: {
    backgroundColor: "#FFFFFF",
  },
  cameraButtonConteinerTransparent: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#ffffff",
    borderWidth: 1,
    height: "100%",
    width: "100%",
  },
  input: {
    marginBottom: 16,
    height: 50,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontWeight: "500",
  },
  lastInput: {
    marginBottom: 32,
    paddingLeft: 28,
    fontWeight: "400",
  },
  locationInputContainer: {
    position: "relative",
  },
  locationIcon: {
    position: "absolute",
    left: 0,
    top: 13,
  },
  buttonSend: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    height: 51,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
  },
  buttonOrange: {
    backgroundColor: "#FF6C00",
  },
  buttonGrey: {
    backgroundColor: "#F6F6F6",
  },
  buttonNotSendTitle: {
    // fontFamily: "Roboto",
    color: "#BDBDBD",
  },
  buttonSendTitle: {
    // fontFamily: "Roboto",
    color: "#FFFFFF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonRemove: {
    width: 70,
    paddingHorizontal: 23,
    paddingVertical: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    color: "#BDBDBD",
  },
});

export default CreatePostsScreen;
