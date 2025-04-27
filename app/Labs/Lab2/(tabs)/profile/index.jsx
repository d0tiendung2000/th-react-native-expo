import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../../../constants/Colors";
import { Stack, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://680d9f94c47cb8074d90c99d.mockapi.io/user"
        );
        const data = await response.json();
        setProfile(data[25]); // lấy 1 user
        // console.log(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Me",
          headerStyle: {
            backgroundColor: Colors.WHITE,
          },
          headerTintColor: "black",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.push("/Labs/Lab2/(tabs)/profile/options");
              }}
            >
              <MaterialIcons
                name="settings"
                size={30}
                color="black"
                style={{
                  marginRight: 20,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      {profile && ( // không dùng FlatList vì chỉ có 1 user
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{profile.name}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <FontAwesome
              name="phone"
              size={20}
              color="black"
              style={{ marginTop: 3, marginRight: 5 }}
            />
            <Text style={styles.phone}>{profile.phone}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 200,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
  },
  name: {
    fontSize: 30,
    fontFamily: "outfit-bold",
    marginBottom: 10,
    color: Colors.PRIMARY,
    textAlign: "center",
    marginTop: 10,
  },
  phone: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
    textAlign: "center",
  },
});
