import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRouter } from "expo-router";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../configs/firebase";
import { auth } from "../../../../configs/firebase";
import { signOut } from "firebase/auth";

export default function home() {
  const navigation = useNavigation();
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [userFullName, setUserFullName] = useState("");

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
      headerTitle: userFullName || "Admin",
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
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F06277" barStyle="light-content" />
      <View>
        <Image
          source={require("../../../../assets/images/logolab3.png")}
          style={styles.logo}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text style={styles.text}>Danh sách dịch vụ</Text>
        <TouchableOpacity
          onPress={() => router.push("/Labs/Lab3/service/add_service")}
        >
          <Ionicons
            name="add-circle"
            size={35}
            color="black"
            style={{
              marginTop: 8,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.frameButton}
            onPress={() =>
              router.push({
                pathname: "/Labs/Lab3/service/detail_service",
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
            <View style={styles.row}>
              <Text
                style={styles.textFrameButton}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {service.name}
              </Text>
              <Text style={styles.priceText}>{service.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },

  logo: {
    alignSelf: "center",
    marginTop: 20,
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
});
