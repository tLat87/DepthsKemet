# Инструкция по добавлению PNG фоновых изображений

## Шаг 1: Подготовка изображений

Подготовьте PNG изображения для каждого экрана:
- `main-menu-bg.png` - для главного меню
- `game-bg.png` - для игрового экрана  
- `how-to-play-bg.png` - для экрана инструкций
- `elements-lore-bg.png` - для экрана лора элементов
- `settings-bg.png` - для экрана настроек

## Шаг 2: Размещение изображений

Создайте папку `assets` в корне проекта и поместите туда все PNG файлы:

```
DepthsKemet/
├── assets/
│   ├── main-menu-bg.png
│   ├── game-bg.png
│   ├── how-to-play-bg.png
│   ├── elements-lore-bg.png
│   └── settings-bg.png
├── src/
├── package.json
└── ...
```

## Шаг 3: Обновление BackgroundImage.tsx

Замените комментарий в `src/components/BackgroundImage.tsx` на реальный код:

```tsx
import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

interface BackgroundImageProps {
  children: React.ReactNode;
  backgroundType?: 'main-menu' | 'game' | 'how-to-play' | 'elements-lore' | 'settings';
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ children, backgroundType = 'main-menu' }) => {
  const getBackgroundImage = () => {
    switch (backgroundType) {
      case 'main-menu':
        return require('../../assets/main-menu-bg.png');
      case 'game':
        return require('../../assets/game-bg.png');
      case 'how-to-play':
        return require('../../assets/how-to-play-bg.png');
      case 'elements-lore':
        return require('../../assets/elements-lore-bg.png');
      case 'settings':
        return require('../../assets/settings-bg.png');
      default:
        return require('../../assets/main-menu-bg.png');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={getBackgroundImage()} style={styles.backgroundImage} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default BackgroundImage;
```

## Шаг 4: Обновление экранов

Теперь обновите каждый экран, передав соответствующий тип фона:

### MainMenuScreen.tsx
```tsx
<BackgroundImage backgroundType="main-menu">
  {/* содержимое */}
</BackgroundImage>
```

### GameScreen.tsx
```tsx
<BackgroundImage backgroundType="game">
  {/* содержимое */}
</BackgroundImage>
```

### HowToPlayScreen.tsx
```tsx
<BackgroundImage backgroundType="how-to-play">
  {/* содержимое */}
</BackgroundImage>
```

### ElementsLoreScreen.tsx
```tsx
<BackgroundImage backgroundType="elements-lore">
  {/* содержимое */}
</BackgroundImage>
```

### SettingsScreen.tsx
```tsx
<BackgroundImage backgroundType="settings">
  {/* содержимое */}
</BackgroundImage>
```

## Шаг 5: Удаление временных элементов

После добавления PNG изображений можно удалить:
- Временные иероглифы
- Временные колонны
- Временный цвет фона

## Рекомендации по изображениям

- **Размер**: Рекомендуется 1920x1080 или больше для хорошего качества
- **Формат**: PNG для лучшего качества
- **Оптимизация**: Сжимайте изображения для уменьшения размера приложения
- **Стиль**: Сохраняйте единый египетский стиль для всех изображений

## Альтернативный вариант

Если хотите использовать одно изображение для всех экранов, просто замените:

```tsx
<Image source={require('../../assets/background.png')} style={styles.backgroundImage} />
```

И удалите логику с `backgroundType`.
