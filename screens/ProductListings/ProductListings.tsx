import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { formatNumber } from '../../helpers/number';

import useGoBack from '../../hooks/useGoBack';
import ContentWrapper from '../../components/ContentWrapper';
import AuthWrapper from '../../components/AuthWrapper';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ProductListingLoading } from '../../components/loading';
import UserContext from '../../context/UserContext';
import { Product } from '../../types/product';
import { RootNavigationProps } from '../../types/navigation';
import { Routes } from '../../enums/routes';
import { getUserListings } from '../../services/product';

function ProductListing({ navigation }: RootNavigationProps) {
  const { user } = useContext(UserContext);

  const goBack = useGoBack();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const handleGetUserListings = useCallback(getUserListings, [user]);

  useEffect(() => {
    (async () => {
      try {
        if (!user) {
          return;
        }

        const fetchedProducts = await handleGetUserListings(user.uid);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error(error);
        alert('Something went wrong with fetching your products.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  function handleClick(product: Product) {
    navigation.navigate(Routes.PRODUCT, { product });
  }

  const renderProductListings = products.map((product) => (
    <TouchableOpacity
      className="h-36 w-full flex-row border-b border-gray-300 bg-secondary-400 p-2"
      key={product.images[0]}
      onPress={() => handleClick(product)}
    >
      <TouchableOpacity className="aspect-square border">
        <Image
          className="h-full w-full border"
          source={{ uri: product.images[0] }}
        />
      </TouchableOpacity>
      <View className="flex-1 justify-center p-4">
        <Text className="mb-2 text-xl font-semibold text-primary-100">
          {product.title}
        </Text>
        <Text className="text-gray-500">₱{formatNumber(product.price)}</Text>
      </View>
    </TouchableOpacity>
  ));

  const renderContent = isLoading ? (
    <ProductListingLoading />
  ) : (
    renderProductListings
  );

  return (
    <AuthWrapper>
      <ContentWrapper hasHeader={false} hasLightStatusBar={true}>
        <View className="relative flex-row items-center justify-center bg-primary-400 pb-10 pt-20">
          <TouchableOpacity className="absolute left-7 top-20" onPress={goBack}>
            <AntDesign color="white" name="left" size={30} />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Product List</Text>
        </View>
        <ScrollView>{renderContent}</ScrollView>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default ProductListing;
