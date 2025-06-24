import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { deletePost } from '../services/api';

const DeletePostScreen = () => {
  const [postId, setPostId] = useState('');

  const handleDelete = async () => {
    if (!postId) {
      Alert.alert('Erro', 'Informe o ID do post.');
      return;
    }
    try {
      await deletePost(postId);
      Alert.alert('Sucesso', 'Post excluído!');
      setPostId('');
    } catch (e) {
      Alert.alert('Erro', 'Falha ao excluir post.');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="ID do Post" value={postId} onChangeText={setPostId} style={{borderWidth:1, margin:4, padding:4}} keyboardType="numeric" />
      <Button title="Excluir Post" onPress={handleDelete} />
    </View>
  );
};

export default DeletePostScreen;