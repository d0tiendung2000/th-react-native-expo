import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchBooks = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&langRestrict=en&maxResults=20`
      );
      const data = await response.json();

      const formattedBooks =
        data.items?.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors?.[0] || "Unknown",
          image:
            item.volumeInfo.imageLinks?.thumbnail ||
            "https://via.placeholder.com/120x160.png?text=No+Image",
          pageCount: item.volumeInfo.pageCount || "N/A",
          rating: item.volumeInfo.averageRating || 4,
          description: item.volumeInfo.description || "No description",
          completion: `${Math.floor(Math.random() * 80) + 10}%`,
          lastRead: `${Math.floor(Math.random() * 7) + 1}d ${Math.floor(
            Math.random() * 24
          )}h`,
        })) || [];

      setSearchResults(formattedBooks);
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    searchBooks(text);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />

      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search books..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setSearchResults([]);
              }}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Results */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F06277" />
          <Text style={styles.loadingText}>Searching books...</Text>
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookCard}
              onPress={() =>
                router.push({
                  pathname: "/Labs/Lab6/detail_book",
                  params: { book: JSON.stringify(item) },
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.bookImage} />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.bookAuthor}>{item.author}</Text>
                <View style={styles.bookMeta}>
                  <Text style={styles.metaText}>
                    <Ionicons name="star" size={12} color="#F06277" />{" "}
                    {item.rating}/5
                  </Text>
                  <Text style={styles.metaText}>
                    <Ionicons name="book-outline" size={12} color="#F06277" />{" "}
                    {item.pageCount} pages
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : searchQuery.length > 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={50} color="#666" />
          <Text style={styles.emptyText}>No books found</Text>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={50} color="#666" />
          <Text style={styles.emptyText}>Search for books</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  resultsList: {
    padding: 20,
  },
  bookCard: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  bookImage: {
    width: 100,
    height: 150,
  },
  bookInfo: {
    flex: 1,
    padding: 15,
  },
  bookTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bookAuthor: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 10,
  },
  bookMeta: {
    flexDirection: "row",
    gap: 15,
  },
  metaText: {
    color: "#999",
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    fontSize: 16,
    marginTop: 10,
  },
});
