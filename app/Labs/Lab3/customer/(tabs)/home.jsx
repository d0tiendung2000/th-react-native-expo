import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRouter } from "expo-router";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../configs/firebase";
import { auth } from "../../../../../configs/firebase";
import { signOut } from "firebase/auth";

export default function home() {
  const navigation = useNavigation();
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [userFullName, setUserFullName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Lấy thông tin người dùng từ Firestore
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserFullName(userDoc.data().fullName);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      //Hiện thanh header phía trên và nút quay lại
      headerShown: true,
      headerTitle: userFullName,
      //đổi màu thanh header
      headerStyle: {
        backgroundColor: "#F06277",
      },
      //đổi màu text thanh header
      headerTitleStyle: {
        color: Colors.WHITE,
        fontSize: 25,
        fontFamily: "outfit-bold",
      },
      //thêm icon vào thanh header
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons
            name="person-circle"
            size={40}
            color="white"
            style={{
              marginRight: 20,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [userFullName]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/Labs/Lab3");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(data);
      setFilteredServices(data);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  // Hàm tìm kiếm dịch vụ
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) =>
        service.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F06277" barStyle="light-content" />
      <View style={{ alignItems: "center" }}>
        <Image source={require("../../../../../assets/images/logolab3.png")} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={24}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery !== "" && (
          <TouchableOpacity onPress={() => handleSearch("")}>
            <Ionicons name="close-circle" size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.serviceListContainer}>
        <Text style={styles.serviceListTitle}>Danh sách dịch vụ</Text>
        <ScrollView>
          <View style={{ marginTop: 20 }}>
            {filteredServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceItem}
                onPress={() =>
                  router.push({
                    pathname: "/Labs/Lab3/customer/service/detail_service",
                    params: {
                      id: service.id,
                      name: service.name,
                      price: service.price,
                      createdAt: service.createdAt,
                      updatedAt: service.updatedAt,
                    },
                  })
                }
              >
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName} numberOfLines={1}>
                    {service.name}
                  </Text>
                  <Text style={styles.servicePrice}>{service.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
  },

  text: {
    fontSize: 30,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
  },
  frameButton: {
    backgroundColor: Colors.GRAY,
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textFrameButton: {
    fontFamily: "outfit-bold",
    fontSize: 16,
    color: Colors.PRIMARY,
    flex: 1,
    marginRight: 10,
  },

  priceText: {
    fontSize: 16,
    fontFamily: "outfit",
    color: Colors.PRIMARY,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: "outfit-medium",
    fontSize: 16,
  },
  serviceListContainer: {
    flex: 1,
    marginTop: 20,
  },
  serviceListTitle: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
  },
  serviceItem: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  serviceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceName: {
    fontSize: 18,
    fontFamily: "outfit-medium",
    flex: 1,
    marginRight: 10,
  },
  servicePrice: {
    fontSize: 16,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
  },
});
