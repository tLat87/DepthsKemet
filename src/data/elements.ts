import { ElementLore, ElementType } from '../types/game';

export const ELEMENT_LORE: ElementLore[] = [
  {
    type: ElementType.SAND_DATE_DROP,
    name: 'Sand Date Drop',
    description: 'These sun-dried orbs were said to be carried by desert traders for protection against hunger and evil spirits. Their surface is etched by the winds of the dunes, holding the taste of both survival and secrecy.',
    color: '#D4AF37',
    image: require('../assets/ffff/Designer.png')
  },
  {
    type: ElementType.LOTUS_CHEW,
    name: 'Lotus Chew',
    description: 'Sacred pink lotus flowers that bloom in the sacred waters of the Nile. They represent rebirth and purity, their petals holding ancient wisdom passed down through generations.',
    color: '#FF69B4',
    image: require('../assets/ffff/Designer2.png')
  },
  {
    type: ElementType.OBSIDIAN_CRUNCH,
    name: 'Obsidian Crunch',
    description: 'Dark volcanic glass that reflects the stars of the night sky. Ancient Egyptians believed these stones contained the power of the cosmos and used them in sacred rituals.',
    color: '#1E3A8A',
    image: require('../assets/ffff/Designer3.png')
  },
  {
    type: ElementType.ANKH_CORE,
    name: 'Ankh Core',
    description: 'The sacred symbol of life and immortality. This golden ankh represents the eternal cycle of existence and the divine power that flows through all living things.',
    color: '#FFD700',
    image: require('../assets/ffff/Designer12.png')
  },
  {
    type: ElementType.PYRAMID_POP,
    name: 'Pyramid Pop',
    description: 'A glowing pyramid that radiates with the energy of the ancient pharaohs. Its light illuminates the path to hidden knowledge and forgotten treasures.',
    color: '#FF8C00',
    image: require('../assets/ffff/Designer21.png')
  }
];

export const getElementByLevel = (level: number): ElementType => {
  const elementTypes = Object.values(ElementType);
  return elementTypes[level - 1] || ElementType.SAND_DATE_DROP;
};

export const getScoreForLevel = (level: number): number => {
  return Math.pow(2, level);
};
