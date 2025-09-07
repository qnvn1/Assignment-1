import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Dan Ivan E. Labin</Text>
      <Text style={styles.course}>BSIT 3rd Year - IT3R12_Track2</Text>
      <Text style={styles.message}>
        This is my first React Native app using View and Text!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a587ebff',
    padding: 20,
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  course: {
    fontSize: 20,
    marginBottom: 10,
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
  },
});
