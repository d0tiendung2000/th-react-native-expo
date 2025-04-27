import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "../../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function DetailsContact() {
  const { avatar, name, phone, email, address, company } =
    useLocalSearchParams();
  const [starred, setStarred] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: name,
          headerStyle: {
            backgroundColor: Colors.GRAY,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={() => setStarred(!starred)}>
              <AntDesign
                name="star"
                size={30}
                color={starred ? "black" : "white"}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={{ backgroundColor: Colors.GRAY, height: 350 }}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <Text style={styles.name}>{name}</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <FontAwesome
              name="phone"
              size={20}
              color="white"
              style={{ marginTop: 3, marginRight: 5 }}
            />
            <Text style={styles.phone}>{phone}</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: Colors.WHITE,
            marginTop: -60,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View
            style={[styles.inside, { flexDirection: "row", marginTop: 30 }]}
          >
            <Entypo
              name="email"
              size={30}
              color="black"
              style={{ marginTop: 10, marginRight: 20 }}
            />
            <View>
              <Text style={styles.text}>Email</Text>
              <Text style={styles.text1}>{email}</Text>
            </View>
          </View>

          <View style={[styles.inside, { flexDirection: "row" }]}>
            <Entypo
              name="old-phone"
              size={30}
              color="black"
              style={{ marginTop: 10, marginRight: 20 }}
            />
            <View>
              <Text style={styles.text}>Work</Text>
              <Text style={styles.text1}>{phone}</Text>
            </View>
          </View>

          <View style={[styles.inside, { flexDirection: "row" }]}>
            <Entypo
              name="home"
              size={30}
              color="black"
              style={{ marginTop: 10, marginRight: 20 }}
            />
            <View>
              <Text style={styles.text}>Address</Text>
              <Text style={styles.text1}>{address}</Text>
            </View>
          </View>

          <View style={[styles.inside, { flexDirection: "row" }]}>
            <Entypo
              name="location"
              size={30}
              color="black"
              style={{ marginTop: 10, marginRight: 20 }}
            />
            <View>
              <Text style={styles.text}>Company</Text>
              <Text style={styles.text1}>{company}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    width: "100%",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  name: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    marginBottom: 10,
    color: Colors.WHITE,
    textAlign: "center",
  },
  phone: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
  },
  inside: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 15,
    borderWidth: 2,
    borderRadius: 15,
  },
  text1: {
    fontSize: 15,
    color: Colors.GRAY,
  },
  text: {
    fontSize: 15,
    fontFamily: "outfit-bold",
  },
});
