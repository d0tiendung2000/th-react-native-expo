import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";

export default function SelectLab() {
  const router = useRouter();
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <View style={styles.infoRow}>
        <MaterialIcons name="person" size={100} color={Colors.PRIMARY} />
        <View>
          <Text style={styles.text}>Đỗ Tiến Dũng</Text>
          <Text style={styles.text}>2124802010660</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/Labs/Lab1/lab1")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Lab1_1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/Labs/Lab1/lab1-2-calculator")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Lab1_2</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/Labs/Lab2/(tabs)/contacts")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Lab2</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/Labs/Lab3")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Lab3</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/Labs/Lab6")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Lab6</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 27,
    fontFamily: "outfit-bold",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
});
