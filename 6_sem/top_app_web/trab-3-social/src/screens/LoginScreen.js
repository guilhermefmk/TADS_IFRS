import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Novo estado para mensagem de erro
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    console.log('[LoginScreen] handleLogin chamado com:', email);
    setErrorMessage(''); // Limpa erro anterior
    if (!email || !password) {
      const msg = 'Por favor, preencha e-mail e senha.';
      setErrorMessage(msg);
      Alert.alert('Atenção', msg);
      return;
    }
    setLoading(true);
    try {
      await signIn(email, password);
      console.log('[LoginScreen] signIn teoricamente bem-sucedido, navegação deve ocorrer.');
      // setLoading(false); // Não é estritamente necessário se a navegação desmontar a tela
    } catch (error) {
      console.error('[LoginScreen] Erro no login capturado na tela:', error.message);
      const displayError = error.message || 'Não foi possível fazer login. Tente novamente.';
      setErrorMessage(displayError); // Define a mensagem de erro para exibição na UI
      Alert.alert('Erro no Login', displayError); // Mantém o alerta também
    } finally {
      // Garante que o loading seja desativado mesmo se o signIn não navegar
      // ou se a navegação for síncrona e a tela não desmontar imediatamente.
      // No entanto, se signIn sempre navega em caso de sucesso,
      // o setLoading(false) no catch é suficiente.
      // Para ser seguro em todos os cenários:
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
        <>
          <Button title="Entrar" onPress={handleLogin} />
          <Button title="Não tem conta? Cadastre-se" onPress={() => navigation.navigate('Register')} />
        </>
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

export default LoginScreen;
