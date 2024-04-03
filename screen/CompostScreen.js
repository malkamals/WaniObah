import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Linking,
  FlatList,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import menuItems from '../src/menuItems';
import {addOrderToHistory} from '../src/orderHistoryManager';
import HistoryScreen from './HistoryScreen';
import berita from '../src/berita';
import berita1 from '../assets/berita1.jpeg';
import berita2 from '../assets/berita2.jpeg';
import berita3 from '../assets/berita3.jpeg';
import compostItems from '../src/compostItems';
import compost1 from '../assets/compost1.jpg';
import compost2 from '../assets/compost2.jpg';
import compost3 from '../assets/compost3.jpg';
const dominantColor = '#800080';
const CompostScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [locationIcon, setLocationIcon] = useState('map-marker');
  const [filterType, setFilterType] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const isFilterActive = filterType !== 'all';
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const showRatingModal = () => {
    setIsRatingVisible(true);
  };

  const hideRatingModal = () => {
    setIsRatingVisible(false);
  };
  const navigateTo = screen => {
    navigation.navigate(screen);
  };
  const addToCart = food => {
    // Check if the item is already in the cart
    const existingItem = selectedItems.find(item => item.title === food.title);

    if (existingItem) {
      // Check if the quantity in the cart doesn't exceed the available quantity
      if (existingItem.quantity + 1 <= existingItem.left) {
        // Update the quantity of the existing item
        const updatedItems = selectedItems.map(item =>
          item.title === existingItem.title
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
        setSelectedItems([...updatedItems, {...food, quantity: 1}]);
      } else {
        // Show an alert or handle the case where the quantity exceeds the available quantity
        alert(
          `Sorry, you can't order more than ${existingItem.left} ${existingItem.title}(s).`,
        );
      }
    } else {
      // Add the item to the cart with quantity 1
      setSelectedItems([...selectedItems, {...food, quantity: 1}]);
    }
  };
  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const removeFromCart = index => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0);
  };

  const generateWhatsAppMessage = selectedItems => {
    const uniqueItems = Array.from(
      new Set(selectedItems.map(item => item.title)),
    );

    const itemMessages = uniqueItems.map(
      title => `${title} x ${countItems()[title]}`,
    );

    return `Hello, I would like to place an order:\n${itemMessages.join('\n')}`;
  };
  const countItems = () => {
    const itemCounts = {};

    selectedItems.forEach(item => {
      if (item.title in itemCounts) {
        itemCounts[item.title] += 1;
      } else {
        itemCounts[item.title] = 1;
      }
    });

    return itemCounts;
  };

  const handleFilterPress = () => {
    if (filterType === 'all') {
      setFilterType('food');
    } else if (filterType === 'food') {
      setFilterType('beverage');
    } else {
      setFilterType('all');
    }
  };

  const getFilterButtonText = () => {
    if (filterType === 'all') {
      return 'All';
    } else if (filterType === 'food') {
      return 'Food';
    } else {
      return 'Beverage';
    }
  };

  const filteredFoodItems = menuItems.filter(food => {
    if (filterType === 'all') {
      return true;
    } else {
      return food.type === filterType;
    }
  });
  const handleRatingSubmit = () => {
    // Handle the rating submission logic here
    // After that, hide the modal and perform other actions
    hideRatingModal();
    // ... (perform actions after rating submission)
    // Calculate total price
    const totalPrice = calculateTotalPrice().toFixed(2);

    // Get item counts
    const itemCounts = countItems();

    // Get item names
    const itemNames = Object.keys(itemCounts);

    // Create a timestamp
    const timestamp = new Date().toISOString();

    // Add the current order to the order history
    const newOrder = {
      orderItems: selectedItems,
      totalPrice,
      itemCounts,
      itemNames,
      timestamp,
    };
    addOrderToHistory(newOrder);
    navigation.navigate('History', {newOrder});
    clearCart();
  };
  const clearCart = () => {
    setSelectedItems([]);
  };
  const handleWhatsAppCheckout = async () => {
    const whatsappMessage = generateWhatsAppMessage(selectedItems);

    // Check if WhatsApp is installed

    showRatingModal();
    Linking.openURL(
      `whatsapp://send?phone=+62816-263-012&text=${whatsappMessage}`,
    );
  };
  const insertNewlineEvery3Words = text => {
    const words = text.split(' ');
    const result = words.reduce((acc, word, index) => {
      return acc + word + (index % 3 === 2 ? '\n' : ' ');
    }, '');

    return result.trim(); // To remove trailing space
  };
  const insertNewlineEvery5Words = text => {
    const words = text.split(' ');
    const result = words.reduce((acc, word, index) => {
      return acc + word + (index % 5 === 2 ? '\n' : ' ');
    }, '');

    return result.trim(); // To remove trailing space
  };
  const renderStars = () => {
    const stars = [];
    const maxStars = 5;

    for (let i = 1; i <= maxStars; i++) {
      const starColor = i <= selectedRating ? dominantColor : '#ccc';

      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setSelectedRating(i)}
          activeOpacity={0.7}>
          <Icon name="star" size={30} color={starColor} />
        </TouchableOpacity>,
      );
    }

    return stars;
  };
  const formatPrice = price => {
    // Convert price to a number if it's not already
    const numericPrice = parseFloat(price);

    // Check if the price is a valid number
    if (!isNaN(numericPrice)) {
      // Use toLocaleString to add commas for thousands separator
      const formattedPrice = numericPrice.toLocaleString();

      // Split the price by commas
      const parts = formattedPrice.split('.');

      // Join the parts with dots every three characters
      const finalPrice =
        parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
        (parts[1] ? `.${parts[1]}` : '');

      return `Rp.${finalPrice}`;
    } else {
      return 'Invalid Price';
    }
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Text style={styles.heading}>Kandhang Kompos</Text>

          {/* <View style={styles.logoAndTextContainer}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.featuredImageLogo}
            />
            <Text style={styles.haiAdminText}>Hi, Admin</Text>
          </View> */}

          {/* Checkout Card */}
          <View style={styles.checkoutCard}>
            <View style={styles.checkoutHeader}>
              <Text style={styles.checkoutTitle}>Checkout</Text>
              <TouchableOpacity onPress={clearCart}>
                <Icon
                  name="trash"
                  size={20}
                  color="#fff"
                  style={{
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: dominantColor,
                  }}
                />
              </TouchableOpacity>
            </View>
            {Object.keys(countItems()).map((title, index) => (
              <View key={index} style={styles.checkoutItem}>
                <Text style={{color: '#000'}}>{`${title}: ${
                  countItems()[title]
                }`}</Text>
                <TouchableOpacity onPress={() => removeFromCart(title)}>
                  <Icon name="trash" size={20} color="#333" />
                </TouchableOpacity>
              </View>
            ))}
            {/* <Text style={styles.totalPrice}>
              Total Price: Rp. {calculateTotalPrice()}
            </Text> */}
            {selectedItems.length > 0 && (
              <TouchableOpacity
                style={[
                  styles.checkoutButton,
                  {backgroundColor: dominantColor},
                ]}
                onPress={handleWhatsAppCheckout}>
                <Text style={styles.checkoutButtonText}>
                  Checkout di WhatsApp
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* <View style={styles.locationContainer}>
            <Text style={styles.nearbyText}>Makanan disekitarmu </Text>
            <Icon
              name={locationIcon}
              size={20}
              color="#333"
              style={styles.locationIcon}
            />
          </View> */}
          {/* <View style={styles.filterContainer}>
            <TouchableOpacity onPress={() => handleFilterPress()}>
              <Text style={styles.filterButton}>{getFilterButtonText()}</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.swiperContainerBerita}>
            <FlatList
              data={berita}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardContainer}
              renderItem={({item}) => {
                const imagePath = `../assets/${item.id}.jpeg`;
                console.log('Image Path:', imagePath);
                const images = {
                  berita1: berita1,
                  berita2: berita2,
                  berita3: berita3,
                };
                return (
                  <View style={styles.card}>
                    <Image
                      source={images[item.id.replace(/\s+/g, '').toLowerCase()]}
                      style={styles.featuredImageBerita}
                    />
                    <Text style={styles.featuredText}>
                      {insertNewlineEvery3Words(item.title)}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.nearbyText}>Beli Kompos di sekitarmu </Text>
            <Icon
              name={locationIcon}
              size={20}
              color="#333"
              style={styles.locationIcon}
            />
          </View>
          <View style={styles.logoAndTextContainer2}>
            <TextInput
              style={styles.searchInput}
              placeholder="Mau selamatkan Makanan apa hari ini?"
              placeholderTextColor="#707070"
              value={searchText}
              onChangeText={text => setSearchText(text)}
            />
          </View>
          <View style={styles.swiperContainer}>
            <FlatList
              data={compostItems}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardContainer}
              renderItem={({item}) => {
                const imagePath = `../assets/${item.title}.png`;
                console.log('Image Path:', imagePath);
                const images = {
                  compost1: compost1,
                  compost2: compost2,
                  compost3: compost3,
                };
                return (
                  <View style={styles.card}>
                    <Image
                      source={images[item.id.replace(/\s+/g, '').toLowerCase()]}
                      style={styles.featuredImage}
                    />
                    <Text style={styles.featuredText}>{item.title}</Text>
                    {/* <Text style={styles.featuredTextDesc}>
                      {insertNewlineEvery5Words(item.description)}
                    </Text> */}
                    <Text style={styles.featuredTextYellow}>
                      {formatPrice(item.price)} / Kg
                    </Text>
                    <Text style={styles.featuredText}>
                      Tersedia: {item.left}
                    </Text>
                    <Text style={styles.featuredTextStar}>
                      <Icon name="star" size={20} color="yellow" />
                      {item.star}
                    </Text>
                    <TouchableOpacity
                      style={styles.featuredButton}
                      onPress={() => addToCart(item)}>
                      <Text style={styles.featuredButtonText}>
                        Order Sekarang
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      {/* Footer Menu */}
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
      <Modal visible={isRatingVisible} animationType="slide" transparent={true}>
        <View style={styles.ratingModal}>
          <Text style={styles.ratingModalTitle}>Beri Rating</Text>
          <View style={styles.starsContainer}>{renderStars()}</View>
          <TouchableOpacity
            style={styles.ratingModalButton}
            onPress={handleRatingSubmit}>
            <Text style={styles.ratingModalButtonText}>Submit Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ratingModalButton}
            onPress={hideRatingModal}>
            <Text style={styles.ratingModalButtonText}>Batal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: '900',
    color: '#800080',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between', // Push content to the top and footer to the bottom
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '150%',
    color: '#000',
  },
  featuredTextYellow: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
    color: '#ebd142',
  },
  wrapper: {
    height: 300,
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
  },
  featuredImageBerita: {
    width: 100,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  featuredText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#000',
  },
  featuredTextStar: {
    textAlign: 'right',
    color: '#000',
  },
  featuredTextDesc: {
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 5,
    textAlign: 'center',
    color: '#000',
  },
  featuredButton: {
    backgroundColor: dominantColor,
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  featuredButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
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
  checkoutCard: {
    position: 'relative',
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
    alignSelf: 'center',
    zIndex: 1, // Tambahkan ini
  },

  checkoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: dominantColor,
  },
  checkoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    color: '#000',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  checkoutButton: {
    backgroundColor: dominantColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  featuredImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 50,
  },
  featuredImageLogo: {
    width: 60,
    height: 55,
    borderRadius: 10,
  },
  logoAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoAndTextContainer2: {
    marginTop: 10,
    alignItems: 'center',
  },
  haiAdminText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center', // Align the text vertically in the center
    color: dominantColor,
  },

  cardContainer: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
  },
  swiperContainer: {
    left: 0,
    right: 0,
    marginTop: 20,
    marginBottom: 20,
    height: 450, // Adjust this value as needed
  },
  swiperContainerBerita: {
    left: 0,
    right: 0,
    marginTop: 20,
    marginBottom: 20,
    height: 130, // Adjust this value as needed
  },
  nearbyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
    textAlign: 'left',
    alignSelf: 'flex-start', // Align the text to the start (left)
    color: dominantColor,
  },
  locationContainer: {
    flexDirection: 'row',
    textAlign: 'left',
    alignSelf: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  locationIcon: {
    color: dominantColor,
  },
  checkoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 'auto',
    textAlign: 'center',
    alignSelf: 'center', // Align the text to the center vertically
    color: '#fff',
    backgroundColor: dominantColor,
    padding: 6,
    borderRadius: 6,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  ratingModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ratingModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  ratingModalButton: {
    backgroundColor: dominantColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  ratingModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CompostScreen;
