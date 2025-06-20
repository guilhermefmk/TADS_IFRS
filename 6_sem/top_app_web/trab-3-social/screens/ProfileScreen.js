import React from 'react';
import { View, Text, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>👤 Profile Screen</Text>
      <Button title="Logout" onPress={() => navigation.replace('AuthStack')} />
    </View>
  );
};

export default ProfileScreen;
