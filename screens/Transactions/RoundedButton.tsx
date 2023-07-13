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
  const textStyle = `text-white text-xs ${isActive ? '' : 'text-primary-500'}`;
  const backgroundStyle = isActive ? 'bg-primary-300' : 'border-primary-500';

  return (
    <TouchableOpacity
      className={`mx-1 h-8 min-w-[85px] items-center justify-center rounded-xl border border-primary-300 px-2 ${backgroundStyle}`}
      onPress={onPress}
    >
      <Text className={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
