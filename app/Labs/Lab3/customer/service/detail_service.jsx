import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "./../../../../../constants/Colors";
import { useNavigation, useLocalSearchParams, useRouter } from "expo-router";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./../../../../../configs/firebase";

export default function DetailService() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, name, price, createdAt, updatedAt } = params;
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Service Detail",
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

      <View style={styles.detailContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Service Name:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>{price}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{createdAt}</Text>
        </View>

        {updatedAt && (
          <View style={styles.detailItem}>
            <Text style={styles.label}>Final Updated:</Text>
            <Text style={styles.value}>{updatedAt}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  detailContainer: {
    backgroundColor: Colors.GRAY,
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  detailItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
    marginBottom: 5,
  },
  value: {
    fontSize: 20,
    fontFamily: "outfit-medium",
    color: Colors.PRIMARY,
  },
  headerRight: {
    position: "relative",
    marginRight: 10,
  },
  menu: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    minWidth: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
    fontFamily: "outfit-medium",
    color: Colors.PRIMARY,
  },
});
