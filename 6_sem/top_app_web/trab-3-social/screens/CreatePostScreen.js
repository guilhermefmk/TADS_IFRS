import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Image, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createPost } from '../services/api';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de permissão para acessar sua galeria de fotos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreatePost = async () => {
    if (!title || !content || !image) {
      Alert.alert('Erro', 'Preencha todos os campos e selecione uma imagem.');
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg'; 
      
      formData.append('foto', {
        uri: Platform.OS === 'ios' ? image.replace('file://', '') : image,
        name: filename,
        type,
      });
      
      console.log('FormData criado:', formData);
      
      await createPost(formData);
      Alert.alert('Sucesso', 'Post criado com sucesso!');
      setTitle('');
      setContent('');
      setImage(null);
      navigation.goBack();
    } catch (e) {
      console.log('Erro detalhado:', e?.response?.data, e?.message, e);
      const msg = e?.response?.data?.message || e?.response?.data?.error || 'Falha ao criar post';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center'}}>Criar novo post</Text>
      
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={{borderWidth:1, margin:4, padding:12, borderRadius: 6}}
      />
      
      <TextInput
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        style={{borderWidth:1, margin:4, padding:12, borderRadius: 6, height: 100}}
        multiline
      />
      
      <TouchableOpacity
        onPress={pickImage}
        style={{backgroundColor: '#e6f0ff', padding: 16, borderRadius: 8, alignItems: 'center', marginVertical: 8, borderWidth: 1, borderColor: '#cce0ff'}}
      >
        <Text style={{color: '#0066ff', fontSize: 16, fontWeight: '600'}}>
          {image ? 'Trocar Imagem' : 'Selecionar Imagem'}
        </Text>
      </TouchableOpacity>

      {image && (
        <Image 
          source={{ uri: image }} 
          style={{ width: '100%', height: 200, marginVertical: 8, borderRadius: 8 }}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity
        onPress={handleCreatePost}
        disabled={loading}
        style={{backgroundColor: '#0066ff', padding: 16, borderRadius: 8, alignItems: 'center', marginVertical: 8}}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>Criar Post</Text>
        )}
      </TouchableOpacity>
      
      {navigation && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{padding: 16, borderRadius: 8, alignItems: 'center'}}
        >
          <Text style={{color: '#ff3333', fontSize: 16}}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CreatePostScreen;