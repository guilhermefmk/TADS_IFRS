import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';
import globalStyles from '../styles/globalStyles';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <View style={globalStyles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={globalStyles.productName}>{product.name}</Text>
      <Text style={globalStyles.productPrice}>R$ {product.price.toFixed(2)}</Text>
      <Text style={styles.description}>
        Este é um produto de alta qualidade, perfeito para suas necessidades.
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Adicionar ao Carrinho" color="#D71920" onPress={() => addToCart(product)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 300, marginBottom: 20 },
  description: { fontSize: 16, color: '#555', marginBottom: 20 },
  buttonContainer: { marginTop: 10 },
});