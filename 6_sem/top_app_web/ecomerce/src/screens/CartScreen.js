import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CartScreen() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {/* Logo da Renner */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Lojas_Renner_logo.svg/2560px-Lojas_Renner_logo.svg.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Lista de itens no carrinho */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
            <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
            <Button
              title="Remover"
              color="#D71920"
              onPress={() => removeFromCart(item.id)}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
        }
      />

      {/* Total e botão de finalizar compra */}
      {cart.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
          <Button
            title="Finalizar Compra"
            color="#D71920"
            onPress={() => alert('Compra finalizada!')}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 150,
    height: 50,
  },
  item: {
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 5,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  quantity: { fontSize: 14, color: '#555', marginVertical: 5 },
  price: { fontSize: 14, color: '#D71920', fontWeight: 'bold' },
  totalContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 15,
    borderRadius: 5,
    elevation: 2,
  },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
});