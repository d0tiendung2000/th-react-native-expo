import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors } from "../../../constants/Colors";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../../assets/images/Book.png")}
          style={styles.logo}
        />
      </View>
      <View
        style={{
          backgroundColor: Colors.GRAY,
          flex: 1,
          marginTop: 10,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text style={styles.text}>
          Nghịch lý thường nằm ở chỗ, chúng ta cứ thường phán xét cuộc sống của
          người khác dựa trên quan điểm cá nhân, rồi lại loay hoay tìm cách sống
          sao cho hợp với đánh giá theo quan điểm của người khác.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/Labs/Lab6/(tabs)/home")}
        >
          <Text style={styles.buttonText}>Go to Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  logo: {
    alignSelf: "center",
    width: "100%",
    height: 350,
    marginTop: 50,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    borderRadius: 15,
    margin: 20,
    alignItems: "center",
    marginTop: 100,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
  text: {
    fontSize: 25,
    fontStyle: "italic",
    margin: 20,
    textAlign: "center",
  },
});
