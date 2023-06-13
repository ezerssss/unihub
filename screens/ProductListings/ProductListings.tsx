import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { formatNumber } from '../../helpers/number';

import useGoBack from '../../hooks/useGoBack';
import ContentWrapper from '../../components/ContentWrapper';
import StatusButton from './StatusButton';
import { productListings } from '../../data/products';

function ProductListing() {
  const goBack = useGoBack();
  // Replace with actual product data

  const renderProductListings = productListings.map((product, index) => (
    <View
      className="h-36 w-full flex-row border-b border-gray-300 bg-white"
      key={index}
    >
      <TouchableOpacity className="w-1/4">
        <Image
          source={{ uri: product.image }}
          style={{ width: '100%', height: '100%' }}
        />
      </TouchableOpacity>
      <View className="w-3/4 bg-yellow-100 p-4">
        <Text className="mb-4 text-xl font-semibold">{product.title}</Text>
        <StatusButton status={product.status} />
      </View>
      <View className="absolute right-2 top-2">
        <Text className="text-gray-500">₱{formatNumber(product.price)}</Text>
      </View>
    </View>
  ));

  return (
    <ContentWrapper hasHeader={false}>
      <View className="relative flex-row items-center justify-center bg-primary-400 pb-10 pt-20">
        <TouchableOpacity className="absolute left-7 top-20" onPress={goBack}>
          <AntDesign color="white" name="left" size={30} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white">Product List</Text>
      </View>
      <View>{renderProductListings}</View>
    </ContentWrapper>
  );
}

export default ProductListing;
