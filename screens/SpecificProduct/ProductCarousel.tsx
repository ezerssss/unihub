import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import ImageView from 'react-native-image-viewing';

interface CarouselProps {
  images: string[];
}

function ProductCarousel(props: CarouselProps) {
  const { images } = props;
  const [isFullImage, setIsFullImage] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  function setIntoImageSource(imageUri: string) {
    return { uri: imageUri };
  }

  const renderProducts = images.map((image) => (
    <View className="overflow-hidden rounded-2xl" key={image}>
      <ImageView
        imageIndex={imageIndex}
        images={images.map(setIntoImageSource)}
        visible={isFullImage}
        onRequestClose={() => setIsFullImage(false)}
      />
      <TouchableOpacity
        onPress={() => {
          setIsFullImage(true);
        }}
      >
        <View className="relative">
          <Image
            className="h-full w-full rounded-lg"
            source={{
              uri: image,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  ));

  return (
    <View>
      <Swiper
        activeDot={<View className="mx-2 h-2 w-2 rounded-full bg-black" />}
        dot={<View className="mx-2 h-2 w-2 rounded-full bg-gray-400" />}
        style={{ height: 250 }}
        onIndexChanged={(index) => {
          setImageIndex(index);
        }}
      >
        {renderProducts}
      </Swiper>
    </View>
  );
}

export default ProductCarousel;
