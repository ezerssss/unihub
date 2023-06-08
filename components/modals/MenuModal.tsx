import React from 'react';
import {
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Text,
} from 'react-native';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function MenuModal(props: MenuModalProps) {
  const { isOpen, onClose } = props;
  const screenHeight = Dimensions.get('window').height;
  const menuHeight = screenHeight / 2;

  const modalAnimation = new Animated.Value(screenHeight);

  function closeMenu() {
    Animated.spring(modalAnimation, {
      toValue: screenHeight,
      useNativeDriver: true,
    }).start(onClose);
  }

  return (
    <Modal transparent visible={isOpen}>
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1 }}
        onPress={(event) => {
          if (event.target === event.currentTarget) {
            closeMenu();
          }
        }}
      >
        <Animated.View
          style={{
            height: menuHeight,
            transform: [
              {
                translateY: modalAnimation.interpolate({
                  inputRange: [0, screenHeight - menuHeight],
                  outputRange: [-menuHeight, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {/* Your menu content goes here */}
          <Text>Menu</Text>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

export default MenuModal;
