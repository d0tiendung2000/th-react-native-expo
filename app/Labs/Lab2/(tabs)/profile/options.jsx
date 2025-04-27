import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../../../../constants/Colors";

export default function Options() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Options",
          headerStyle: {
            backgroundColor: Colors.WHITE,
          },
          headerTintColor: "black",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.optionList}>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>Change Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    paddingTop: 2,
    height: "100%",
  },
  optionList: {
    marginTop: 20,
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
});
