import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "../../../../../constants/Colors";
import { Stack } from "expo-router";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "../../../../../configs/firebase";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";

export default function Appointment() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
    fetchAppointments();
  }, []);

  const fetchServices = async () => {
    try {
      const servicesRef = collection(db, "services");
      const querySnapshot = await getDocs(servicesRef);
      const servicesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(servicesList);
    } catch (error) {
      console.error("Error fetching services:", error);
      Alert.alert("Error", "Failed to load services");
    }
  };

  const fetchAppointments = async () => {
    try {
      if (!auth.currentUser) return;

      const appointmentsRef = collection(db, "appointments");
      const q = query(
        appointmentsRef,
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const appointmentsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentsList);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      Alert.alert("Error", "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedService) {
      Alert.alert("Error", "Please select a service");
      return;
    }

    try {
      const appointmentData = {
        userId: auth.currentUser.uid,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        date: Timestamp.fromDate(date),
        status: "pending",
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "appointments"), appointmentData);
      Alert.alert("Success", "Appointment booked successfully");
      setSelectedService(null);
      fetchAppointments();
    } catch (error) {
      console.error("Error booking appointment:", error);
      Alert.alert("Error", "Failed to book appointment");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#FFA500";
      case "confirmed":
        return "#4CAF50";
      case "cancelled":
        return "#FF0000";
      default:
        return "#666";
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Book Appointment",
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
        {/* Service Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Service</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceCard,
                  selectedService?.id === service.id && styles.selectedService,
                ]}
                onPress={() => setSelectedService(service)}
              >
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date & Time</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar" size={24} color="#F06277" />
            <Text style={styles.dateText}>{date.toLocaleString()}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="datetime"
            date={date}
            onConfirm={(selectedDate) => {
              setShowDatePicker(false);
              setDate(selectedDate);
            }}
            onCancel={() => setShowDatePicker(false)}
            minimumDate={new Date()}
          />
        </View>

        {/* Book Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookAppointment}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>

        {/* Appointments List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Appointments</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#F06277" />
          ) : appointments.length === 0 ? (
            <Text style={styles.noAppointments}>No appointments found</Text>
          ) : (
            appointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <Text style={styles.appointmentService}>
                    {appointment.serviceName}
                  </Text>
                  <Text
                    style={[
                      styles.appointmentStatus,
                      { color: getStatusColor(appointment.status) },
                    ]}
                  >
                    {appointment.status}
                  </Text>
                </View>
                <Text style={styles.appointmentDate}>
                  {formatDate(appointment.date)}
                </Text>
              </View>
            ))
          )}
        </View>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  serviceCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    width: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedService: {
    borderColor: "#F06277",
    borderWidth: 2,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 14,
    color: "#F06277",
    fontWeight: "500",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  bookButton: {
    backgroundColor: "#F06277",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  bookButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  appointmentCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
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
    marginBottom: 5,
  },
  appointmentService: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  appointmentStatus: {
    fontSize: 14,
    fontWeight: "500",
  },
  appointmentDate: {
    fontSize: 14,
    color: "#666",
  },
  noAppointments: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 20,
  },
});
