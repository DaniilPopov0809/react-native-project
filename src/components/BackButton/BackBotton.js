import React from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

const BackButton = () => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.logoutButton}>
      <Feather name="arrow-left" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    logoutButton : {
        marginLeft: 16,
    }
})

export default BackButton;
