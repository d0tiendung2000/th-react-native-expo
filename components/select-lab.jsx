import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
export default function SelectLab() {
  const router = useRouter();
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
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
        <Text style={styles.buttonText}>Lab 1_1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/Labs/Lab1/calculator")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Lab 1_2</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/Labs/Lab2/lab2")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Lab 2</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/Labs/Lab3/lab3")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Lab 3</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/Labs/Lab4/lab4")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Lab 4</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/Labs/Lab5/lab5")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Lab 5</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 20,
    fontFamily: "outfit-bold",
    textAlign: "center",
  },

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
});
