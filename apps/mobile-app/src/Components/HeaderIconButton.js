import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../Core';

const { colors } = Theme;

function HeaderIconButton(props) {
  const { icon, onPress, size = 28 } = props;

  const onPressHandler = () => {
    if (!onPress) {
      return;
    }

    onPress();
  };

  return (
    <TouchableOpacity onPress={onPressHandler} activeOpacity={0.4}>
      <Ionicons name={icon} size={size} color={colors.textColor} />
    </TouchableOpacity>
  );
}

export default HeaderIconButton;
