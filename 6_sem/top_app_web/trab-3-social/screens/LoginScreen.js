import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Preencha e-mail e senha.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Digite um e-mail válido.');
      return;
    }
    try {
      await login({ email, password });
    } catch (e) {
      const msg = e?.response?.data?.message || "Credenciais inválidas.";
      setErrorMsg(msg);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 16 }}>🔑 Login</Text>
      {errorMsg ? (
        <Text style={{ color: 'red', marginBottom: 8 }}>{errorMsg}</Text>
      ) : null}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{borderWidth:1, width:200, margin:4, padding:4, borderRadius: 6}}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{borderWidth:1, width:200, margin:4, padding:4, borderRadius: 6}}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <View style={{ height: 8 }} />
      <Button title="Cadastrar" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;