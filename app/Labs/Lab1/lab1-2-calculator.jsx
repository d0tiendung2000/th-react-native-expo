import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const router = useRouter();

  const handlePress = (value) => {
    if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "DEL") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      try {
        const evalResult = eval(input.replace(/×/g, "*").replace(/÷/g, "/"));
        setResult(evalResult.toString());
      } catch {
        setResult("Error");
      }
    } else {
      if (value === ".") {
        // Lấy phần số hiện tại bằng cách tách chuỗi theo toán tử
        const lastNumber = input.split(/[\+\-×÷]/).pop();
        // Nếu đã có dấu chấm trong phần số hiện tại → bỏ qua
        if (lastNumber.includes(".")) return;
      }
      setInput((prev) => prev + value);
    }
  };

  const renderButton = (value, isOperator = false, isDouble = false) => (
    <TouchableOpacity
      onPress={() => handlePress(value)}
      style={[
        styles.button,
        isOperator && { backgroundColor: "#F7B731" },
        isDouble && styles.buttonDouble,
      ]}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <TouchableOpacity onPress={() => router.replace("/")}>
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>

      <SafeAreaView style={styles.container}>
        <LottieView
          source={require("../../../assets/json/Calculator.json")}
          autoPlay
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
          }}
        />

        <View style={styles.screen}>
          <Text style={styles.input}>{input}</Text>
          <Text style={styles.result}>{result || "0"}</Text>
        </View>

        <View
          style={{
            borderWidth: 2,
            backgroundColor: Colors.GRAY,
            borderRadius: 15,
          }}
        >
          <View style={styles.row}>
            {renderButton("DEL", true, true)}
            {renderButton("C", true)}
            {renderButton("÷", true)}
          </View>
          <View style={styles.row}>
            {renderButton("7")}
            {renderButton("8")}
            {renderButton("9")}
            {renderButton("×", true)}
          </View>
          <View style={styles.row}>
            {renderButton("4")}
            {renderButton("5")}
            {renderButton("6")}
            {renderButton("-", true)}
          </View>
          <View style={styles.row}>
            {renderButton("1")}
            {renderButton("2")}
            {renderButton("3")}
            {renderButton("+", true)}
          </View>
          <View style={styles.row}>
            {renderButton("0")}
            {renderButton(".")}
            {renderButton("=", true, true)}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    justifyContent: "flex-end",
    height: "100%",
    paddingBottom: 20,
  },
  screen: {
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: Colors.GRAY,
    padding: 20,
    borderWidth: 2,
  },
  input: {
    fontSize: 32,
    color: Colors.PRIMARY,
    textAlign: "right",
    fontFamily: "outfit-bold",
  },
  result: {
    fontSize: 40,
    color: Colors.WHITE,
    textAlign: "right",
    fontFamily: "outfit-bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonDouble: {
    width: 160,
  },
  buttonText: {
    fontSize: 24,
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },
});
