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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        const lastNumber = input.split(/[\+\-×÷]/).pop();
        if (lastNumber.includes(".")) return;
      }
      setInput((prev) => prev + value);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const renderButton = (value, isOperator = false, isDouble = false) => (
    <TouchableOpacity
      onPress={() => handlePress(value)}
      style={[
        styles.button,
        {
          backgroundColor: isOperator
            ? isDarkMode
              ? "#f39c12"
              : "#F7B731"
            : isDarkMode
            ? "#444"
            : Colors.PRIMARY,
        },
        isDouble && styles.buttonDouble,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          { color: isDarkMode ? "#fff" : Colors.WHITE },
        ]}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: isDarkMode ? "#1e1e1e" : Colors.WHITE,
        height: "100%",
      }}
    >
      <TouchableOpacity onPress={() => router.replace("/")}>
        <AntDesign
          name="back"
          size={24}
          color={isDarkMode ? "white" : "black"}
        />
      </TouchableOpacity>

      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "#1e1e1e" : Colors.WHITE },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <SafeAreaView>
            <LottieView
              source={require("../../../assets/json/Calculator.json")}
              autoPlay
              style={{
                width: 200,
                height: 200,
                marginLeft: 80,
              }}
            />
          </SafeAreaView>
          <TouchableOpacity onPress={toggleDarkMode} style={{ marginTop: 50 }}>
            <MaterialIcons
              name={isDarkMode ? "light-mode" : "dark-mode"}
              size={100}
              color={isDarkMode ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.screen,
            {
              backgroundColor: isDarkMode ? "#333" : Colors.GRAY,
              borderColor: isDarkMode ? "white" : "black",
            },
          ]}
        >
          <Text
            style={[
              styles.input,
              { color: isDarkMode ? "#eee" : Colors.PRIMARY },
            ]}
          >
            {input}
          </Text>
          <Text
            style={[
              styles.result,
              { color: isDarkMode ? "#fff" : Colors.WHITE },
            ]}
          >
            {result || "0"}
          </Text>
        </View>

        <View
          style={{
            borderWidth: 2,
            backgroundColor: isDarkMode ? "#2a2a2a" : Colors.GRAY,
            borderRadius: 15,
            borderColor: isDarkMode ? "white" : "black",
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
    justifyContent: "flex-end",
    height: "100%",
    paddingBottom: 20,
  },
  screen: {
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
  },
  input: {
    fontSize: 32,
    textAlign: "right",
    fontFamily: "outfit-bold",
  },
  result: {
    fontSize: 40,
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
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonDouble: {
    width: 160,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "outfit-bold",
  },
});
