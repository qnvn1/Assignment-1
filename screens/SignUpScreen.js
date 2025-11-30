import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (email && password) {
      Alert.alert('Success', 'You have successfully signed up!');
      navigation.navigate('Home'); // Navigate to Home screen after successful sign-up
    } else {
      Alert.alert('Error', 'Please fill in both fields.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}