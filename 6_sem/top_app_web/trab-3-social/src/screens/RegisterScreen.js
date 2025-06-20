import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Novo estado para mensagem de erro
  const { signUp } = useContext(AuthContext);

  const handleRegister = async () => {
    console.log('[RegisterScreen] handleRegister chamado com:', name, email);
    setErrorMessage(''); // Limpa erro anterior
    if (!name || !email || !password) {
      const msg = 'Por favor, preencha todos os campos.';
      setErrorMessage(msg);
      Alert.alert('Atenção', msg);
      return;
    }
    setLoading(true);
    try {
      await signUp(name, email, password);
      console.log('[RegisterScreen] signUp bem-sucedido.');
      Alert.alert('Sucesso', 'Cadastro realizado! Você já pode fazer login.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('[RegisterScreen] Erro no cadastro capturado na tela:', error.message);
      const displayError = error.message || 'Não foi possível realizar o cadastro. Tente novamente.';
      setErrorMessage(displayError); // Define a mensagem de erro para exibição na UI
      Alert.alert('Erro no Cadastro', displayError); // Mantém o alerta também
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Cadastrar" onPress={handleRegister} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText: { // Novo estilo para a mensagem de erro
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default RegisterScreen;
