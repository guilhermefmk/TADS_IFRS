import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import styles from './styles';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  const { addToCart, getCurrentCartQuantity, getProductStock } = useContext(CartContext);
  
  const currentQuantity = getCurrentCartQuantity(product.id);
  const availableStock = getProductStock(product.id);
  const isOutOfStock = currentQuantity >= availableStock;
  
  const handleAddToCart = () => {
    const success = addToCart(product);
    if (!success) {
      // Poderia mostrar uma mensagem de erro aqui
    }
  };
  
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
    >
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{formatCurrency(product.price)}</Text>
      {availableStock > 0 ? (
        <Text style={styles.stock}>Estoque: {availableStock}</Text>
      ) : (
        <Text style={styles.outOfStock}>Produto indisponível</Text>
      )}
      <TouchableOpacity 
        style={[
          styles.button, 
          (isOutOfStock || availableStock === 0) ? styles.disabledButton : null
        ]}
        onPress={handleAddToCart}
        disabled={isOutOfStock || availableStock === 0}
      >
        <Text style={styles.buttonText}>
          {isOutOfStock ? 'Sem Estoque' : 'Adicionar ao Carrinho'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductCard;