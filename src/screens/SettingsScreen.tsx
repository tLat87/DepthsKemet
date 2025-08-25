import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Share, Vibration, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { toggleSound, toggleVibration } from '../store/settingsSlice';
import { useAppNavigation } from '../hooks/useNavigation';
import BackgroundImage from '../components/BackgroundImage';
import AnimatedButton from '../components/AnimatedButton';

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useAppNavigation();
  const { soundEnabled, vibrationEnabled } = useSelector((state: RootState) => state.settings);

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

  const handleSoundToggle = () => {
    if (vibrationEnabled) {
      Vibration.vibrate(50);
    }
    dispatch(toggleSound());
  };

  const handleVibrationToggle = () => {
    if (vibrationEnabled) {
      Vibration.vibrate(50);
    }
    dispatch(toggleVibration());
  };

  const handleShare = async () => {
    if (vibrationEnabled) {
      Vibration.vibrate(50);
    }
    
    try {
      await Share.share({
        message: 'Check out this awesome game - Depths of Kemet! 🐺✨',
        title: 'Depths of Kemet',
        url: 'https://example.com/depthskemet', // Замените на реальную ссылку
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleBack = () => {
    if (vibrationEnabled) {
      Vibration.vibrate(50);
    }
    navigation.navigate('MainMenu');
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Image source={require('../assets/img/c44237fda79adcba131a0f2a3928e6eb0945e9cd.png')} style={{width: 200, height: 200}} />

        </Animated.View>
        
        <Animated.View style={[styles.content, { opacity: contentOpacity }]}>
          <View style={styles.settingsCard}>
            <Text style={styles.cardTitle}>Settings</Text>
            
           
            <View style={styles.settingRow}>
              <Animated.View 
                style={[
                  styles.settingButton, 
                  vibrationEnabled && styles.settingButtonActive,
                  { 
                    transform: [{ 
                      scale: contentOpacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      })
                    }]
                  }
                ]} 
              >
                <TouchableOpacity onPress={handleVibrationToggle}>
                  <Text style={styles.settingIcon}>📱</Text>
                </TouchableOpacity>
              </Animated.View>
              <Text style={styles.settingLabel}>Vibration</Text>
            </View>
            
            <View style={styles.settingRow}>
              <Animated.View 
                style={[
                  styles.settingButton,
                  { 
                    transform: [{ 
                      scale: contentOpacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      })
                    }]
                  }
                ]}
              >
                <TouchableOpacity onPress={handleShare}>
                  <Text style={styles.settingIcon}>📤</Text>
                </TouchableOpacity>
              </Animated.View>
              <Text style={styles.settingLabel}>Share</Text>
            </View>
          </View>
        </Animated.View>
        
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
    justifyContent: 'center',
  },
  settingsCard: {
    backgroundColor: '#654321',
    borderRadius: 15,
    padding: 30,
    borderWidth: 2,
    borderColor: '#D2B48C',
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
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Macondo-Regular',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    width: '100%',
    justifyContent: 'space-between',
  },
  settingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D2B48C',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingButtonActive: {
    backgroundColor: '#FF8C00',
    borderColor: '#FFD700',
  },
  settingIcon: {
    fontSize: 24,
  },
  settingLabel: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 20,
    fontFamily: 'Macondo-Regular',
  },
  backButton: {
    margin: 20,
  },
});

export default SettingsScreen;
