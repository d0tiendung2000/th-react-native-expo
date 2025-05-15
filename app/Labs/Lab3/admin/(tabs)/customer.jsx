import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../../configs/firebase";
import { useRouter } from "expo-router";

export default function Customer() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("role", "==", "customer"));
        const querySnapshot = await getDocs(q);

        const customersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCustomers(customersList);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const renderCustomerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.customerCard}
      onPress={() =>
        router.push({
          pathname: "/Labs/Lab3/admin/detail_customer",
          params: {
            id: item.id,
            fullName: item.fullName,
            email: item.email,
            phone: item.phone || "Not set",
            address: item.address || "Not set",
            avatar: item.avatar,
          },
        })
      }
    >
      <View style={styles.avatarContainer}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarPlaceholderText}>
              {item.fullName?.charAt(0)}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.fullName}</Text>
        <Text style={styles.customerEmail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F06277" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer List</Text>
      <FlatList
        data={customers}
        renderItem={renderCustomerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  customerCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    backgroundColor: "#F06277",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPlaceholderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  customerEmail: {
    fontSize: 14,
    color: "#666",
  },
});
