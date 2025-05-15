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
import { useNavigation, useLocalSearchParams, useRouter } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./../../../../../configs/firebase";

export default function UpdateService() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, name: initialName, price: initialPrice } = params;

  const [serviceName, setServiceName] = useState(initialName);
  const [priceRaw, setPriceRaw] = useState("");
  const [priceDisplay, setPriceDisplay] = useState(initialPrice);

  const formatCurrency = (value) => {
    if (!value) return "";
    const number = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("vi-VN").format(number) + " VNĐ";
  };

  const handleUpdateService = async () => {
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

      await updateDoc(doc(db, "services", id), {
        name: serviceName,
        price: priceDisplay,
        updatedAt: timestamp,
      });

      ToastAndroid.show("Service updated successfully", ToastAndroid.SHORT);
      router.back();
    } catch (error) {
      console.error("Error updating service:", error);
      ToastAndroid.show("Error updating service", ToastAndroid.BOTTOM);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Update Service",
      headerStyle: {
        backgroundColor: "#F06277",
      },
      headerTitleStyle: {
        color: Colors.WHITE,
      },
      headerTintColor: Colors.WHITE,
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F06277" barStyle="light-content" />

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

      <View>
        <Text style={styles.text}>Price</Text>
        <View style={styles.input}>
          <TextInput
            keyboardType="numeric"
            placeholder="0 VNĐ"
            value={priceDisplay}
            onChangeText={(text) => {
              const numeric = text.replace(/\D/g, "");

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

      <TouchableOpacity onPress={handleUpdateService} style={styles.button}>
        <Text style={styles.buttonText}>Update Service</Text>
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
