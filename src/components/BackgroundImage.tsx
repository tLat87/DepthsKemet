import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

interface BackgroundImageProps {
  children: React.ReactNode;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/img/e6e42ba8602a7b00127009ae9965a4055020977f.png')} 
        style={styles.backgroundImage} 
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default BackgroundImage;
