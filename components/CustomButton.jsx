import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

export default function CustomButton({
  text,
  onPress,
  buttonStyle,
  textStyle,
  icon,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 8,
    width: 50,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
});
