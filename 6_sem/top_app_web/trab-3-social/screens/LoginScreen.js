import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {

  const { login } = useAuth();

  const handleLogin = () => {
    console.log('Login button pressed');
    // Simulate a login action
    login({ username: 'VINICIUS', password: 'password' });
    navigation.replace('MainStack')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🔑 Login Screen</Text>
      <Button title="Login" onPress={() => {
        // navigation.replace('MainStack')}
        handleLogin();
       }} />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;
