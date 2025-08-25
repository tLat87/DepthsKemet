import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useAppNavigation } from '../hooks/useNavigation';
import GameHeader from '../components/GameHeader';
import GameArea from '../components/GameArea';
import GameOverModal from '../components/GameOverModal';
import BackgroundImage from '../components/BackgroundImage';

const GameScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const { isGameOver } = useSelector((state: RootState) => state.game);

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleHome = () => {
    navigation.navigate('MainMenu');
  };

  const handleRestart = () => {
    // Здесь будет логика перезапуска игры
    navigation.navigate('Game');
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <GameHeader onSettings={handleSettings} onHome={handleHome} />
        <GameArea />
        <GameOverModal
          visible={isGameOver}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GameScreen;
