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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#654321',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#D2B48C',
    minWidth: 280,
  },
  gameOverText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF4500',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Macondo-Regular',
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#D2B48C',
    marginBottom: 5,
    fontFamily: 'Macondo-Regular',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4500',
    fontFamily: 'Macondo-Regular',
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Macondo-Regular',
  }
});

export default GameOverModal;
