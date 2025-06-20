import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Lista de Posts (A ser implementado)</Text>
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

export default PostListScreen;
