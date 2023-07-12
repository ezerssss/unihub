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
  const textClasses = `text-white text-[8px] ${
    isActive ? '' : 'text-primary-500'
  }`;

  return (
    <TouchableOpacity
      className={`max- mx-1 flex min-w-[85px] flex-row items-center justify-center rounded-full border border-primary-300 align-middle ${
        isActive ? 'bg-primary-300' : 'border-primary-500'
      }`}
      onPress={onPress}
    >
      <Text className={textClasses}>{title}</Text>
    </TouchableOpacity>
  );
}
