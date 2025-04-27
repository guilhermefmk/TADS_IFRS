import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { formatCurrency } from '../../utils/formatCurrency';
import styles from './styles';

const CartItem = ({ item, onRemove }) => {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{formatCurrency(item.price)}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
          <Text style={styles.subtotal}>
            Subtotal: {formatCurrency(item.price * item.quantity)}
          </Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.removeButton} 
        onPress={() => onRemove(item.id)}
      >
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;