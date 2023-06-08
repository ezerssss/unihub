import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { categories } from '../../data/category';
import { Text } from 'react-native';

interface PropsInterface {
  selectedCategory: string;
  onChange: (category: string) => void;
}

export default function CategoryPicker(props: PropsInterface) {
  const { selectedCategory, onChange } = props;

  const renderCategories = categories.map((category) => (
    <Picker.Item
      key={category.id}
      label={category.name}
      value={category.name}
    />
  ));

  return (
    <>
      <Text className="text-lg font-bold">Category</Text>
      <Picker selectedValue={selectedCategory} onValueChange={onChange}>
        {renderCategories}
      </Picker>
    </>
  );
}
