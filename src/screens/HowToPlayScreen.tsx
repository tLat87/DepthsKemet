import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Image } from 'react-native';
import { useAppNavigation } from '../hooks/useNavigation';
import BackgroundImage from '../components/BackgroundImage';
import AnimatedButton from '../components/AnimatedButton';

const HowToPlayScreen: React.FC = () => {
  const navigation = useAppNavigation();

  // Анимации для элементов
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const cardsOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Последовательная анимация появления элементов
    Animated.sequence([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(cardsOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBack = () => {
    navigation.navigate('MainMenu');
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Image source={require('../assets/img/c44237fda79adcba131a0f2a3928e6eb0945e9cd.png')} style={{width: 200, height: 200}} />
    
        </Animated.View>
        
        <Animated.ScrollView 
          style={[styles.content, { opacity: cardsOpacity }]} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Welcome to the Depths of Kemet</Text>
            <Text style={styles.cardText}>
              Merge ancient relics and descend into the secrets of lost dynasties.
            </Text>
          </View>
          
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Drop. Merge. Ascend.</Text>
            <Text style={styles.cardText}>
              • Tap the drop zone to create new elements{'\n'}
              • Two matching relics combine into one of a higher level{'\n'}
              • Don't let the stack reach the top
            </Text>
          </View>
          
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Earn Points. Unlock Legends.</Text>
            <Text style={styles.cardText}>
              Each merge gives points:{'\n'}
              • Level 1: 2 points{'\n'}
              • Level 2: 4 points{'\n'}
              • Level 3: 8 points{'\n'}
              • Level 4: 16 points{'\n'}
              • Level 5: 32 points
            </Text>
          </View>
        </Animated.ScrollView>
        
        <Animated.View style={{ opacity: buttonOpacity }}>
          <AnimatedButton
            title="Back home"
            onPress={handleBack}
            style={styles.backButton}
          />
        </Animated.View>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  anubisLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#654321',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#D2B48C',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  anubisSymbol: {
    fontSize: 40,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'Macondo-Regular',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: '#654321',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#D2B48C',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Macondo-Regular',
  },
  cardText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    fontFamily: 'Macondo-Regular',
  },
  backButton: {
    margin: 20,
  },
});

export default HowToPlayScreen;
