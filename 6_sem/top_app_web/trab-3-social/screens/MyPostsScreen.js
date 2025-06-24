import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, ActivityIndicator } from 'react-native';
import { getMyPosts, deletePost } from '../services/api';
import { Card } from '../components/Card';
import Post from '../components/Post';

const MyPostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    setLoading(true);
    try {
      const { data } = await getMyPosts();
      setPosts(data.posts || data || []);
    } catch (e) {
      setPosts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleDelete = (postId) => {
    Alert.alert(
      'Excluir Post',
      'Tem certeza que deseja excluir este post?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePost(postId);
              setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
              Alert.alert('Sucesso', 'Post excluído!');
            } catch (e) {
              Alert.alert('Erro', 'Não foi possível excluir o post.');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 32 }} />;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={posts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Card>
            <Post post={item} />
            <Button
              title="Excluir"
              color="#dc2626"
              onPress={() => handleDelete(item.id)}
            />
          </Card>
        )}
        ListEmptyComponent={<Text>Nenhum post encontrado.</Text>}
      />
    </View>
  );
};

export default MyPostsScreen;