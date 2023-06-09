import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import { AntDesign } from '@expo/vector-icons';
import AddPhoto from './AddPhoto';
import ProductDescription from './ProductDescription';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { formatTime } from '../../helpers/date';
import useGoBack from '../../hooks/useGoBack';
import CategoryPicker from './CategoryPicker';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { uploadBlob } from '../../helpers/upload';
import { Product } from '../../types/product';
import { addDoc, collection } from 'firebase/firestore';
import db from '../../firebase/db';
import { DB } from '../../enums/db';
import { Categories } from '../../enums/categories';

export default function Sell() {
  const goBack = useGoBack();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [imageURIs, setImageURIs] = useState<string[]>(['', '', '']);
  const [showPreferredTime, setShowPreferredTime] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [time, setTime] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Categories.BOOKS
  );
  const [isUploading, setIsUploading] = useState(false);

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

  async function handleAddImage(index: number) {
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (image.canceled || !image.assets) {
      alert('You did not select any image.');
      return;
    }

    const uri = image.assets[0].uri;
    const updatedImageURIs = imageURIs;
    updatedImageURIs[index] = uri;

    setImageURIs([...updatedImageURIs]);
  }

  async function handleUpload(): Promise<string[]> {
    const photoURLs: string[] = [];

    for (const uri of imageURIs) {
      const id = uuid.v4();
      const path = `products/${id}`;

      const url = await uploadBlob(uri, path);
      photoURLs.push(url);
    }

    return photoURLs;
  }

  async function handleSell() {
    try {
      setIsUploading(true);
      const images: string[] = await handleUpload();

      const product: Product = {
        images,
        title,
        price: parseFloat(price),
        description,
        category: selectedCategory,
        meetup: {
          time,
          location,
        },
      };

      const productsRef = collection(db, DB.PRODUCTS);

      await addDoc(productsRef, product);
      handleStateCleanUp();
    } catch (error) {
      console.error(error);
      alert('Something went wrong with posting your product.');
    } finally {
      setIsUploading(false);
    }
  }

  function handleStateCleanUp() {
    setImageURIs(['', '', '']);
    setTitle('');
    setPrice('');
    setDescription('');
    setSelectedCategory('');
    setShowPreferredTime(false);
    setLocation('');
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

  const renderSellButtonText = isUploading ? (
    <ActivityIndicator color="white" size="large" />
  ) : (
    <Text className="text-2xl font-bold text-white">Sell</Text>
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
          <View className="relative flex-row items-center justify-center bg-primary-400 pb-10 pt-20">
            <TouchableOpacity
              className="absolute left-7 top-20"
              onPress={goBack}
            >
              <AntDesign color="white" name="left" size={30} />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-white">Sell</Text>
          </View>
          <View className="flex-row bg-white py-5 pl-5">
            <AddPhoto
              image={imageURIs[0]}
              text="+ Add Thumbnail Photo"
              onPress={() => handleAddImage(0)}
            />
            <AddPhoto
              image={imageURIs[1]}
              text="+ Add Photo"
              onPress={() => handleAddImage(1)}
            />
            <AddPhoto
              image={imageURIs[2]}
              text="+ Add Photo"
              onPress={() => handleAddImage(2)}
            />
          </View>
          <View className="mt-5 bg-white px-7 py-5">
            <ProductDescription
              placeholder="Enter product name..."
              title="Product Name"
              value={title}
              onChange={setTitle}
            />
            <ProductDescription
              placeholder="Enter product description..."
              title="Product Description"
              value={description}
              onChange={setDescription}
            />
          </View>
          <View className="mt-5 bg-white px-7 py-5">
            <CategoryPicker
              selectedCategory={selectedCategory}
              onChange={handleCategoryChange}
            />
            <ProductDescription
              isNumeric
              placeholder="Enter product price..."
              title="Price"
              value={price}
              onChange={setPrice}
            />
          </View>
          <View className="my-5 bg-white px-7 py-5">
            <TouchableOpacity
              className="mb-6 flex-row items-center justify-between"
              onPress={() => handleShowTimePicker(true)}
            >
              <Text className="text-lg font-bold">Preferred Meetup Time</Text>
              {renderPreferredTime}
            </TouchableOpacity>
            {renderTimePicker}
            <ProductDescription
              placeholder="Enter preferred meetup location..."
              title="Preferred Meetup Location"
              value={location}
              onChange={setLocation}
            />
          </View>
        </View>
        <TouchableOpacity
          className="mt-10 items-center justify-center bg-secondary-100 py-7"
          disabled={isUploading}
          onPress={handleSell}
        >
          {renderSellButtonText}
        </TouchableOpacity>
      </ScrollView>
    </ContentWrapper>
  );
}
