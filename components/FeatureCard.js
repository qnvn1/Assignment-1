import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FeatureCard({ title, color, icon, onPress }) {
  return (
    <TouchableOpacity style={[styles.card, { borderColor: color }]} onPress={onPress}>
      <Ionicons name={icon} size={40} color={color} />
      <Text style={[styles.cardTitle, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '45%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});