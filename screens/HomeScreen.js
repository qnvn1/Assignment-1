import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, Modal, Alert, View, StyleSheet } from 'react-native';
import FeatureCard from '../components/FeatureCard';
import Header from '../components/Header';
import RequestItem from '../components/RequestItem'; // Import RequestItem for rendering requests

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceType, setServiceType] = useState('');
  const [requests, setRequests] = useState([]); // State to manage requests
  const [form, setForm] = useState({
    fullName: '',
    address: '',
    birthdate: '',
    contact: '',
    email: '',
  });
  const [editingId, setEditingId] = useState(null); // To track which request is being edited

  // Function to open the form modal
  const openForm = (service, request = null) => {
    setServiceType(service); // Set the service type (e.g., "Birth Certificate")

    // Set default purpose based on the service type
    let purpose = '';
    switch (service) {
      case 'Birth Certificate':
        purpose = 'To request a birth certificate.';
        break;
      case 'Marriage Certificate':
        purpose = 'To request a marriage certificate.';
        break;
      case 'Death Certificate':
        purpose = 'To request a death certificate.';
        break;
      case 'CENOMAR':
        purpose = 'To request a Certificate of No Marriage Record.';
        break;
      case 'CENODEATH':
        purpose = 'To request a Certificate of No Death Record.';
        break;
      default:
        purpose = '';
    }

    if (request) {
      // Prefill the form for editing
      setEditingId(request.id);
      setForm({
        fullName: request.name,
        address: request.address,
        birthdate: request.birthdate,
        contact: request.contact,
        email: request.email,
      });
    } else {
      // Reset form for new request
      setEditingId(null);
      setForm({
        fullName: '',
        address: '',
        birthdate: '',
        contact: '',
        email: '',
      });
    }

    // Add the selected purpose to the form
    setForm((prevForm) => ({
      ...prevForm,
      purpose, // Set the purpose automatically
    }));

    setModalVisible(true); // Open the modal
  };

  // Function to handle form submission (new request or update)
  const submitForm = () => {
    if (!form.fullName) {
      Alert.alert('Missing Info', 'Please fill in at least Full Name.');
      return;
    }

    // Validate the contact number to be exactly 11 digits
    if (form.contact.length !== 11) {
      Alert.alert('Invalid Contact Number', 'Please enter a valid contact number with 11 digits.');
      return;
    }

    // Validate email address to contain @
    if (!form.email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address containing "@".');
      return;
    }

    const newRequest = {
      id: editingId ? editingId : Date.now(),
      service: serviceType,
      name: form.fullName,
      address: form.address,
      birthdate: form.birthdate,
      purpose: form.purpose,  // Automatically set the purpose
      contact: form.contact,
      email: form.email,
      status: 'Pending',
    };

    if (editingId) {
      // Update existing request
      setRequests((prevRequests) =>
        prevRequests.map((req) => (req.id === editingId ? newRequest : req))
      );
      Alert.alert('Updated', 'Your request has been updated!');
    } else {
      // Add new request
      setRequests((prevRequests) => [...prevRequests, newRequest]);
      Alert.alert('Submitted', `Your request for ${serviceType} has been submitted!`);
    }

    // Close the modal and reset form
    setModalVisible(false);
    setForm({
      fullName: '',
      address: '',
      birthdate: '',
      contact: '',
      email: '',
    });
  };

  // Function to mark the status of the request as "In Progress" or "Done"
  const markStatus = (id, status) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  // Function to delete a request
  const deleteRequest = (id) => {
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
    Alert.alert('Deleted', 'The request has been deleted!');
  };

  // Function to handle changes to the contact field (limit to 11 digits)
  const handleContactChange = (text) => {
    // Allow only numbers and ensure the length is <= 11
    if (/^\d{0,11}$/.test(text)) {
      setForm({ ...form, contact: text });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header title="Civil Registry App" subtitle="Request Certificates Easily" />

      {/* Feature Cards */}
      <View style={styles.cardGrid}>
        {['Birth Certificate', 'Marriage Certificate', 'Death Certificate', 'CENOMAR', 'CENODEATH'].map((service) => (
          <FeatureCard
            key={service}
            title={service}
            color="#2563eb"
            icon="document-text-outline"
            onPress={() => openForm(service)} // Open form with selected service
          />
        ))}
      </View>

      {/* Request List */}
      <Text style={styles.sectionTitle}>Requests</Text>
      {requests.length === 0 ? (
        <Text style={styles.emptyText}>No requests found</Text>
      ) : (
        requests.map((req) => (
          <RequestItem
            key={req.id}
            request={req}
            markStatus={markStatus}  // Pass the function to mark status
            openForm={openForm}      // Pass the function to open the edit form
            deleteRequest={deleteRequest} // Pass the function to delete the request
          />
        ))
      )}

      {/* Modal Form */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Request {serviceType}</Text>

            {/* Form Fields */}
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
              placeholder="Contact Number"
              keyboardType="phone-pad"
              value={form.contact}
              onChangeText={handleContactChange} // Use the handler to limit input
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <Button title="Cancel" color="#6b7280" onPress={() => setModalVisible(false)} />
              <Button title="Submit Request" color="#2563eb" onPress={submitForm} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fafb',
    flexGrow: 1,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});