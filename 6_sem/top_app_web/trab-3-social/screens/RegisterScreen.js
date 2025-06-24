import React, { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { registerUser } from "../services/api";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async () => {
    setErrorMsg('');
    if (!name || !email || !password) {
      setErrorMsg("Preencha todos os campos.");
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg("Digite um e-mail válido.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    try {
      await registerUser({ name, email, password });
      setErrorMsg('');
      navigation.navigate('Login');
    } catch (e) {
      const msg = e?.response?.data?.message || "Falha ao cadastrar usuário. Verifique os dados ou tente outro e-mail.";
      setErrorMsg(msg);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 16 }}>Cadastro</Text>
      {errorMsg ? (
        <Text style={{ color: 'red', marginBottom: 8 }}>{errorMsg}</Text>
      ) : null}
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={{borderWidth:1, margin:4, padding:4, borderRadius: 6}}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{borderWidth:1, margin:4, padding:4, borderRadius: 6}}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{borderWidth:1, margin:4, padding:4, borderRadius: 6}}
      />
      <Button title="Cadastrar" onPress={handleRegister} />
      <View style={{ height: 8 }} />
      <Button title="Voltar ao Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegisterScreen;