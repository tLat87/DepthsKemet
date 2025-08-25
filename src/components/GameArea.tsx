import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { updateScore, setGameOver } from '../store/gameSlice';
import { GameElement, ElementType } from '../types/game';
import GameElementComponent from './GameElement';
import { useVibration } from '../hooks/useVibration';

const { width: screenWidth } = Dimensions.get('window');
const GRID_SIZE = 6;
const CELL_SIZE = (screenWidth - 40) / GRID_SIZE;

const GameArea: React.FC = () => {
  const dispatch = useDispatch();
  const { score, isGameOver, isPaused } = useSelector((state: RootState) => state.game);
  const { vibrateShort, vibrateLong } = useVibration();
  
  const [grid, setGrid] = useState<(GameElement | null)[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
  );
  const [selectedElement, setSelectedElement] = useState<GameElement | null>(null);
  const [canPlace, setCanPlace] = useState(false);

  // Анимация для кнопки
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Анимация пульсации кнопки
    const pulseAnimation = () => {
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulseAnimation());
    };
    
    pulseAnimation();
  }, []);

  const createNewElement = () => {
    if (isGameOver || isPaused) return;
    
    vibrateShort();
    
    const newElement: GameElement = {
      id: Date.now().toString(),
      level: 1,
      type: ElementType.SAND_DATE_DROP,
      x: 0,
      y: 0,
      width: CELL_SIZE - 8,
      height: CELL_SIZE - 8,
      velocityY: 0,
      isFalling: false
    };
    
    setSelectedElement(newElement);
    setCanPlace(true);
  };

  const placeElement = (rowIndex: number, colIndex: number) => {
    if (!selectedElement || !canPlace) return;
    
    const newGrid = [...grid];
    const cell = newGrid[rowIndex][colIndex];
    
    if (cell && cell.level === selectedElement.level && cell.type === selectedElement.type) {
      // Объединяем элементы
      vibrateLong(); // Длинная вибрация для объединения
      
      const newLevel = Math.min(selectedElement.level + 1, 5);
      const newElement: GameElement = {
        id: Date.now().toString(),
        level: newLevel,
        type: selectedElement.type,
        x: colIndex * CELL_SIZE + 4,
        y: rowIndex * CELL_SIZE + 4,
        width: CELL_SIZE - 8,
        height: CELL_SIZE - 8,
        velocityY: 0,
        isFalling: false
      };
      
      newGrid[rowIndex][colIndex] = newElement;
      
      // Добавляем очки
      const points = Math.pow(2, newLevel);
      dispatch(updateScore(score + points));
    } else if (!cell) {
      // Просто размещаем элемент
      vibrateShort(); // Короткая вибрация для размещения
      
      const newElement: GameElement = {
        ...selectedElement,
        x: colIndex * CELL_SIZE + 4,
        y: rowIndex * CELL_SIZE + 4,
        width: CELL_SIZE - 8,
        height: CELL_SIZE - 8,
      };
      
      newGrid[rowIndex][colIndex] = newElement;
    } else {
      return;
    }
    
    setGrid(newGrid);
    setSelectedElement(null);
    setCanPlace(false);
    
    // Проверяем game over
    checkGameOver(newGrid);
  };

  const checkGameOver = (currentGrid: (GameElement | null)[][]) => {
    const hasEmptyCells = currentGrid.some(row => row.some(cell => !cell));
    
    if (!hasEmptyCells) {
      vibrateLong(); // Длинная вибрация для game over
      dispatch(setGameOver(true));
    }
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => 
      row.map((cell, colIndex) => (
        <TouchableOpacity
          key={`${rowIndex}-${colIndex}`}
          style={[
            styles.cell,
            {
              left: colIndex * CELL_SIZE,
              top: rowIndex * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: canPlace && !cell ? 'rgba(255, 215, 0, 0.3)' : 'transparent'
            }
          ]}
          onPress={() => placeElement(rowIndex, colIndex)}
          disabled={!canPlace}
        >
          {cell && <GameElementComponent element={cell} />}
        </TouchableOpacity>
      ))
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameArea}>
        <View style={styles.grid}>
          {renderGrid()}
        </View>
      </View>
      
      <View style={styles.controls}>
        <Animated.View style={[styles.createButton, { transform: [{ scale: buttonScale }] }]}>
          <TouchableOpacity 
            style={styles.buttonTouchable}
            onPress={createNewElement}
            disabled={isGameOver || isPaused}
          >
            <Text style={styles.buttonText}>Create Element</Text>
          </TouchableOpacity>
        </Animated.View>
        
        {selectedElement && (
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedText}>Element ready! Tap a cell to place.</Text>
          </View>
        )}
        
        <View style={styles.debugInfo}>
          <Text style={styles.debugText}>Can place: {canPlace ? 'Yes' : 'No'}</Text>
          <Text style={styles.debugText}>Selected: {selectedElement ? 'Yes' : 'No'}</Text>
          <Text style={styles.debugText}>Score: {score}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameArea: {
    flex: 1,
    backgroundColor: 'rgba(210, 180, 140, 0.3)',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#654321',
    margin: 20,
  },
  grid: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  cell: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(101, 67, 33, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    height: 160,
    backgroundColor: 'rgba(160, 82, 45, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  createButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 25,
    borderWidth: 3,
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
  buttonTouchable: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Macondo-Regular',
  },
  selectedInfo: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 215, 0, 0.8)',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  selectedText: {
    color: '#654321',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Macondo-Regular',
  },
  debugInfo: {
    marginTop: 10,
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
  },
  debugText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Macondo-Regular',
  }
});

export default GameArea;
