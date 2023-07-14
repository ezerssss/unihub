import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import dayjs from 'dayjs';
import type { Product } from '../../types/product';
import type { Timestamp } from 'firebase/firestore';
import { formatNumber } from '../../helpers/number';
import UserContext from '../../context/UserContext';
import { Categories } from '../../enums/categories';
import { LocationIcon, ClockIcon } from '../../components/icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';
import { generateErrorMessage } from '../../helpers/error';
import { getProductsByCategory } from '../../services/product';
import { FlatList } from 'react-native-gesture-handler';
import _debounce from 'lodash/debounce';
import { search } from '../../services/search';
import { searchDebounceTimeInMs } from '../../constants/search';
import { createProductFromAlgoliaSearch } from '../../helpers/search';

interface SwiperProps {
  isGlobalSearch: boolean;
  category: Categories;
  searchText: string;
}

function CategorySwiper(props: SwiperProps) {
  const { category, searchText, isGlobalSearch } = props;
  const { user } = useContext(UserContext);

  const [isFetching, setIsFetching] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const handleGetProducts = useCallback(getProductsByCategory, [category]);

  const handleGetCategoryData = useCallback(async () => {
    try {
      if (!user) {
        return;
      }

      setIsFetching(true);

      const fetchedProducts = await handleGetProducts(category);
      setProducts(fetchedProducts);
    } catch (error) {
      const message = generateErrorMessage(error);
      alert(message);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    _debounce(async (query: string) => {
      if (!query) {
        await handleGetCategoryData();

        return;
      }

      try {
        setIsFetching(true);
        const fetchedResults = await search(query);
        const productsArray: Product[] = [];

        for (const result of fetchedResults) {
          const product = createProductFromAlgoliaSearch(result);

          if (!isGlobalSearch && product.category !== category) {
            continue;
          }

          productsArray.push(product);
        }

        setProducts(productsArray);
      } catch (error) {
        const message = generateErrorMessage(error);
        alert(message);
      } finally {
        setIsFetching(false);
      }
    }, searchDebounceTimeInMs),
    []
  );

  useEffect(() => {
    (async () => {
      await debouncedSearch(searchText);
    })();
  }, [searchText]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  function goToSpecificProduct(product: Product) {
    navigation.navigate(Routes.PRODUCT, {
      product,
    });
  }

  function handleRender(product: Product) {
    const dateObject = (product.meetup.time as unknown as Timestamp).toDate();
    const formattedTime = dayjs(dateObject).format('HH:mm A');

    return (
      <TouchableOpacity
        className="mb-2 ml-2 h-fit w-[47.6%] overflow-hidden rounded-lg border border-gray-100 bg-white shadow shadow-gray-500"
        key={product.images[0]}
        onPress={() => {
          goToSpecificProduct(product);
        }}
      >
        <Image
          className="z-10 h-36 rounded-lg"
          resizeMode="cover"
          source={{ uri: product.images[0] }}
        />
        <View className="justify-center p-3">
          <Text className="my-1 text-lg text-black" numberOfLines={2}>
            {product.title}
          </Text>
          <View className="my-1 flex-row items-center">
            <LocationIcon />
            <Text className="ml-1 text-unihub-gray-200" numberOfLines={1}>
              {product.meetup.location}
            </Text>
          </View>
          <View className="my-1 flex-row flex-wrap justify-between">
            <View className="flex-row items-center justify-between">
              <ClockIcon />
              <Text className="ml-1 text-unihub-gray-200">{formattedTime}</Text>
            </View>
            <Text className="font-extrabold text-primary-300">
              ₱ {formatNumber(product.price, 0)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const renderNoProducts = (
    <Text className="mx-3 text-sm text-gray-400">No products.</Text>
  );

  return (
    <FlatList
      className="-ml-2 flex-1 px-3"
      data={products}
      ListEmptyComponent={renderNoProducts}
      numColumns={2}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={handleGetCategoryData}
        />
      }
      renderItem={({ item }) => handleRender(item)}
    />
  );
}

export default CategorySwiper;
