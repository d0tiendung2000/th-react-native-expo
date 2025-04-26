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
import { useRouter } from "expo-router";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        console.log(data);
        setContacts(data.users); // <== Lấy users, không phải results
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
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()} // <== key là id
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/Labs/Lab2/details",
                params: {
                  avatar: item.image, // <== Đổi
                  name: `${item.firstName} ${item.lastName}`, // <== Đổi
                  phone: item.phone,
                  email: item.email,
                  address: `${item.address.address}, ${item.address.city}, ${item.address.state}`,
                  company: `${item.company.name}, ${item.company.title}`,
                  birthDate: item.birthDate,
                },
              })
            }
          >
            <View style={styles.contactItem}>
              <Image
                source={{ uri: item.image }} // <== Đổi
                style={styles.avatar}
              />
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>
                  {item.firstName} {item.lastName}
                </Text>
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
