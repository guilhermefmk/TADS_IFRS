import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { CartContext } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import Header from '../../components/Header';
import { formatCurrency } from '../../utils/formatCurrency';
import styles from './styles';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, clearCart, getTotalPrice } = useContext(CartContext);
  
  const handleCheckout = () => {
    Alert.alert(
      "Finalizar Compra", 
      "Você deseja finalizar sua compra?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Sim", 
          onPress: () => {
            // Passa true para indicar que deve atualizar o estoque
            clearCart(true);
            Alert.alert(
              "Compra Realizada", 
              "Sua compra foi finalizada com sucesso!",
              [{ text: "OK", onPress: () => navigation.navigate('Products') }]
            );
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Carrinho" />
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartItem 
                item={item} 
                onRemove={(id) => removeFromCart(id)} 
              />
            )}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>{formatCurrency(getTotalPrice())}</Text>
            </View>
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.continueShoppingButton}
              onPress={() => navigation.navigate('Products')}
            >
              <Text style={styles.continueShoppingText}>Continuar Comprando</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
          <TouchableOpacity 
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.continueShoppingText}>Continuar Comprando</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;