import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useVibration } from '../hooks/useVibration';

interface GameHeaderProps {
  onSettings: () => void;
  onHome: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ onSettings, onHome }) => {
  const { score, bestScore } = useSelector((state: RootState) => state.game);
  const { vibrateShort } = useVibration();

  const handleSettings = () => {
    vibrateShort();
    onSettings();
  };

  const handleHome = () => {
    vibrateShort();
    onHome();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton} onPress={handleHome}>
      <Image source={require('../assets/img/Frame61.png')}  />

      </TouchableOpacity>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Score</Text>
        <Text style={styles.scoreValue}>{score.toString().padStart(4, '0')}</Text>
      </View>
      
      <TouchableOpacity style={styles.headerButton} onPress={handleSettings}>
      <Image source={require('../assets/img/Frame60.png')}  />

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 40,
    // backgroundColor: '#654321',
    borderBottomWidth: 2,
    borderBottomColor: '#8B4513',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D2B48C',
  },
  headerButtonText: {
    fontSize: 20,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#D2B48C',
    fontWeight: 'bold',
    fontFamily: 'Macondo-Regular',
  },
  scoreValue: {
    fontSize: 24,
    color: '#FF4500',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'Macondo-Regular',
  }
});

export default GameHeader;
