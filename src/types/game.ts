export interface GameElement {
  id: string;
  level: number;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  velocityY: number;
  isFalling: boolean;
}

export enum ElementType {
  SAND_DATE_DROP = 'SAND_DATE_DROP',
  LOTUS_CHEW = 'LOTUS_CHEW',
  OBSIDIAN_CRUNCH = 'OBSIDIAN_CRUNCH',
  ANKH_CORE = 'ANKH_CORE',
  PYRAMID_POP = 'PYRAMID_POP'
}

export interface ElementLore {
  type: ElementType;
  name: string;
  description: string;
  color: string;
  image: string;
}

export interface GameState {
  elements: GameElement[];
  score: number;
  bestScore: number;
  isGameOver: boolean;
  isPaused: boolean;
  gameArea: {
    width: number;
    height: number;
  };
}

export interface Settings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}
