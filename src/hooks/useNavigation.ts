import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export const useAppNavigation = () => {
  return useNavigation<NavigationProp>();
};
