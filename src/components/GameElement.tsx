import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameElement } from '../types/game';
import { ELEMENT_LORE } from '../data/elements';

interface GameElementProps {
  element: GameElement;
}

const GameElementComponent: React.FC<GameElementProps> = ({ element }) => {
  const lore = ELEMENT_LORE.find(l => l.type === element.type);
  
  if (!lore) return null;

  return (
    <View style={styles.element}>
      <Text style={styles.elementText}>{lore.image}</Text>
      <Text style={styles.levelText}>{element.level}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  element: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 2,
    borderColor: '#4A90E2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  elementText: {
    fontSize: 24,
    color: '#2C3E50',
    textShadowColor: 'rgba(255, 255, 255, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontFamily: 'Macondo-Regular',
  },
  levelText: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    fontSize: 12,
    color: '#E74C3C',
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 255, 255, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontFamily: 'Macondo-Regular',
  },
});

export default GameElementComponent;
