import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    margin: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flex: 1, // Para garantir que os cards tenham a mesma largura
    maxWidth: '47%', // Para 2 cards por linha com margens
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#E60014', // Cor vermelha da Renner
    marginTop: 4,
    fontWeight: 'bold',
  },
  stock: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  outOfStock: {
    fontSize: 12,
    color: '#E60014',
    marginTop: 4,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#E60014', // Cor vermelha da Renner
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
});

export default styles;