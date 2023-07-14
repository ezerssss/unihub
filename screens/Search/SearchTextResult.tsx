import { TouchableOpacity, Text } from 'react-native';
import React, { useCallback } from 'react';
import { SearchResult } from '../../types/search';
import { BigSearchIcon } from '../../components/icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../enums/routes';
import { Product } from '../../types/product';
import { createProductFromAlgoliaSearch } from '../../helpers/search';

interface PropsInterface {
  result: SearchResult;
}

export default function SearchTextResult(props: PropsInterface) {
  const { result } = props;
  const { searchText } = result;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const handlePress = useCallback(async () => {
    const product: Product = createProductFromAlgoliaSearch(result);

    navigation.navigate(Routes.PRODUCT, { product, isRedirect: true });
  }, []);

  return (
    <TouchableOpacity
      className="flex-row items-center py-3"
      onPress={handlePress}
    >
      <BigSearchIcon />
      <Text className="ml-9 flex-1" numberOfLines={1}>
        {searchText}
      </Text>
    </TouchableOpacity>
  );
}
