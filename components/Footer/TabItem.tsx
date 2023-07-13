import { TouchableOpacity, Text } from 'react-native';

interface TabItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

function TabItem({ icon, label, onPress }: TabItemProps) {
  return (
    <TouchableOpacity
      className="mt-1 flex flex-col items-center"
      onPress={onPress}
    >
      {icon}
      <Text className="mt-1 text-xs text-primary-400">{label}</Text>
    </TouchableOpacity>
  );
}

export default TabItem;
