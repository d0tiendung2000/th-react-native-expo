import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  SectionList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Continue() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const router = useRouter();

  const Square = ({ text, bgColor = "#7ce0f9" }) => (
    <View style={[styles.box, { backgroundColor: bgColor }]}>
      <Text>{text}</Text>
    </View>
  );

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const sectionListData = [
    {
      title: "A",
      data: ["Apple", "Avocado", "Apricot", "Artichoke"],
    },
    {
      title: "B",
      data: ["Banana", "Blueberry", "Blackberry", "Blackcurrant"],
    },
    {
      title: "C",
      data: ["Cherry", "Coconut", "Cranberry", "Cucumber"],
    },
  ];

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
      {/*Project 6. Scrollable Content*/}
      <View style={{ height: "40%" }}>
        <Text style={styles.text}>Project 6. Scrollable Content</Text>
        <ScrollView>
          {data.map((item, index) => (
            <Square key={item} text={`Square ${index + 1}`} />
          ))}
        </ScrollView>
      </View>

      {/*Project 7. Building a Form*/}
      <Text style={styles.text}>Project 7. Building a Form</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          alert(`Hello, ${name}!`);
          setName("");
        }}
      >
        <Text style={styles.buttonText}>Say Hello</Text>
      </TouchableOpacity>

      {/*Project 8. Long Lists*/}
      <Text style={styles.text}>Project 8. Long Lists</Text>
      <SectionList
        sections={sectionListData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={[styles.name, { fontWeight: "bold" }]}>{title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  textInput: {
    borderWidth: 2,
    borderColor: Colors.GRAY,
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
  },
  name: {
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
  },
  separator: {
    marginVertical: 5,
    height: 1,
  },
  sectionHeader: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "rgb(170, 170, 170))",
    marginBottom: 10,
  },
});
