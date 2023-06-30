import React from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { authLogOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const LogoutButton = () => {
  dispatch = useDispatch();
  const logOut = () => {
    dispatch(authLogOutUser());
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.logoutButton}
      onPress={logOut}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 10,
  },
});

export default LogoutButton;
