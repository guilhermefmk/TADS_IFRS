import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { signOut, userToken, userData } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      {userData && <Text>Olá, {userData.name || 'Usuário'}</Text>}
      <Text>Token: {userToken ? 'Presente' : 'Ausente'}</Text>
      <Button title="Listar Usuários" onPress={() => navigation.navigate('UserList')} />
      <Button title="Listar Posts" onPress={() => navigation.navigate('PostList')} />
      <Button title="Criar Novo Post" onPress={() => navigation.navigate('CreatePost')} />
      <View style={styles.logoutButton}>
        <Button title="Sair" onPress={signOut} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
  }
});

export default HomeScreen;
