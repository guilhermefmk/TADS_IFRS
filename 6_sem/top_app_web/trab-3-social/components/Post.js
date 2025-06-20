import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Post({ post }) {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Image source={{ uri: post.image }} className="w-full h-64" />
      <View className="p-4">
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Text className={`text-lg ${liked ? 'text-red-500' : 'text-gray-500'}`}>
            {liked ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
        <Text className="mt-2 text-sm text-gray-700">{post.description}</Text>
      </View>
    </>
  );
}
