import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10; // Số sách hiển thị trên mỗi trang

  const categories = [
    { id: "fiction", label: "Best Seller" },
    { id: "drama", label: "The Latest" },
    { id: "romance", label: "Coming Soon" },
  ];

  const fetchBooksFromGoogle = async (category = "fiction") => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&langRestrict=en&maxResults=20`
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
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooksFromGoogle(selectedCategory);
  }, [selectedCategory]);

  const fetchAllBooksOnce = async () => {
    setIsLoadingAll(true);
    try {
      const subjects = ["fiction", "drama", "romance"];
      let results = [];

      for (const subject of subjects) {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&langRestrict=en&maxResults=40`
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
    } catch (error) {
      console.error("Error fetching all books:", error);
    } finally {
      setIsLoadingAll(false);
    }
  };

  useEffect(() => {
    fetchAllBooksOnce();
  }, []);

  // Thêm hàm tính toán sách cho trang hiện tại
  const getCurrentPageBooks = () => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    return allBooks.slice(startIndex, endIndex);
  };

  // Thêm hàm tính tổng số trang
  const getTotalPages = () => {
    return Math.ceil(allBooks.length / booksPerPage);
  };

  // Thêm hàm xử lý chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Thêm hàm mới để tạo mảng số trang cần hiển thị
  const getPageNumbers = () => {
    const totalPages = getTotalPages();
    const currentPage = currentPage;
    const pageNumbers = [];

    // Luôn hiển thị trang đầu tiên
    pageNumbers.push(1);

    // Tính toán các trang cần hiển thị
    if (totalPages <= 7) {
      // Nếu tổng số trang <= 7, hiển thị tất cả
      for (let i = 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Nếu tổng số trang > 7
      if (currentPage <= 4) {
        // Nếu đang ở các trang đầu
        for (let i = 2; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Nếu đang ở các trang cuối
        pageNumbers.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Nếu đang ở giữa
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

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
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#F06277" />
            <Text style={styles.loadingText}>Loading books...</Text>
          </View>
        ) : (
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
        )}

        {/* All Books */}
        <View style={styles.allBooksContainer}>
          <Text style={styles.allBooksTitle}>All Books</Text>
          {isLoadingAll ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#F06277" />
              <Text style={styles.loadingText}>Loading all books...</Text>
            </View>
          ) : (
            <>
              <View style={styles.allBooksGrid}>
                {getCurrentPageBooks().map((item) => (
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

              {/* Pagination */}
              <View style={styles.paginationContainer}>
                {/* Nút về trang đầu */}
                <TouchableOpacity
                  style={[
                    styles.pageButton,
                    currentPage === 1 && styles.pageButtonDisabled,
                  ]}
                  onPress={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  <Ionicons name="play-skip-back" size={20} color="white" />
                </TouchableOpacity>

                {/* Nút trang trước */}
                <TouchableOpacity
                  style={[
                    styles.pageButton,
                    currentPage === 1 && styles.pageButtonDisabled,
                  ]}
                  onPress={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <Ionicons name="chevron-back" size={20} color="white" />
                </TouchableOpacity>

                <Text style={styles.pageInfo}>
                  Page {currentPage} of {getTotalPages()}
                </Text>

                {/* Nút trang tiếp */}
                <TouchableOpacity
                  style={[
                    styles.pageButton,
                    currentPage === getTotalPages() &&
                      styles.pageButtonDisabled,
                  ]}
                  onPress={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === getTotalPages()}
                >
                  <Ionicons name="chevron-forward" size={20} color="white" />
                </TouchableOpacity>

                {/* Nút đến trang cuối */}
                <TouchableOpacity
                  style={[
                    styles.pageButton,
                    currentPage === getTotalPages() &&
                      styles.pageButtonDisabled,
                  ]}
                  onPress={() => handlePageChange(getTotalPages())}
                  disabled={currentPage === getTotalPages()}
                >
                  <Ionicons name="play-skip-forward" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </>
          )}
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
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    flexWrap: "wrap",
    gap: 5,
  },
  pageButton: {
    minWidth: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  pageButtonActive: {
    backgroundColor: "#F06277",
  },
  pageButtonDisabled: {
    opacity: 0.5,
  },
  pageButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  pageButtonTextActive: {
    color: "white",
  },
  ellipsis: {
    color: "white",
    fontSize: 16,
    marginHorizontal: 5,
  },
  pageInfo: {
    color: "white",
    fontSize: 14,
    marginHorizontal: 15,
  },
  doubleChevron: {
    marginLeft: -10, // Để hai icon chồng lên nhau một chút
  },
});
