import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Lista de Usuários (A ser implementado)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserListScreen;
