import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors } from "../../../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="menu" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
