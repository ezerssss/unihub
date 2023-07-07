import { TouchableOpacity, Text } from 'react-native';
import React, { useCallback } from 'react';
import { SearchResult } from '../../types/search';
import { BigSearchIcon } from '../../components/icons';
import { getProductByDocID } from '../../services/product';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../enums/routes';

interface PropsInterface {
  result: SearchResult;
}

export default function SearchTextResult(props: PropsInterface) {
  const { result } = props;
  const { searchText, docID } = result;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const handlePress = useCallback(async () => {
    const product = await getProductByDocID(docID);

    navigation.navigate(Routes.PRODUCT, { product });
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
