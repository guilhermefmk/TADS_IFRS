import React, { useContext, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CartContext } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import Header from '../../components/Header';
import styles from './styles';
import productsData from '../../data/products';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const product = productsData.find(item => item.id === productId);
  const { addToCart, getCurrentCartQuantity, getProductStock } = useContext(CartContext);
  
  const currentQuantity = getCurrentCartQuantity(product.id);
  const availableStock = getProductStock(product.id);
  const isOutOfStock = currentQuantity >= availableStock;

  const handleAddToCart = () => {
    const success = addToCart(product);
    if (!success) {
      Alert.alert(
        "Estoque insuficiente", 
        `Desculpe, temos apenas ${availableStock} unidades disponíveis deste produto.`,
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Detalhes do Produto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={product.image} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          
          <View style={styles.stockContainer}>
            <Text style={styles.stockLabel}>Disponibilidade: </Text>
            {availableStock > 0 ? (
              <Text style={styles.stockValue}>{availableStock} unidades</Text>
            ) : (
              <Text style={styles.outOfStock}>Produto indisponível</Text>
            )}
          </View>
          
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{product.description}</Text>
          
          <TouchableOpacity
            style={[styles.addToCartButton, isOutOfStock && styles.disabledButton]}
            onPress={handleAddToCart}
            disabled={isOutOfStock}
          >
            <Text style={styles.buttonText}>
              {isOutOfStock ? 'Sem Estoque' : 'Adicionar ao Carrinho'}
            </Text>
          </TouchableOpacity>
          
          {/* Novo botão "Continuar Comprando" */}
          <TouchableOpacity 
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.continueShoppingText}>Continuar Comprando</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;