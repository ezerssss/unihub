import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import { AntDesign } from '@expo/vector-icons';
import AddPhoto from './AddPhoto';
import ProductDescription from './ProductDescription';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { formatTime } from '../../helpers/date';
import CategoryPicker from './CategoryPicker';

export default function Sell() {
  const [showPreferredTime, setShowPreferredTime] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [time, setTime] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
  }

  function handleShowTimePicker(state: boolean) {
    setShowTimePicker(state);
  }

  function handleOnTimeChange(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    handleShowTimePicker(false);
    if (selectedDate) {
      setTime(selectedDate);
    }
    if (!showPreferredTime) {
      setShowPreferredTime(true);
    }
  }

  const renderTimePicker = showTimePicker && (
    <RNDateTimePicker
      display="inline"
      mode="time"
      value={time}
      onChange={handleOnTimeChange}
    />
  );

  const renderPreferredTime = showPreferredTime ? (
    <Text className="text-xs text-unihub-gray-100">{formatTime(time)}</Text>
  ) : (
    <AntDesign color="black" name="right" size={22} />
  );

  return (
    <ContentWrapper hasHeader={false}>
      <ScrollView
        className="bg-light-yellow"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <View className="flex-1 justify-start">
          <View className="flex-row items-center justify-center bg-primary-400 pt-20 pb-10 relative">
            <TouchableOpacity className="absolute left-7 top-20">
              <AntDesign color="white" name="left" size={30} />
            </TouchableOpacity>
            <Text className="font-bold text-white text-2xl">Sell</Text>
          </View>
          <View className="py-5 pl-5 flex-row bg-white">
            <AddPhoto text="+ Add Thumbnail Photo" />
            <AddPhoto text="+ Add Photo" />
            <AddPhoto text="+ Add Photo" />
          </View>
          <View className="py-5 px-7 bg-white mt-5">
            <ProductDescription
              placeholder="Enter product name..."
              title="Product Name"
            />
            <ProductDescription
              placeholder="Enter product description..."
              title="Product Description"
            />
          </View>
          <View className="py-5 px-7 bg-white mt-5">
            <CategoryPicker
              selectedCategory={selectedCategory}
              onChange={handleCategoryChange}
            />
            <ProductDescription
              isNumeric
              placeholder="Enter product price..."
              title="Price"
            />
          </View>
          <View className="py-5 px-7 bg-white my-5">
            <TouchableOpacity
              className="flex-row justify-between items-center mb-6"
              onPress={() => handleShowTimePicker(true)}
            >
              <Text className="font-bold text-lg">Preferred Meetup Time</Text>
              {renderPreferredTime}
            </TouchableOpacity>
            {renderTimePicker}
            <ProductDescription
              placeholder="Enter preferred meetup location..."
              title="Preferred Meetup Location"
            />
          </View>
        </View>
        <TouchableOpacity className="bg-secondary-100 mt-10 py-7 items-center justify-center">
          <Text className="text-white text-2xl font-bold">Sell</Text>
        </TouchableOpacity>
      </ScrollView>
    </ContentWrapper>
  );
}
