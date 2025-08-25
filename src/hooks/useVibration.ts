import { useSelector } from 'react-redux';
import { Vibration } from 'react-native';
import { RootState } from '../store/store';

export const useVibration = () => {
  const { vibrationEnabled } = useSelector((state: RootState) => state.settings);

  const vibrate = (pattern?: number | number[]) => {
    if (vibrationEnabled) {
      if (pattern) {
        Vibration.vibrate(pattern);
      } else {
        Vibration.vibrate(50); // Короткая вибрация по умолчанию
      }
    }
  };

  const vibrateShort = () => {
    if (vibrationEnabled) {
      Vibration.vibrate(50);
    }
  };

  const vibrateLong = () => {
    if (vibrationEnabled) {
      Vibration.vibrate(200);
    }
  };

  const vibratePattern = (pattern: number[]) => {
    if (vibrationEnabled) {
      Vibration.vibrate(pattern);
    }
  };

  return {
    vibrate,
    vibrateShort,
    vibrateLong,
    vibratePattern,
    isEnabled: vibrationEnabled
  };
};
