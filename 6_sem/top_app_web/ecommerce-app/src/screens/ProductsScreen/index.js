import React from 'react';
import { View, FlatList, StatusBar, SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import styles from './styles';
import productsData from '../../data/products';

const ProductsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#E60014" barStyle="light-content" />
      <Header title="Renner" />
      <FlatList
        data={productsData}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productListContent}
        style={styles.productList}
        showsVerticalScrollIndicator={true}
        initialNumToRender={4}
        maxToRenderPerBatch={8}
        windowSize={5}
      />
    </SafeAreaView>
  );
};

export default ProductsScreen;