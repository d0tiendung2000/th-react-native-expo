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

      <CustomButton
        onPress={() => router.push("/Labs/Lab1/lab1")}
        text="Lab 1_1"
      />

      <CustomButton
        onPress={() => router.push("/Labs/Lab1/lab1-2-calculator")}
        text="Lab 1_2"
      />

      <CustomButton
        onPress={() => router.push("/Labs/Lab2/(tabs)/contacts")}
        text="Lab 2"
      />

      <CustomButton onPress={() => router.push("/Labs/Lab3")} text="Lab 3" />

      <CustomButton
        onPress={() => router.push("/Labs/Lab4/lab4")}
        text="Lab 4"
      />

      <CustomButton onPress={() => router.push("/test/student")} text="Lab 5" />
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
});
