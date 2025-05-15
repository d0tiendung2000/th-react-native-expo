import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../../../../../configs/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../configs/firebase";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              name: data.fullName || "",
              email: user.email,
              phone: data.phone || "",
              address: data.address || "",
            });
            setEditedData({
              name: data.fullName || "",
              phone: data.phone || "",
              address: data.address || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchRandomAvatar = async () => {
      try {
        const response = await fetch(
          "https://680d9f94c47cb8074d90c99d.mockapi.io/user"
        );
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        setAvatar(data[randomIndex].avatar);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchUserData();
    fetchRandomAvatar();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, "users", user.uid), {
          fullName: editedData.name,
          phone: editedData.phone,
          address: editedData.address,
        });

        setUserData({
          ...userData,
          name: editedData.name,
          phone: editedData.phone,
          address: editedData.address,
        });

        setIsEditing(false);
        Alert.alert("Success", "Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        {userData ? (
          <>
            <View style={styles.avatarContainer}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Text style={styles.avatarPlaceholderText}>
                    {userData.name?.charAt(0)}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Name:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedData.name}
                  onChangeText={(text) =>
                    setEditedData({ ...editedData, name: text })
                  }
                  placeholder="Enter your name"
                />
              ) : (
                <Text style={styles.value}>{userData.name}</Text>
              )}
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{userData.email}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Phone:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedData.phone}
                  onChangeText={(text) =>
                    setEditedData({ ...editedData, phone: text })
                  }
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.value}>{userData.phone || "Not set"}</Text>
              )}
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Address:</Text>
              {isEditing ? (
                <TextInput
                  style={[styles.input, styles.addressInput]}
                  value={editedData.address}
                  onChangeText={(text) =>
                    setEditedData({ ...editedData, address: text })
                  }
                  placeholder="Enter your address"
                  multiline
                />
              ) : (
                <Text style={styles.value}>
                  {userData.address || "Not set"}
                </Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  if (isEditing) {
                    handleUpdateProfile();
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                <MaterialIcons
                  name={isEditing ? "check-circle" : "edit"}
                  size={24}
                  color="white"
                />
                <Text style={styles.editButtonText}>
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.editButton, { backgroundColor: "#2196F3" }]}
                onPress={() =>
                  router.push("/Labs/Lab3/customer/profile/change_password")
                }
              >
                <MaterialIcons name="lock" size={24} color="white" />
                <Text style={styles.editButtonText}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={styles.loading}>Loading profile...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: "#F06277",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPlaceholderText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  infoContainer: {
    marginBottom: 15,
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  addressInput: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F06277",
    padding: 12,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  editButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  loading: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
