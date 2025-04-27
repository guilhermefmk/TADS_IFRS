import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E60014',
    marginBottom: 16,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stockLabel: {
    fontSize: 16,
    color: '#666',
  },
  stockValue: {
    fontSize: 16,
    color: '#007700',
    fontWeight: 'bold',
  },
  outOfStock: {
    fontSize: 16,
    color: '#E60014',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#E60014',
    borderRadius: 5,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  // Novos estilos para o botão "Continuar comprando"
  continueShoppingButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E60014',
    borderRadius: 5,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  continueShoppingText: {
    color: '#E60014',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;