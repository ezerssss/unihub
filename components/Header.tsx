import { View } from 'react-native';
import Search from './Search';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

function Header() {
  function onSearch(query: string) {
    // eslint-disable-next-line no-console
    console.log(query);
  }

  return (
    <View className="bg-primary-100 pt-20 pb-10">
      <View className="px-4 flex-row items-center justify-between">
        <View className="w-1/6">
          <MaterialIcons color="white" name="menu" size={30} />
        </View>
        <Search onSearch={onSearch} />
        <View className="w-1/6 flex-row justify-end">
          <Ionicons color="white" name="chatbox-ellipses-outline" size={30} />
        </View>
      </View>
    </View>
  );
}

export default Header;
