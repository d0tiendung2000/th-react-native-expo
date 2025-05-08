import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth } from "../../../configs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../configs/firebase";

export default function CreateAccount() {
  const navigation = useNavigation();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const OnCreateAccount = () => {
    if (!fullName && !email && !password) {
      ToastAndroid.show("Please enter all fields", ToastAndroid.BOTTOM);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // Lưu thông tin người dùng vào Firestore
        await setDoc(doc(db, "users", user.uid), {
          fullName: fullName,
          email: email,
        });
        router.replace("/Labs/Lab3/(tabs)/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="caret-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={[styles.text, { marginTop: 70 }]}>
        Create a new account!
      </Text>

      {/*Nhap FullName */}
      <View style={styles.input}>
        <MaterialIcons
          name="person"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="FullName"
          onChangeText={(value) => setFullName(value)}
        />
      </View>

      {/*Nhap Email */}
      <View style={styles.input}>
        <MaterialIcons
          name="email"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter Email"
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      {/*Nhap Password */}
      <View style={styles.input}>
        <FontAwesome6
          name="key"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <TextInput
          secureTextEntry={!showPassword}
          style={styles.textInput}
          placeholder="Enter Password"
          onChangeText={(value) => setPassword(value)}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: 15,
          }}
        >
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/*Button SignUp*/}
      <TouchableOpacity
        onPress={OnCreateAccount}
        style={[styles.button, { backgroundColor: "#F06277", marginTop: 20 }]}
      >
        <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
          Sign Up
        </Text>
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
  button: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    color: Colors.PRIMARY,
  },
  text: {
    fontSize: 30,
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: "#F06277",
    marginTop: 20,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    marginTop: 20,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: "outfit-bold",
  },
  textError: {
    color: Colors.GRAY,
    fontSize: 14,
    fontFamily: "outfit-bold",
    marginTop: 5,
    marginLeft: 10,
  },
});
