import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RequestItem({ request, markStatus, openForm, deleteRequest }) {
  return (
    <View style={styles.requestCard}>
      <Text style={styles.requestTitle}>{request.service}</Text>
      <Text style={styles.requestDetail}>Name: {request.name}</Text>
      <Text style={styles.requestDetail}>Purpose: {request.purpose}</Text>
      <Text style={styles.requestDetail}>Status: {request.status}</Text>

      <View style={styles.requestButtons}>
        <Button title="In Progress" color="#f59e0b" onPress={() => markStatus(request.id, 'In Progress')} />
        <Button title="Done" color="#16a34a" onPress={() => markStatus(request.id, 'Done')} />
        <Button title="Edit" color="#2563eb" onPress={() => openForm(request.service, request)} />
        <Button title="Delete" color="#dc2626" onPress={() => deleteRequest(request.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  requestCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  requestDetail: {
    fontSize: 14,
    marginBottom: 4,
  },
  requestButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});