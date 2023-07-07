import { Text, TouchableOpacity } from 'react-native';

type RoundedButtonProps = {
  title: string;
  isActive: boolean;
  onPress: () => void;
};

export default function RoundedButton({
  title,
  isActive,
  onPress,
}: RoundedButtonProps) {
  const textClasses = `text-white ${isActive ? '' : 'text-primary-500'}`;

  return (
    <TouchableOpacity
      className={`mx-1 flex min-w-[130px] flex-row justify-center rounded-full border border-primary-300 px-5 py-5 align-middle ${
        isActive ? 'bg-primary-300' : 'border-primary-500'
      }`}
      onPress={onPress}
    >
      <Text className={textClasses}>{title}</Text>
    </TouchableOpacity>
  );
}
