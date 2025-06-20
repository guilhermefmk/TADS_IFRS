import { SafeAreaView, ScrollView, Text } from 'react-native';
import Post from '../components/Post';
import { Card } from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { STACKS } from '../constants/Screens';

const dummyPosts = [
  {
    id: '1',
    image: 'https://placecats.com/400/400',
    description: 'Such a cute kitty! 😻',
  },
  {
    id: '2',
    image: 'https://placecats.com/401/400',
    description: 'Another lovely kitten!',
  },
  {
    id: '3',
    image: 'https://placecats.com/401/400',
    description: 'And one more kitten!',
  },
  {
    id: '4',
    image: 'https://placecats.com/401/400',
    description: 'And ... kitten!',
  },
  {
    id: '5',
    image: 'https://placecats.com/401/400',
    description: 'The last one!',
  },
];

export default function HomeScreen({ navigation }) {

  const { user } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-gray-100">


      {        user && (
        <Text className="text-center text-lg font-bold">
          Welcome {user.username}!
        </Text>
      )}

      { !user && (
        <Text className="text-center text-lg font-bold" onPress={() => navigation.replace(STACKS.AUTHSTACK)}>
          Login!
        </Text>
      )}

      

      <ScrollView className="p-4">
        {dummyPosts.map(post => (
          <Card>
            <Post key={post.id} post={post} />
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
