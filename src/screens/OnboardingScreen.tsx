import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { useAppNavigation } from '../hooks/useNavigation';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  
  // Анимации для капибары
  const bodyAnim = useRef(new Animated.Value(0)).current;
  const legAnim = useRef(new Animated.Value(0)).current;
  const leg2Anim = useRef(new Animated.Value(0)).current;
  const loaderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Анимация появления
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Анимации капибары
    const bodyAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bodyAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bodyAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    const legAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(legAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(legAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    const leg2Animation = Animated.loop(
      Animated.sequence([
        Animated.timing(leg2Anim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(leg2Anim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    const loaderAnimation = Animated.loop(
      Animated.timing(loaderAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    );

    bodyAnimation.start();
    legAnimation.start();
    leg2Animation.start();
    loaderAnimation.start();

    // Автоматический переход через 3 секунды на первый экран онбординга
    const timer = setTimeout(() => {
      navigation.navigate('OnboardingStep1');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Интерполяция для анимаций
  const bodyTranslateX = bodyAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

  const legRotate = legAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-45deg', '45deg'],
  });

  const leg2Rotate = leg2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '-45deg'],
  });

  const loaderTranslateX = loaderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -350],
  });

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <View style={styles.capybaraloader}>
          <View style={styles.capybara}>
            <Animated.View 
              style={[
                styles.capyhead,
                {
                  transform: [{ translateX: bodyTranslateX }]
                }
              ]}
            >
              <View style={styles.capyear}>
                <View style={styles.capyear2} />
              </View>
              <View style={[styles.capyear, styles.capyearSecond]} />
              <View style={styles.capymouth}>
                <View style={styles.capylips} />
                <View style={styles.capylips} />
              </View>
              <View style={styles.capyeye} />
              <View style={[styles.capyeye, styles.capyeyeSecond]} />
            </Animated.View>
            <Animated.View 
              style={[
                styles.capyleg,
                {
                  transform: [{ translateX: bodyTranslateX }]
                }
              ]}
            />
            <Animated.View 
              style={[
                styles.capyleg2,
                {
                  transform: [{ rotate: legRotate }]
                }
              ]}
            />
            <Animated.View 
              style={[
                styles.capyleg2,
                styles.capyleg2Second,
                {
                  transform: [{ rotate: leg2Rotate }]
                }
              ]}
            />
            <Animated.View 
              style={[
                styles.capy,
                {
                  transform: [{ translateX: bodyTranslateX }]
                }
              ]}
            />
          </View>
          <View style={styles.loader}>
            <Animated.View 
              style={[
                styles.loaderline,
                {
                  transform: [{ translateX: loaderTranslateX }]
                }
              ]}
            />
          </View>
        </View>
        
        {/* <View style={styles.textContainer}>
          <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
            DEPTHS OF KEMET
          </Animated.Text>
          <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
            Ancient mysteries await...
          </Animated.Text>
        </View> */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontFamily: 'Macondo-Regular',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#D2B48C',
    textAlign: 'center',
    fontFamily: 'Macondo-Regular',
  },
  // Capybara styles
  capybaraloader: {
    width: 140,
    height: 100,
    position: 'relative',
    zIndex: 1,
  },
  capybara: {
    width: '100%',
    height: 75,
    position: 'relative',
    zIndex: 1,
  },
  loader: {
    width: '100%',
    height: 25,
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
  },
  capy: {
    width: '85%',
    height: '100%',
    backgroundColor: '#CC7D2D',
    borderRadius: 45,
    position: 'absolute',
    zIndex: 1,
  },
  capyhead: {
    width: 75,
    height: 70,
    bottom: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: '#CC7D2D',
    zIndex: 3,
    borderRadius: 35,
    shadowColor: '#533C1C',
    shadowOffset: { width: -10, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  capyear: {
    width: 20,
    height: 20,
    backgroundColor: '#CC7D2D',
    top: 0,
    left: 0,
    borderRadius: 10,
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 3,
  },
  capyearSecond: {
    left: 50,
  },
  capyear2: {
    width: '100%',
    height: 10,
    backgroundColor: '#533C1C',
    bottom: 0,
    left: 5,
    borderRadius: 5,
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
  },
  capymouth: {
    width: 35,
    height: 20,
    backgroundColor: '#533C1C',
    position: 'absolute',
    bottom: 0,
    left: 25,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },
  capylips: {
    width: 2.5,
    height: 7.5,
    borderRadius: 5,
    backgroundColor: '#CC7D2D',
  },
  capyeye: {
    width: 20,
    height: 5,
    backgroundColor: '#533C1C',
    position: 'absolute',
    bottom: 35,
    left: 15,
    borderRadius: 25,
    transform: [{ rotate: '45deg' }],
  },
  capyeyeSecond: {
    transform: [{ rotate: '-45deg' }],
    left: 55,
    width: 17.5,
  },
  capyleg: {
    width: 60,
    height: 50,
    bottom: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: '#CC7D2D',
    zIndex: 2,
    borderRadius: 20,
  },
  capyleg2: {
    width: 17.5,
    height: 30,
    bottom: 0,
    left: 32.5,
    position: 'absolute',
    backgroundColor: '#CC7D2D',
    zIndex: 2,
    borderRadius: 7.5,
  },
  capyleg2Second: {
    width: 12.5,
    left: 5,
    height: 20,
  },
  loaderline: {
    width: 500,
    height: 5,
    borderTopWidth: 5,
    borderTopColor: '#533C1C',
    borderStyle: 'dashed',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default OnboardingScreen;
