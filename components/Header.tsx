import { View, Text } from 'react-native';
import Search from './Search';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const Header = () => {
  function onSearch(query: string) {
    console.log(query);
  }

  return (
    <View className="bg-primary-100 pt-20 pb-10">
      <View className="px-4 flex-row items-center justify-between">
        <View className="w-1/6">
          <MaterialIcons name="menu" size={30} color="white" />
        </View>
        <Search onSearch={onSearch} />
        <View className="w-1/6 flex-row justify-end">
          <Ionicons name="chatbox-ellipses-outline" size={30} color="white" />
        </View>
      </View>
    </View>
  );
};

export default Header;
