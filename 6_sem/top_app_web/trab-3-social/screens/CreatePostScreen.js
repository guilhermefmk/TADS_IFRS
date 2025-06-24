import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createPost } from '../services/api';

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });
    if (!result.canceled) setImage(result.assets[0]);
  };

  const handleCreatePost = async () => {
    if (!title || !content || !image) {
      Alert.alert('Erro', 'Preencha todos os campos e selecione uma imagem.');
      return;
    }

    const fileName = image.fileName || image.uri.split('/').pop() || 'photo.jpg';
    const fileType = image.type || (image.uri.endsWith('.png') ? 'image/png' : 'image/jpeg');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    
    formData.append('foto', {
      uri: image.uri,
      name: fileName,
      type: fileType,
    });

    try {
      console.log('Enviando para a API...');
      const response = await createPost(formData);
      console.log('Resposta:', response.data);
      Alert.alert('Sucesso', 'Post criado!');
      setTitle('');
      setContent('');
      setImage(null);
    } catch (e) {
      console.log('Erro detalhado:', e?.response?.data);
      const msg = e?.response?.data?.message || e?.response?.data?.error || 'Falha ao criar post';
      Alert.alert('Erro', msg);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={{borderWidth:1, margin:4, padding:4, borderRadius: 6}}
      />
      <TextInput
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        style={{borderWidth:1, margin:4, padding:4, borderRadius: 6}}
        multiline
      />
      <Button title="Selecionar Imagem" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: '100%', height: 200, marginVertical: 8, borderRadius: 8 }}
          resizeMode="cover"
        />
      )}
      <Button title="Criar Post" onPress={handleCreatePost} />
    </View>
  );
};

export default CreatePostScreen;


