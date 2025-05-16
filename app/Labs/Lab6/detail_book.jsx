import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DetailBook() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const book = JSON.parse(params.book);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Details</Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Book Cover */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: book.image }} style={styles.coverImage} />
        </View>

        {/* Book Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>by {book.author}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color="#F06277" />
              <Text style={styles.statText}>{book.lastRead}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="book-outline" size={20} color="#F06277" />
              <Text style={styles.statText}>{book.completion}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="star" size={20} color="#F06277" />
              <Text style={styles.statText}>{book.rating}/5</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{book.description}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.readButton}>
              <Ionicons name="book" size={20} color="white" />
              <Text style={styles.readButtonText}>Start Reading</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadButton}>
              <Ionicons name="download-outline" size={20} color="white" />
              <Text style={styles.downloadButtonText}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  coverContainer: {
    alignItems: "center",
    padding: 20,
  },
  coverImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  author: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statText: {
    color: "white",
    marginTop: 5,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "#ccc",
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  readButton: {
    flex: 1,
    backgroundColor: "#F06277",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  readButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  downloadButton: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  downloadButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
