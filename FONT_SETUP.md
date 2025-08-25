# Инструкция по добавлению шрифта Macondo-Regular

## Шаг 1: Размещение шрифта

Создайте папку `assets/fonts` в корне проекта и поместите туда файл шрифта:

```
DepthsKemet/
├── assets/
│   ├── fonts/
│   │   └── Macondo-Regular.ttf
│   └── img/
├── src/
├── package.json
└── ...
```

## Шаг 2: Обновление react-native.config.js

Создайте или обновите файл `react-native.config.js` в корне проекта:

```javascript
module.exports = {
  assets: ['./assets/fonts/']
};
```

## Шаг 3: Связывание шрифтов

Запустите команду для связывания шрифтов:

```bash
npx react-native link
```

## Шаг 4: Для iOS (требуется macOS)

Добавьте шрифт в `ios/DepthsKemet/Info.plist`:

```xml
<key>UIAppFonts</key>
<array>
  <string>Macondo-Regular.ttf</string>
</array>
```

## Шаг 5: Для Android

Добавьте шрифт в `android/app/src/main/assets/fonts/`:

```bash
cp assets/fonts/Macondo-Regular.ttf android/app/src/main/assets/fonts/
```

## Шаг 6: Перезапуск приложения

После добавления шрифта перезапустите приложение:

```bash
# Остановите Metro сервер (Ctrl+C)
# Затем запустите заново
npm start
npm run android  # или npm run ios
```

## Альтернативный способ (только для тестирования)

Если хотите быстро протестировать без настройки шрифтов, замените все `fontFamily: 'Macondo-Regular'` на:

```tsx
fontFamily: 'System'  // для iOS
fontFamily: 'sans-serif'  // для Android
```

## Проверка работы шрифта

После настройки шрифт должен автоматически применяться ко всем текстам в приложении. Если шрифт не работает:

1. Проверьте правильность пути к файлу
2. Убедитесь, что файл имеет расширение .ttf
3. Перезапустите Metro сервер
4. Очистите кэш: `npx react-native start --reset-cache`

## Где скачать шрифт Macondo-Regular

Шрифт Macondo-Regular можно скачать с Google Fonts:
https://fonts.google.com/specimen/Macondo

Выберите "Download family" и извлеките файл `Macondo-Regular.ttf`.
