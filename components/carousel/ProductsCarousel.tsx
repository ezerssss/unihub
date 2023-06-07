import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

function CarouselComponent() {
  const data = [
    {
      id: '1',
      image:
        'https://media.karousell.com/media/photos/products/2020/9/30/grade_9_math_textbook_1601468442_dddb9ac9.jpg',
      title: 'Product 1',
      price: 500,
    },
    {
      id: '2',
      image:
        'https://media.karousell.com/media/photos/products/2020/9/30/grade_9_math_textbook_1601468442_dddb9ac9.jpg',
      title: 'Product 2',
      price: 800,
    },
    {
      id: '3',
      image:
        'https://media.karousell.com/media/photos/products/2020/9/30/grade_9_math_textbook_1601468442_dddb9ac9.jpg',
      title: 'Product 3',
      price: 1200,
    },
    {
      id: '4',
      image:
        'https://media.karousell.com/media/photos/products/2020/9/30/grade_9_math_textbook_1601468442_dddb9ac9.jpg',
      title: 'Product 4',
      price: 1500,
    },
    {
      id: '5',
      image:
        'https://media.karousell.com/media/photos/products/2020/9/30/grade_9_math_textbook_1601468442_dddb9ac9.jpg',
      title: 'Product 5',
      price: 2000,
    },
  ];

  return (
    <ScrollView horizontal>
      {data.map((item) => (
        <View key={item.id} style={{ margin: 10 }}>
          <View style={{ borderRadius: 10, overflow: 'hidden' }}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 150, height: 150 }}
              resizeMode="cover"
            />
          </View>
          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
            {item.title}
          </Text>
          <Text style={{ color: 'gray' }}>PHP {item.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default CarouselComponent;
