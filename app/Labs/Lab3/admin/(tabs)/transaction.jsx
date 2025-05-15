import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../../../configs/firebase";
import { Ionicons } from "@expo/vector-icons";
import { getDoc } from "firebase/firestore";

export default function Transaction() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const appointmentsRef = collection(db, "appointments");
      const q = query(appointmentsRef, where("status", "==", "pending"));
      const querySnapshot = await getDocs(q);

      const appointmentsList = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const appointmentData = docSnap.data();
          // Lấy thông tin user
          const userRef = doc(db, "users", appointmentData.userId);
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data();

          return {
            id: docSnap.id,
            ...appointmentData,
            userFullName: userData?.fullName || "Unknown User",
          };
        })
      );

      // Sắp xếp theo createdAt mới nhất
      appointmentsList.sort((a, b) => {
        return b.createdAt.toDate() - a.createdAt.toDate();
      });

      setAppointments(appointmentsList);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      Alert.alert("Error", "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAppointment = async (appointmentId) => {
    try {
      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, {
        status: "confirmed",
      });

      Alert.alert("Success", "Appointment confirmed successfully");
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error("Error confirming appointment:", error);
      Alert.alert("Error", "Failed to confirm appointment");
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, {
        status: "cancelled",
      });

      Alert.alert("Success", "Appointment cancelled successfully");
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      Alert.alert("Error", "Failed to cancel appointment");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Appointments",
          headerStyle: {
            backgroundColor: "#F06277",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <ScrollView style={styles.scrollView}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#F06277"
            style={styles.loader}
          />
        ) : appointments.length === 0 ? (
          <Text style={styles.noAppointments}>No pending appointments</Text>
        ) : (
          appointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <Text style={styles.customerName}>
                  {appointment.userFullName}
                </Text>
                <Text style={styles.appointmentDate}>
                  {formatDate(appointment.date)}
                </Text>
              </View>

              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>
                  Service: {appointment.serviceName}
                </Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.confirmButton]}
                  onPress={() => handleConfirmAppointment(appointment.id)}
                >
                  <Ionicons name="checkmark-circle" size={20} color="white" />
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => handleCancelAppointment(appointment.id)}
                >
                  <Ionicons name="close-circle" size={20} color="white" />
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    padding: 20,
  },
  loader: {
    marginTop: 20,
  },
  noAppointments: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 20,
  },
  appointmentCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  appointmentDate: {
    fontSize: 14,
    color: "#666",
  },
  serviceInfo: {
    marginBottom: 15,
  },
  serviceName: {
    fontSize: 16,
    color: "#444",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    backgroundColor: "#FF0000",
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "500",
  },
});
