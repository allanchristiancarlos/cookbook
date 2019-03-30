import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Text } from './Text';
import { Theme } from './Theme';

const { colors } = Theme;

export const TappableText = props => {
  const { children, onPress, ...textProps } = props;

  const onPressHandler = () => {
    if (!onPress) {
      return;
    }

    onPress();
  };

  return (
    <TouchableHighlight
      underlayColor={colors.lightGray}
      activeOpacity={0.9}
      onPress={onPressHandler}
    >
      <Text color={colors.primary} {...textProps}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};
