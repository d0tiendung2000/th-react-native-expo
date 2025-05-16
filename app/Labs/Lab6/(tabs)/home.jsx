import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../../constants/Colors"; // hoặc bạn thay Colors = { PRIMARY: "#F06277", WHITE: "#fff", ... }
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("fiction");

  const [allBooks, setAllBooks] = useState([]);

  const categories = [
    { id: "fiction", label: "Best Seller" },
    { id: "drama", label: "The Latest" },
    { id: "romance", label: "Coming Soon" },
  ];

  const fetchBooksFromGoogle = async (category = "fiction") => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&langRestrict=en&maxResults=8`
    );
    const data = await response.json();

    const formattedBooks = data.items.map((item) => ({
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
    }));

    setBooks(formattedBooks);
  };

  useEffect(() => {
    fetchBooksFromGoogle(selectedCategory);
  }, [selectedCategory]);

  const fetchAllBooksOnce = async () => {
    const subjects = ["fiction", "drama", "romance"];
    let results = [];

    for (const subject of subjects) {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&langRestrict=en&maxResults=6`
      );
      const data = await response.json();

      const formatted =
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

      results = [...results, ...formatted];
    }

    setAllBooks(results);
  };

  useEffect(() => {
    fetchAllBooksOnce();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.username}>Username</Text>
        </View>
        <View style={styles.pointBox}>
          <Ionicons name="add-circle-outline" size={20} color="white" />
          <Text style={styles.pointText}> 200 point</Text>
        </View>
      </View>

      {/* Button Actions */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="gift-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Claim</Text>
        </TouchableOpacity>

        <View style={styles.verticalDivider} />

        <TouchableOpacity style={styles.button}>
          <Ionicons name="trending-up-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Get Point</Text>
        </TouchableOpacity>

        <View style={styles.verticalDivider} />

        <TouchableOpacity style={styles.button}>
          <Ionicons name="card-outline" size={20} color="white" />
          <Text style={styles.buttonText}>My Card</Text>
        </TouchableOpacity>
      </View>

      {/* Body Scroll */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabRow}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.tabButton,
                selectedCategory === cat.id && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedCategory === cat.id && styles.tabTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Book List - Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bookList}
        >
          {books.map((item) => (
            <TouchableOpacity
              style={styles.bookCard}
              key={item.id}
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
                <Text style={styles.bookMeta}>
                  ⏱ {item.lastRead} | 📘 {item.completion}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* All Books */}
        <View style={styles.allBooksContainer}>
          <Text style={styles.allBooksTitle}>All Books</Text>
          <View style={styles.allBooksGrid}>
            {allBooks.map((item) => (
              <TouchableOpacity
                style={styles.allBooksCard}
                key={item.id}
                onPress={() =>
                  router.push({
                    pathname: "/Labs/Lab6/detail_book",
                    params: { book: JSON.stringify(item) },
                  })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.allBooksImage}
                />
                <View style={styles.allBooksInfo}>
                  <Text style={styles.allBooksTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.allBooksAuthor}>{item.author}</Text>
                  <Text style={styles.allBooksMeta}>
                    ⏱ {item.lastRead} | 📘 {item.completion}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
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
    paddingTop: 10,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: "#bbb",
    fontSize: 14,
  },
  username: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  pointBox: {
    backgroundColor: "#F06277",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointText: {
    color: "#fff",
    fontWeight: "bold",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: "#1e1e1e",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
  },
  verticalDivider: {
    width: 1,
    height: "70%",
    backgroundColor: "#444",
    marginHorizontal: 5,
  },
  tabRow: {
    marginTop: 20,
    flexGrow: 0,
  },
  tabButton: {
    marginRight: 15,
    paddingBottom: 5,
  },
  tabButtonActive: {
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
  },
  tabText: {
    color: "#aaa",
    fontSize: 14,
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  bookList: {
    paddingTop: 20,
  },
  bookCard: {
    width: 140,
    marginRight: 15,
  },
  bookImage: {
    width: 140,
    height: 200,
    borderRadius: 10,
  },
  bookInfo: {
    marginTop: 8,
  },
  bookTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  bookAuthor: {
    color: "#ccc",
    fontSize: 12,
  },
  bookMeta: {
    color: "#999",
    fontSize: 10,
  },
  allBooksContainer: {
    marginTop: 30,
  },
  allBooksTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  allBooksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  allBooksCard: {
    width: "48%",
    marginBottom: 15,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    overflow: "hidden",
  },
  allBooksImage: {
    width: "100%",
    height: 200,
  },
  allBooksInfo: {
    padding: 10,
  },
  allBooksAuthor: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 4,
  },
  allBooksMeta: {
    color: "#999",
    fontSize: 10,
    marginTop: 4,
  },
});
