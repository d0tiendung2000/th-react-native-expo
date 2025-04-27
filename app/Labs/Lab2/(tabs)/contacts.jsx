import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { Colors } from "../../../../constants/Colors";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          "https://680d9f94c47cb8074d90c99d.mockapi.io/user"
        );
        const data = await response.json();
        // console.log(data);
        setContacts(data); // <== Lấy users, không phải results
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Contacts",
          headerStyle: {
            backgroundColor: Colors.WHITE,
          },
          headerTintColor: "black",
          headerTitleAlign: "center",
        }}
      />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()} // <== key là id
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/Labs/Lab2/details_contact",
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
            <View style={styles.contactItem}>
              <Image
                source={{ uri: item.avatar }} // <== Đổi
                style={styles.avatar}
              />
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
                <Text style={styles.contactEmail}>{item.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.WHITE,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactPhone: {
    fontSize: 14,
    color: "#555",
  },
  contactEmail: {
    fontSize: 14,
    color: "#555",
  },
});
