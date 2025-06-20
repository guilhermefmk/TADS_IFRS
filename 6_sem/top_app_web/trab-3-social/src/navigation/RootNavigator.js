import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen'; // Exemplo de tela após login
import UserListScreen from '../screens/UserListScreen';
import PostListScreen from '../screens/PostListScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
// Importe outras telas conforme necessário

import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
  </Stack.Navigator>
);

const AppStack = () => (
  // Este Stack pode ser mais elaborado, talvez com um TabNavigator dentro
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }}/>
    <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Usuários' }} />
    <Stack.Screen name="PostList" component={PostListScreen} options={{ title: 'Posts' }} />
    <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Criar Post' }} />
    {/* Adicionar outras telas como Listagem de Usuários, Listagem de Posts, Criar Post aqui */}
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    // Pode mostrar uma tela de splash ou um indicador de carregamento
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
