import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "../../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function DetailsFavorite() {
  const { avatar, name, phone } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: name,
          headerStyle: {
            backgroundColor: Colors.GRAY,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <View>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <FontAwesome
            name="phone"
            size={20}
            color="white"
            style={{ marginTop: 3, marginRight: 5 }}
          />
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GRAY,
    height: "100%",
    paddingTop: 200,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  name: {
    fontSize: 30,
    fontFamily: "outfit-bold",
    marginBottom: 10,
    color: Colors.WHITE,
    textAlign: "center",
  },
  phone: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
    textAlign: "center",
  },
});
