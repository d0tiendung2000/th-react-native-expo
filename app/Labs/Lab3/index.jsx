import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import LottieView from "lottie-react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { auth } from "../../../configs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const OnClickLogin = () => {
    let valid = true;

    if (email.trim() === "") {
      setEmailError("Please enter Email");
      valid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      setEmailError("Email format example@gmail.com");
      valid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Please enter Password");
      valid = false;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace("/Labs/Lab3/(tabs)/home");
        console.log(user);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        if (errorCode == "auth/invalid-credential") {
          ToastAndroid.show("Invalid Email or Password", ToastAndroid.LONG);
        }
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F06277" barStyle="light-content" />
      <Text style={styles.text}>Login</Text>

      {/*Nhap Email*/}

      <View style={styles.input}>
        <MaterialIcons
          name="email"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (text.trim() !== "") setEmailError("");
          }}
          style={styles.textInput}
          placeholder="Enter Email"
        />
      </View>
      {emailError !== "" && <Text style={styles.textError}>{emailError}</Text>}

      {/* Nhập Password */}
      <View style={styles.input}>
        <FontAwesome6
          name="key"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (text.trim() !== "") setPasswordError("");
          }}
          secureTextEntry={!showPassword}
          style={
            [styles.textInput, { paddingRight: 35 }] // chừa chỗ cho con mắt
          }
          placeholder="Enter Password"
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
      {passwordError !== "" && (
        <Text style={styles.textError}>{passwordError}</Text>
      )}

      {/*Button Login*/}
      <TouchableOpacity
        onPress={OnClickLogin}
        style={[styles.button, { backgroundColor: "#F06277", marginTop: 20 }]}
      >
        <Text style={[styles.buttonText, { color: Colors.WHITE }]}>Login</Text>
      </TouchableOpacity>

      {/*Button Create Account*/}
      <TouchableOpacity
        onPress={() => router.push("/Labs/Lab3/register")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Create a new account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 150,
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
    fontSize: 50,
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
