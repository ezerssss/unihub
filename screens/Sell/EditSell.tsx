import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
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
import { compressImage } from '../../helpers/upload';
import { Categories } from '../../enums/categories';
import AuthWrapper from '../../components/AuthWrapper';
import { Timestamp } from 'firebase/firestore';
import UserContext from '../../context/UserContext';
import { EditSellNavigationProps } from '../../types/navigation';
import { Routes } from '../../enums/routes';
import { updateProduct, deleteProduct } from '../../services/product';
import {
  uploadProductPhotos,
  deleteProductPhotos,
} from '../../services/product';
import { generateErrorMessage } from '../../helpers/error';
import { Product } from '../../types/product';
import NotificationContext from '../../context/NotificationContext';
import { User } from 'firebase/auth';

export default function Sell({ navigation, route }: EditSellNavigationProps) {
  const { product } = route.params;
  const dateObject = (product.meetup.time as unknown as Timestamp).toDate();

  const goBack = useGoBack();

  const { user } = useContext(UserContext);
  const { expoPushToken } = useContext(NotificationContext);

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());
  const [location, setLocation] = useState(product.meetup.location);
  const [imageURIs, setImageURIs] = useState<string[]>(product.images);
  const [showPreferredTime, setShowPreferredTime] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [time, setTime] = useState<Date>(dateObject);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    product.category
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

    const uri = await compressImage(image.assets[0].uri);
    const updatedImageURIs = imageURIs;
    updatedImageURIs[index] = uri;

    setImageURIs([...updatedImageURIs]);
  }

  function showErrorPopup(message: string) {
    Alert.alert('Error', message);
  }

  function handleInputValidation() {
    if (
      imageURIs.filter(Boolean).length !== 3 ||
      !title ||
      !description ||
      !price ||
      !location ||
      !time
    ) {
      let errorMessage = '';

      if (imageURIs.filter(Boolean).length !== 3) {
        errorMessage += 'Must upload 3 images\n';
      }

      if (!title) {
        errorMessage += 'Product Name is not set\n';
      }

      if (!description) {
        errorMessage += 'Product Description is not set\n';
      }

      if (!price) {
        errorMessage += 'Product Price is not set\n';
      }

      if (!location) {
        errorMessage += 'Meetup Location is not set\n';
      }

      if (!time) {
        errorMessage += 'Meetup Time is not set\n';
      }

      showErrorPopup(errorMessage);
      return false;
    }

    return true;
  }

  async function handleDelete(product: Product, user: User) {
    if (!user) {
      return;
    }

    await deleteProduct(product, user);
    handleStateCleanUp();
    navigation.navigate(Routes.HOME);
  }

  async function handleEdit(originalProduct: Product) {
    if (!user) {
      return;
    }

    await deleteProductPhotos(originalProduct);
    const images = await uploadProductPhotos(imageURIs);

    const product: Product = {
      images,
      title,
      price: parseFloat(price),
      description,
      category: selectedCategory as Categories,
      meetup: {
        time,
        location,
      },
      seller: user?.displayName ?? '-',
      sellerExpoPushToken: expoPushToken,
    };

    await updateProduct(product, user);
    handleStateCleanUp();
    navigation.navigate(Routes.PRODUCT, { product, isRedirect: true });
  }

  async function handleDeleteButtonPress() {
    try {
      if (!user) {
        return;
      }

      Alert.alert('Confirm to Delete?', '', [
        {
          text: 'No',
          onPress: () => {
            return;
          },
        },
        {
          text: 'Yes',
          onPress: () => handleDelete(product, user),
        },
      ]);
    } catch (error) {
      const message = generateErrorMessage(error);
      showErrorPopup(message);
    } finally {
      setIsUploading(false);
    }
  }

  async function handleEditButtonPress() {
    try {
      if (!user || !handleInputValidation()) {
        return;
      }

      Alert.alert('Confirm to Edit?', '', [
        {
          text: 'No',
          onPress: () => {
            return;
          },
        },
        {
          text: 'Yes',
          onPress: () => handleEdit(product),
        },
      ]);
    } catch (error) {
      const message = generateErrorMessage(error);
      showErrorPopup(message);
    } finally {
      setIsUploading(false);
    }
  }

  const handleStateCleanUp = useCallback(() => {
    setImageURIs(['', '', '']);
    setTitle('');
    setPrice('');
    setDescription('');
    setSelectedCategory('');
    setShowPreferredTime(false);
    setLocation('');
  }, []);

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

  const renderDeleteButtonText = isUploading ? (
    <ActivityIndicator color="white" size="large" />
  ) : (
    <Text className="text-md font-extrabold text-white">Delete Listing</Text>
  );

  const renderEditButtonText = isUploading ? (
    <ActivityIndicator color="white" size="large" />
  ) : (
    <Text className="text-2xl font-extrabold text-white">Update</Text>
  );

  return (
    <AuthWrapper>
      <ContentWrapper hasLightStatusBar hasHeader={false}>
        <ScrollView
          className="bg-unihub-gray-300"
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
        </ScrollView>

        <View className="bottom-0 flex h-28 w-full content-end justify-center bg-white py-4 shadow shadow-black">
          <View className="ml-auto flex flex-row">
            <TouchableOpacity
              className="mr-5 h-10 w-28 items-center justify-center self-end rounded-lg bg-tertiary-100"
              disabled={isUploading}
              onPress={handleDeleteButtonPress}
            >
              {renderDeleteButtonText}
            </TouchableOpacity>
            <TouchableOpacity
              className="mr-5 h-12 w-36 items-center justify-center self-end rounded-lg bg-secondary-100"
              disabled={isUploading}
              onPress={handleEditButtonPress}
            >
              {renderEditButtonText}
            </TouchableOpacity>
          </View>
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}
