import React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center">
      <View className="items-center mb-8">
        <Text className="text-lg font-bold mb-2">
          Bem-vindo, {user?.name || user?.email || 'Usuário'}!
        </Text>
      </View>
      <View className="mx-8">
        <Button
          title="Listar postagens"
          onPress={() => navigation.navigate('PostList')}
          color="#2563eb"
        />
        <View style={{ height: 12 }} />
        <Button
          title="Listar usuários"
          onPress={() => navigation.navigate('UserList')}
          color="#2563eb"
        />
        <View style={{ height: 12 }} />
        <Button
          title="Criar post"
          onPress={() => navigation.navigate('CreatePost')}
          color="#2563eb"
        />
        <View style={{ height: 12 }} />
        <Button
          title="Meus posts"
          onPress={() => navigation.navigate('MyPosts')}
          color="#2563eb"
        />
        <View style={{ height: 24 }} />
        <Button
          title="Logout"
          onPress={logout}
          color="#dc2626"
        />
      </View>
    </SafeAreaView>
  );
}