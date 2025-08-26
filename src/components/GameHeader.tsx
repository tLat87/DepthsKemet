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
        <Image source={require('../assets/img/Frame61.png')} />
      </TouchableOpacity>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Score</Text>
        <Text style={styles.scoreValue}>{score.toString().padStart(4, '0')}</Text>
      </View>
      
      <TouchableOpacity style={styles.headerButton} onPress={handleSettings}>
        <Image source={require('../assets/img/Frame60.png')} />
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
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    borderBottomWidth: 2,
    borderBottomColor: '#2980B9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#C0392B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
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
});

export default GameHeader;
