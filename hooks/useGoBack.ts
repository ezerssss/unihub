import { RootStackParamsList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export default function goBack() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  return () => navigation.goBack();
}
