import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle login action
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill in both the email and password.');
      return;
    }

    // You can add actual login logic here (e.g., API request)
    // For now, we're assuming the login is successful
    if (email === 'test@example.com' && password === 'password123') {
      Alert.alert('Login Successful', 'Welcome to the app!');
      navigation.navigate('Home'); // Navigate to the Home screen after login
    } else {
      Alert.alert('Login Failed', 'Incorrect email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // Hide the password
      />

      {/* Login Button */}
      <Button title="Login" onPress={handleLogin} />

      {/* Signup Link */}
      <Text style={styles.signupText} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  signupText: {
    marginTop: 20,
    color: '#2563eb',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});