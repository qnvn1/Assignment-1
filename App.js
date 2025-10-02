// App.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ✅ Header Component
function Header({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
    </View>
  );
}

// ✅ FeatureCard Component
function FeatureCard({ title, color, icon, onPress }) {
  return (
    <TouchableOpacity style={[styles.card, { borderColor: color }]} onPress={onPress}>
      <Ionicons name={icon} size={40} color={color} />
      <Text style={[styles.cardTitle, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

// ✅ Main App
export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [requests, setRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    birthdate: "",
    purpose: "",
    contact: "",
    email: "",
  });

  const openForm = (service, request = null) => {
    if (request) {
      setEditingId(request.id);
      setForm({
        fullName: request.name,
        address: request.address || "",
        birthdate: request.birthdate || "",
        purpose: request.purpose,
        contact: request.contact || "",
        email: request.email || "",
      });
      setServiceType(request.service);
    } else {
      setEditingId(null);
      setForm({
        fullName: "",
        address: "",
        birthdate: "",
        purpose: "",
        contact: "",
        email: "",
      });
      setServiceType(service);
    }
    setModalVisible(true);
  };

  const submitForm = () => {
    if (!form.fullName || !form.purpose) {
      Alert.alert("Missing Info", "Please fill in at least Full Name and Purpose.");
      return;
    }

    if (editingId) {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === editingId
            ? { ...req, ...form, service: serviceType }
            : req
        )
      );
      Alert.alert("Success", "Request updated successfully!");
    } else {
      const newRequest = {
        id: Date.now(),
        service: serviceType,
        name: form.fullName,
        address: form.address,
        birthdate: form.birthdate,
        purpose: form.purpose,
        contact: form.contact,
        email: form.email,
        status: "Pending",
      };
      setRequests((prev) => [...prev, newRequest]);
      Alert.alert("Submitted", "Your request has been submitted!");
    }

    setModalVisible(false);
  };

  const markStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  const deleteRequest = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const clearAllRequests = () => {
    Alert.alert("Confirm", "Clear all requests?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => setRequests([]) },
    ]);
  };

  const filteredRequests = requests
    .filter(
      (req) =>
        req.name.toLowerCase().includes(search.toLowerCase()) ||
        req.service.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "newest" ? b.id - a.id : a.id - b.id
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header title="Civil Registry App" subtitle="Request Certificates Easily" />

      {/* Feature Cards */}
      <View style={styles.cardGrid}>
        <FeatureCard
          title="Birth Certificate"
          color="#2563eb"
          icon="document-text-outline"
          onPress={() => openForm("Birth Certificate")}
        />
        <FeatureCard
          title="Marriage Certificate"
          color="#dc2626"
          icon="heart-outline"
          onPress={() => openForm("Marriage Certificate")}
        />
        <FeatureCard
          title="Death Certificate"
          color="#6b7280"
          icon="skull-outline"
          onPress={() => openForm("Death Certificate")}
        />
        <FeatureCard
          title="CENOMAR"
          color="#ca8a04"
          icon="people-outline"
          onPress={() => openForm("CENOMAR")}
        />
        <FeatureCard
          title="CENODEATH"
          color="#15803d"
          icon="home-outline"
          onPress={() => openForm("CENODEATH")}
        />
      </View>

      {/* Search + Sort */}
      <TextInput
        style={styles.input}
        placeholder="Search by name or service..."
        value={search}
        onChangeText={setSearch}
      />
      <Button
        title={`Sort: ${sortOrder === "newest" ? "Newest First" : "Oldest First"}`}
        onPress={() =>
          setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
        }
      />

      {/* Request List */}
      <Text style={styles.sectionTitle}>Requests</Text>
      {filteredRequests.length === 0 ? (
        <Text style={styles.emptyText}>No requests found</Text>
      ) : (
        filteredRequests.map((req) => (
          <View key={req.id} style={styles.requestCard}>
            <Text style={styles.requestTitle}>{req.service}</Text>
            <Text style={styles.requestDetail}>Name: {req.name}</Text>
            <Text style={styles.requestDetail}>Purpose: {req.purpose}</Text>
            <Text style={styles.requestDetail}>Status: {req.status}</Text>
            <View style={styles.requestButtons}>
              <Button
                title="In Progress"
                color="#f59e0b"
                onPress={() => markStatus(req.id, "In Progress")}
              />
              <Button
                title="Done"
                color="#16a34a"
                onPress={() => markStatus(req.id, "Done")}
              />
              <Button
                title="Edit"
                color="#2563eb"
                onPress={() => openForm(req.service, req)}
              />
              <Button
                title="Delete"
                color="#dc2626"
                onPress={() => deleteRequest(req.id)}
              />
            </View>
          </View>
        ))
      )}

      {requests.length > 0 && (
        <Button
          title="Clear All Requests"
          color="#dc2626"
          onPress={clearAllRequests}
        />
      )}

      {/* Modal Form */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingId ? "Edit Request" : "Request Service"}
            </Text>
            <Text style={styles.label}>Service Type</Text>
            <Text style={styles.serviceType}>{serviceType}</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={form.fullName}
              onChangeText={(text) => setForm({ ...form, fullName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={form.address}
              onChangeText={(text) => setForm({ ...form, address: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Birthdate (MM/DD/YYYY)"
              value={form.birthdate}
              onChangeText={(text) => setForm({ ...form, birthdate: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Purpose"
              value={form.purpose}
              onChangeText={(text) => setForm({ ...form, purpose: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              keyboardType="phone-pad"
              value={form.contact}
              onChangeText={(text) => setForm({ ...form, contact: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />

            <View style={styles.modalButtons}>
              <Button title="Cancel" color="#6b7280" onPress={() => setModalVisible(false)} />
              <Button
                title={editingId ? "Update Request" : "Submit Request"}
                color="#2563eb"
                onPress={submitForm}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9fafb",
    flexGrow: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  card: {
    width: "45%",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: "#6b7280",
    fontStyle: "italic",
    textAlign: "center",
  },
  requestCard: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  requestDetail: {
    fontSize: 14,
    marginBottom: 4,
  },
  requestButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  label: {
    fontWeight: "600",
    marginTop: 10,
  },
  serviceType: {
    fontSize: 16,
    marginBottom: 10,
    color: "#2563eb",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
