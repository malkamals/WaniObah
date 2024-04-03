// HistoryScreen.js

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {getOrderHistory} from '../src/orderHistoryManager';
import Icon from 'react-native-vector-icons/FontAwesome';
const dominantColor = '#800080';

const HistoryScreen = ({navigation}) => {
  const orderHistory = getOrderHistory();
  const navigateTo = screen => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riwayat Order</Text>
      <FlatList
        data={orderHistory}
        style={{padding: 16}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.orderContainer}>
            <Text style={styles.orderDate}>
              Tanggal Order: {item.timestamp}
            </Text>
            {/* <Text style={styles.totalPrice}>
              Total Price: ${item.totalPrice}
            </Text> */}
            <Text style={styles.itemCounts}>
              Item:{' '}
              {JSON.stringify(item.itemCounts)
                .replace(/"/g, '')
                .replace(/{|}/g, '')}
            </Text>
            {/* {item.itemNames ? (
              <Text style={styles.itemNames}>Item Names: {item.itemNames.join(', ')}</Text>
            ) : null} */}
          </View>
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('Home')}>
          <Icon name="home" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('History')}>
          <Icon name="history" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('News')}>
          <Icon name="newspaper-o" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('Compost')}>
          <Icon name="tree" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('Account')}>
          <Icon name="user" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: dominantColor,
    marginTop: 20,
    padding: 16,
  },
  orderContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  orderDate: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  orderItem: {
    marginBottom: 8,
    color: '#000',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: dominantColor,
  },
  itemCounts: {
    fontSize: 16,
    marginTop: 8,
    color: '#000',
  },
  itemNames: {
    fontSize: 16,
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderTopWidth: 1, // Optional: Add a border at the top of the footer
    borderTopColor: '#ccc', // Optional: Border color
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default HistoryScreen;
