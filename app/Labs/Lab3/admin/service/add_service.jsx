import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "./../../../../../constants/Colors";
import { useNavigation } from "expo-router";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./../../../../../configs/firebase";

export default function AddService() {
  const navigation = useNavigation();
  const [priceRaw, setPriceRaw] = useState("");
  const [priceDisplay, setPriceDisplay] = useState("");

  const formatCurrency = (value) => {
    if (!value) return "";
    const number = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("vi-VN").format(number) + " VNĐ";
  };

  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");

  const handleAddService = async () => {
    if (!serviceName || !priceDisplay) {
      ToastAndroid.show("Please enter all fields", ToastAndroid.BOTTOM);
      return;
    }

    try {
      const timestamp = new Date().toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      console.log("Service name:", serviceName);
      console.log("Price:", priceDisplay);
      console.log("Thời gian tạo:", timestamp);

      const docRef = await addDoc(collection(db, "services"), {
        name: serviceName,
        price: priceDisplay, // lưu dạng "250.000 VNĐ"
        createdAt: timestamp,
      });

      ToastAndroid.show("Service added successfully", ToastAndroid.SHORT);
      setServiceName("");
      setPriceRaw("");
      setPriceDisplay("");
    } catch (error) {
      console.error("Error adding service:", error);
      ToastAndroid.show("Error adding service", ToastAndroid.BOTTOM);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      //Hiện thanh header phía trên và nút quay lại
      headerShown: true,
      headerTitle: "Service",
      //đổi màu thanh header
      headerStyle: {
        backgroundColor: "#F06277",
      },
      //đổi màu text thanh header
      headerTitleStyle: {
        color: Colors.WHITE,
      },
      //đổi màu icon thanh header
      headerTintColor: Colors.WHITE,
    });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F06277" barStyle="light-content" />
      {/* Service name */}
      <View>
        <Text style={styles.text}>Service name</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Input a service name"
            style={styles.inputText}
            value={serviceName}
            onChangeText={(text) => setServiceName(text)}
          />
        </View>
      </View>

      {/* Price */}
      <View>
        <Text style={styles.text}>Price</Text>
        <View style={styles.input}>
          <TextInput
            keyboardType="numeric"
            placeholder="0 VNĐ"
            value={priceDisplay}
            onChangeText={(text) => {
              const numeric = text.replace(/\D/g, "");

              // Nếu text rỗng (người dùng đang xóa), thì clear input
              if (text === "") {
                setPriceRaw("");
                setPriceDisplay("");
                return;
              }

              setPriceRaw(numeric);
              const formatted = formatCurrency(numeric);
              setPriceDisplay(formatted);
            }}
            style={styles.inputText}
          />
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity onPress={handleAddService} style={styles.button}>
        <Text style={styles.buttonText}>Add Service</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },

  text: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
    marginTop: 20,
  },
  input: {
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.GRAY,
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  inputText: {
    fontSize: 16,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
  },
  button: {
    backgroundColor: "#F06277",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
    textAlign: "center",
  },
});
