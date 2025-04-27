import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import products from '../data/products';
import globalStyles from '../styles/globalStyles';

export default function ProductListScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={globalStyles.productCard}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={globalStyles.productName}>{item.name}</Text>
            <Text style={globalStyles.productPrice}>R$ {item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 150, marginBottom: 10 },
});