import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../../../constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const books = [
  {
    title: "Other Words For Home",
    author: "Jasmine Warga",
    image: "https://i.imgur.com/0y8Ftya.jpg",
    time: "3d 5h",
    percent: "75%",
  },
  {
    title: "Metropolist",
    author: "Seth Fried",
    image: "https://i.imgur.com/8Km9tLL.jpg",
    time: "10d 5h",
    percent: "23%",
  },
];

const tabs = ["Best Seller", "The Latest", "Coming Soon"];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.username}>Username</Text>
        </View>
        <TouchableOpacity style={styles.pointBtn}>
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.pointText}>200 point</Text>
        </TouchableOpacity>
      </View>

      {/* 3 Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionBtn}>
          <MaterialIcons name="card-giftcard" size={20} color={Colors.ORANGE} />
          <Text style={styles.actionText}>Claim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <MaterialIcons name="my-location" size={20} color={Colors.ORANGE} />
          <Text style={styles.actionText}>Get Point</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="card" size={20} color={Colors.ORANGE} />
          <Text style={styles.actionText}>My Card</Text>
        </TouchableOpacity>
      </View>

      {/* Book List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 16 }}
      >
        {books.map((book, idx) => (
          <View key={idx} style={styles.bookCard}>
            <Image source={{ uri: book.image }} style={styles.bookImg} />
            <View style={styles.bookInfoRow}>
              <Ionicons name="time" size={14} color="#aaa" />
              <Text style={styles.bookInfoText}>{book.time}</Text>
              <Ionicons
                name="lock-closed"
                size={14}
                color="#aaa"
                style={{ marginLeft: 8 }}
              />
              <Text style={styles.bookInfoText}>{book.percent}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {tabs.map((tab, idx) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(idx)}>
            <Text
              style={[
                styles.tabText,
                activeTab === idx && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Book List dưới tab (ví dụ Best Seller) */}
      <View style={styles.listRow}>
        <Image source={{ uri: books[0].image }} style={styles.listImg} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.listTitle}>{books[0].title}</Text>
          <Text style={styles.listAuthor}>{books[0].author}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191A22",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  username: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  pointBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.ORANGE || "#FF6B00",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pointText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#23243A",
    borderRadius: 16,
    padding: 16,
  },
  actionBtn: {
    alignItems: "center",
    flex: 1,
  },
  actionText: {
    color: "#fff",
    marginTop: 4,
    fontSize: 13,
  },
  bookCard: {
    width: 120,
    marginRight: 16,
  },
  bookImg: {
    width: 120,
    height: 160,
    borderRadius: 12,
  },
  bookInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  bookInfoText: {
    color: "#aaa",
    fontSize: 12,
    marginLeft: 2,
  },
  tabRow: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  tabText: {
    color: "#aaa",
    fontSize: 16,
    marginRight: 24,
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: Colors.ORANGE || "#FF6B00",
    paddingBottom: 2,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#23243A",
    borderRadius: 12,
    padding: 10,
  },
  listImg: {
    width: 50,
    height: 70,
    borderRadius: 8,
  },
  listTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  listAuthor: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 2,
  },
});
