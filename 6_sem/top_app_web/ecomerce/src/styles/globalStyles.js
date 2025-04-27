import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', // Fundo cinza claro, semelhante ao site da Renner
  },
  button: { 
    backgroundColor: '#D71920', // Vermelho Renner
    padding: 10, 
    borderRadius: 5,
  },
  buttonText: { 
    color: '#fff', // Texto branco nos botões
    fontWeight: 'bold', 
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#D71920', // Cabeçalho vermelho
    padding: 15,
  },
  headerText: {
    color: '#fff', // Texto branco no cabeçalho
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: '#fff', // Fundo branco para os cartões de produto
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    elevation: 2, // Sombra para destacar os cartões
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Texto cinza escuro
  },
  productPrice: {
    fontSize: 14,
    color: '#D71920', // Preço em vermelho
    fontWeight: 'bold',
  },
});