import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import { AntDesign } from "@expo/vector-icons";

export default function Lab2() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={{ padding: 20, backgroundColor: "#fff", height: "100%" }}>
      <CustomButton
        text="Đăng nhập với Google"
        icon={
          <AntDesign
            name="google"
            size={20}
            color="white"
            style={{ marginTop: 4 }}
          />
        }
        onPress={() => alert("Pressed")}
        textStyle={{ fontSize: 20 }}
        buttonStyle={{ backgroundColor: "#4285F4" }}
      />
    </View>
  );
}
