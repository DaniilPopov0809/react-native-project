import React from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

const LogoutButton = () => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.logoutButton}>
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    logoutButton : {
        marginRight: 10,
    }
})

export default LogoutButton;
