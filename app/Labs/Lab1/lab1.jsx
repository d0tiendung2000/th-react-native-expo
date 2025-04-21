import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Lab1() {
  const navigation = useNavigation();
  const router = useRouter();
  const [count, setCount] = useState(0);

  const Square = ({ text, bgColor = "#7ce0f9" }) => (
    <View style={[styles.box, { backgroundColor: bgColor }]}>
      <Text>{text}</Text>
    </View>
  );

  const CustomButton = (props) => (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 15,
        marginVertical: 10,
        ...props.buttonStyle,
      }}
    >
      <Text
        style={{
          color: Colors.WHITE,
          fontSize: 16,
          textAlign: "center",
          fontFamily: "outfit-bold",
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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
      {/*Project 2. Capturing Taps*/}
      <Text style={[styles.text, { marginBottom: 20 }]}>
        Project 2. Capturing Taps
      </Text>
      <Button title="Button 1" onPress={() => alert("Hello")} />
      <TouchableOpacity style={styles.button} onPress={() => alert("Hello")}>
        <Text style={styles.buttonText}>Button 2</Text>
      </TouchableOpacity>

      {/*Project 3. Custom Components*/}
      <Text style={styles.text}>Project 3. Custom Components</Text>
      <CustomButton text="Say Hello" onPress={() => alert("Hello")} />
      <CustomButton
        text="Say Goodbye"
        onPress={() => alert("Goodbye!")}
        buttonStyle={{ backgroundColor: "#f39c12" }}
      />

      {/*Project 4. State & Props*/}
      <Text style={styles.text}>Project 4. State & Props</Text>
      <CustomButton
        text={`Đã bấm ${count} lần`}
        onPress={() => setCount(count + 1)}
      />

      {/*Project 5. Styling*/}
      <Text style={styles.text}>Project 5. Styling</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Square text="Square 1" />
        <Square text="Square 2" bgColor="#f39c12" />
        <Square text="Square 3" bgColor="#2ecc71" />
      </View>
      <CustomButton
        text="Continue"
        onPress={() => router.push("/Labs/Lab1/continue")}
        buttonStyle={{
          marginTop: 20,
          width: 150,
          alignSelf: "center",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
  text: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    marginTop: 20,
  },
  box: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 20,
  },
});
