import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../../context/CartContext';
import styles from './styles';

const Header = ({ title }) => {
  const navigation = useNavigation();
  const { getTotalItems } = useContext(CartContext);
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>{title || 'Renner'}</Text>
      </View>
      <TouchableOpacity 
        style={styles.cartButton} 
        onPress={() => navigation.navigate('Cart')}
      >
        {/* Poderia ser um ícone específico para o carrinho */}
        <Image 
          source={require('../../../assets/images/logo.png')} 
          style={styles.cartIcon} 
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{getTotalItems()}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;