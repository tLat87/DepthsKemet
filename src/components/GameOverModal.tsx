import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useVibration } from '../hooks/useVibration';

interface GameOverModalProps {
  visible: boolean;
  onRestart: () => void;
  onHome: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ visible, onRestart, onHome }) => {
  const { score, bestScore } = useSelector((state: RootState) => state.game);
  const { vibrateShort } = useVibration();

  const handleRestart = () => {
    vibrateShort();
    onRestart();
  };

  const handleHome = () => {
    vibrateShort();
    onHome();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.gameOverText}>You lost</Text>
          
          <View style={styles.scoreSection}>
            <Text style={styles.scoreLabel}>Your score</Text>
            <Text style={styles.scoreValue}>{score.toString().padStart(4, '0')}</Text>
          </View>
          
          <View style={styles.scoreSection}>
            <Text style={styles.scoreLabel}>Best score</Text>
            <Text style={styles.scoreValue}>{bestScore.toString().padStart(4, '0')}</Text>
          </View>
          
          <TouchableOpacity style={styles.button} onPress={handleRestart}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={handleHome}>
            <Text style={styles.buttonText}>Back home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#3498DB',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#2980B9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    minWidth: 280,
  },
  gameOverText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Macondo-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  scoreLabel: {
    fontSize: 16,
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
  button: {
    backgroundColor: '#E74C3C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#C0392B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginTop: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Macondo-Regular',
  },
});

export default GameOverModal;
