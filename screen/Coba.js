// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';

const Coba = () => {
  return (
    <View>
      <Text>Makanan disekitarmu </Text>
      <Icon name="rocket" size={30} color="#900" />
    </View>
  );
};

export default Coba;
