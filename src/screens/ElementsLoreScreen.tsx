import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, Image } from 'react-native';
import { ELEMENT_LORE } from '../data/elements';
import { ElementLore } from '../types/game';
import { useAppNavigation } from '../hooks/useNavigation';
import BackgroundImage from '../components/BackgroundImage';
import AnimatedButton from '../components/AnimatedButton';

const ElementsLoreScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [selectedElement, setSelectedElement] = useState<ElementLore | null>(null);

  // Анимации для элементов
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Последовательная анимация появления элементов
    Animated.sequence([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
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

  const handleElementPress = (element: ElementLore) => {
    setSelectedElement(element);
  };

  const handleBackToList = () => {
    setSelectedElement(null);
  };

  const handleBack = () => {
    navigation.navigate('MainMenu');
  };

  if (selectedElement) {
    return (
      <BackgroundImage>
        <View style={styles.container}>
          <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
            <Image source={require('../assets/img/c44237fda79adcba131a0f2a3928e6eb0945e9cd.png')} style={{width: 200, height: 200}} />

          </Animated.View>
          
          <Animated.View style={[styles.loreCard, { opacity: contentOpacity }]}>
            <Text style={styles.elementName}>{selectedElement.name}</Text>
            <Text style={styles.elementDescription}>{selectedElement.description}</Text>
          </Animated.View>
          
          <Animated.View style={{ opacity: buttonOpacity }}>
            <AnimatedButton
              title="Back to elements"
              onPress={handleBackToList}
              style={styles.backButton}
            />
            
            <AnimatedButton
              title="Back home"
              onPress={handleBack}
              variant="secondary"
              style={styles.homeButton}
            />
          </Animated.View>
        </View>
      </BackgroundImage>
    );
  }

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
            <Image source={require('../assets/img/c44237fda79adcba131a0f2a3928e6eb0945e9cd.png')} style={{width: 200, height: 200}} />

        </Animated.View>
        
        <Animated.ScrollView 
          style={[styles.content, { opacity: contentOpacity }]} 
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.screenTitle}>Elements</Text>
          {ELEMENT_LORE.map((element, index) => (
            <Animated.View 
              key={element.type} 
              style={[
                styles.elementCard,
                { 
                  opacity: contentOpacity,
                  transform: [{ 
                    translateY: contentOpacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    })
                  }]
                }
              ]}
            >
              <View style={styles.elementInfo}>
                <Image source={element.image} style={{width: 100, height: 100}} />
                <Text style={styles.elementName}>{element.name}</Text>
              </View>
              <TouchableOpacity 
                style={styles.readButton} 
                onPress={() => handleElementPress(element)}
              >
                <Text style={styles.readButtonText}>Read</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
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
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'Macondo-Regular',
  },
  elementCard: {
    backgroundColor: '#654321',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#D2B48C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  elementInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  elementEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  elementName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    fontFamily: 'Macondo-Regular',
  },
  readButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D2B48C',
  },
  readButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Macondo-Regular',
  },
  loreCard: {
    backgroundColor: '#654321',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    borderWidth: 2,
    borderColor: '#D2B48C',
    flex: 1,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  elementDescription: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Macondo-Regular',
  },
  backButton: {
    margin: 20,
  },
  homeButton: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default ElementsLoreScreen;
