import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const FeatureCard = ({ title, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{description}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    date: "",
    purpose: "",
  });

  const handleOpenForm = (service) => {
    setServiceType(service);
    setModalVisible(true);
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Government E-Services System" />

      <Text style={styles.sectionTitle}>App Features</Text>

      <FeatureCard
        title="Barangay Clearance"
        description="Request your clearance online without long lines."
        onPress={() => handleOpenForm("Barangay Clearance")}
      />
      <FeatureCard
        title="Certificate of Residency"
        description="Get proof of residency from the comfort of your home."
        onPress={() => handleOpenForm("Certificate of Residency")}
      />
      <FeatureCard
        title="Appointment Setting"
        description="Schedule your barangay visits to avoid long queues."
        onPress={() => handleOpenForm("Appointment Setting")}
      />

      <View style={styles.counterBox}>
        <Text style={styles.counterText}>Counter: {count}</Text>
        <Button title="Add Appointment" onPress={() => setCount(count + 1)} />
        <Button title="Done" onPress={() => setCount(count - 1)} />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Request Service</Text>
            <Text style={styles.serviceType}>
              Service Type:{" "}
              <Text style={{ color: "blue" }}>{serviceType}</Text>
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Date"
              value={formData.date}
              onChangeText={(text) => handleChange("date", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Purpose"
              value={formData.purpose}
              onChangeText={(text) => handleChange("purpose", text)}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log("Submitted Data:", formData);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.submitBtn}>Submit Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aec5ddff",
  },
  header: {
    backgroundColor: "#5977a3ff",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#c0a5a5ff",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDesc: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  counterBox: {
    margin: 20,
    padding: 15,
    backgroundColor: "#8288ad18",
    borderRadius: 10,
    elevation: 3,
  },
  counterText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  serviceType: {
    fontSize: 16,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelBtn: {
    color: "red",
    fontSize: 16,
  },
  submitBtn: {
    color: "blue",
    fontSize: 16,
  },
});
