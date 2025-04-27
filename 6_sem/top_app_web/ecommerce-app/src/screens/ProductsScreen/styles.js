import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productList: {
    flex: 1,
    paddingHorizontal: 8,
  },
  productListContent: {
    paddingTop: 8,
    paddingBottom: 20, // Espaço extra no final para permitir rolagem completa
  },
  productCard: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;