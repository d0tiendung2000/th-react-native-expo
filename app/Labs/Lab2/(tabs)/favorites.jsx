import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../../constants/Colors";
import { Stack, useRouter } from "expo-router";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          "https://680d9f94c47cb8074d90c99d.mockapi.io/user"
        );
        const data = await response.json();
        setFavorites(data.slice(0, 99));

        // console.log(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Favorites",
          headerStyle: {
            backgroundColor: Colors.WHITE,
          },
          headerTintColor: "black",
          headerTitleAlign: "center",
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.avatarContainer}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/Labs/Lab2/details_favorite",
                    params: {
                      avatar: item.avatar, // <== Đổi
                      name: item.name, // <== Đổi
                      phone: item.phone,
                      email: item.email,
                      address: item.address,
                      // address: `${item.address.address}, ${item.address.city}, ${item.address.state}`,
                      company: item.company,
                    },
                  })
                }
              >
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    alignItems: "center",
  },
  avatarContainer: {
    margin: 15,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#ccc",
  },
});
