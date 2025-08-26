import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useAppNavigation } from '../hooks/useNavigation';
import BackgroundImage from '../components/BackgroundImage';
import AnimatedButton from '../components/AnimatedButton';

const MainMenuScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const { bestScore } = useSelector((state: RootState) => state.game);

  // Анимации для элементов
  const logoScale = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const scoreOpacity = useRef(new Animated.Value(0)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Последовательная анимация появления элементов
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scoreOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(buttonsOpacity, {
        toValue: 1,
        duration: 400,
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

    setTimeout(pulseAnimation, 2000);
  }, []);

  const handleStartGame = () => {
    navigation.navigate('Game');
  };

  const handleHowToPlay = () => {
    navigation.navigate('HowToPlay');
  };

  const handleElementsLore = () => {
    navigation.navigate('ElementsLore');
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
          <Image source={require('../assets/img/c44237fda79adcba131a0f2a3928e6eb0945e9cd.png')} style={{width: 200, height: 200}} />
        </Animated.View>
        
        <Animated.View style={[styles.scoreContainer, { opacity: scoreOpacity }]}>
          <Text style={styles.scoreLabel}>Best score:</Text>
          <Text style={styles.scoreValue}>{bestScore.toString().padStart(4, '0')}</Text>
        </Animated.View>
        
        <Animated.View style={[styles.buttonContainer, { opacity: buttonsOpacity }]}>
          <AnimatedButton
            title="Start game"
            onPress={handleStartGame}
            style={styles.button}
          />
          
          <AnimatedButton
            title="How to play?"
            onPress={handleHowToPlay}
            style={styles.button}
          />
          
          <AnimatedButton
            title="Elements lore"
            onPress={handleElementsLore}
            style={styles.button}
          />
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
  scoreContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 18,
    color: '#ECF0F1',
    marginBottom: 5,
    fontWeight: 'bold',
    fontFamily: 'Macondo-Regular',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F39C12',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'Macondo-Regular',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default MainMenuScreen;
