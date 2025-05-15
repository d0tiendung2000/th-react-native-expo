import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Stack } from "expo-router";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../configs/firebase";

export default function DetailCustomer() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { id, fullName, email, phone, address, avatar } = params;
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const fetchCustomerStatus = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", id));
        if (userDoc.exists()) {
          setIsBlocked(userDoc.data().isBlocked || false);
        }
      } catch (error) {
        console.error("Error fetching customer status:", error);
      }
    };

    fetchCustomerStatus();
  }, [id]);

  const handleBlockToggle = async () => {
    try {
      const userRef = doc(db, "users", id);
      const newBlockStatus = !isBlocked;

      await updateDoc(userRef, {
        isBlocked: newBlockStatus,
      });

      setIsBlocked(newBlockStatus);

      Alert.alert(
        "Success",
        `Customer has been ${
          newBlockStatus ? "blocked" : "unblocked"
        } successfully`,
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Error updating block status:", error);
      Alert.alert("Error", "Failed to update customer status", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Customer Details",
          headerStyle: {
            backgroundColor: "#F06277",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarContainer}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarPlaceholderText}>
                {fullName?.charAt(0)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{fullName}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{phone}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{address}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Status</Text>
            <Text
              style={[
                styles.value,
                { color: isBlocked ? "#FF0000" : "#4CAF50" },
              ]}
            >
              {isBlocked ? "Blocked" : "Active"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.blockButton,
            { backgroundColor: isBlocked ? "#4CAF50" : "#FF0000" },
          ]}
          onPress={handleBlockToggle}
        >
          <Text style={styles.blockButtonText}>
            {isBlocked ? "Unblock Account" : "Block Account"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    backgroundColor: "#F06277",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholderText: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  blockButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  blockButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
