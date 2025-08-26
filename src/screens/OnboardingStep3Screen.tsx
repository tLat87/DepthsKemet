import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useAppNavigation } from '../hooks/useNavigation';
import BackgroundImage from '../components/BackgroundImage';
import { useVibration } from '../hooks/useVibration';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const OnboardingStep3Screen: React.FC = () => {
  const navigation = useAppNavigation();
  const { vibrateShort } = useVibration();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Анимация появления
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Анимация пульсации логотипа
    const pulseAnimation = () => {
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => pulseAnimation());
    };

    setTimeout(pulseAnimation, 1000);
  }, []);

  const handleBack = () => {
    vibrateShort();
    navigation.navigate('OnboardingStep2');
  };

  const handleStart = () => {
    vibrateShort();
    navigation.navigate('MainMenu');
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: logoScale }]
            }
          ]}
        >
          <Image source={require('../assets/img/c44237fda79adcba131a0f2a3928e6eb0945e9cd.png')} style={{width: 200, height: 200}} />

        </Animated.View>

        <Animated.View
          style={[
            styles.instructionPanel,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.panelTitle}>Earn Points. Unlock Legends.</Text>
          <Text style={styles.panelText}>
            Each merge gives points:{'\n'}
            • Level 1: 2 points{'\n'}
            • Level 2: 4 points{'\n'}
            • Level 3: 8 points{'\n'}
            • Level 4: 16 points{'\n'}
            • Level 5: 32 points
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  anubisLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#2980B9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  anubisSymbol: {
    fontSize: 60,
  },
  gameTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F39C12',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontFamily: 'Macondo-Regular',
  },
  instructionPanel: {
    backgroundColor: '#3498DB',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 20,
    borderWidth: 3,
    borderColor: '#2980B9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  panelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E74C3C',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Macondo-Regular',
  },
  panelText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: 'Macondo-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: '#9B59B6',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#8E44AD',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  startButton: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#229954',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Macondo-Regular',
  },
});

export default OnboardingStep3Screen;
