import { RootStackParamsList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../enums/routes';

export default function useNavigate(routeName: Routes) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  // TODO: use proper typing instead of never
  return () => navigation.navigate(routeName as never);
}
