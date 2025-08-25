import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, GameElement } from '../types/game';

const initialState: GameState = {
  elements: [],
  score: 0,
  bestScore: 0,
  isGameOver: false,
  isPaused: false,
  gameArea: {
    width: 0,
    height: 0
  }
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameArea: (state, action: PayloadAction<{ width: number; height: number }>) => {
      state.gameArea = action.payload;
    },
    addElement: (state, action: PayloadAction<GameElement>) => {
      state.elements.push(action.payload);
    },
    updateElement: (state, action: PayloadAction<{ id: string; updates: Partial<GameElement> }>) => {
      const element = state.elements.find(el => el.id === action.payload.id);
      if (element) {
        Object.assign(element, action.payload.updates);
      }
    },
    removeElement: (state, action: PayloadAction<string>) => {
      state.elements = state.elements.filter(el => el.id !== action.payload);
    },
    mergeElements: (state, action: PayloadAction<{ element1: string; element2: string }>) => {
      // Простое объединение для новой логики
      const element1 = state.elements.find(el => el.id === action.payload.element1);
      const element2 = state.elements.find(el => el.id === action.payload.element2);
      
      if (element1 && element2) {
        // Удаляем оба элемента
        state.elements = state.elements.filter(el => 
          el.id !== action.payload.element1 && el.id !== action.payload.element2
        );
      }
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
      if (state.score > state.bestScore) {
        state.bestScore = state.score;
      }
    },
    setGameOver: (state, action: PayloadAction<boolean>) => {
      state.isGameOver = action.payload;
    },
    setPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    resetGame: (state) => {
      state.elements = [];
      state.score = 0;
      state.isGameOver = false;
      state.isPaused = false;
    },
    loadBestScore: (state, action: PayloadAction<number>) => {
      state.bestScore = action.payload;
    }
  }
});

export const {
  setGameArea,
  addElement,
  updateElement,
  removeElement,
  mergeElements,
  updateScore,
  setGameOver,
  setPaused,
  resetGame,
  loadBestScore
} = gameSlice.actions;

export default gameSlice.reducer;
