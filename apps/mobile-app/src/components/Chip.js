import React from 'react';
import { View } from 'react-native';
import { Theme, Text } from '../Core';

const { colors } = Theme;

export const Chip = props => {
  const { children, kind = 'secondary', onPress, background, color } = props;
  const kinds = {
    primary: {
      backgroundColor: colors.primary,
      textColor: colors.white
    },
    success: {
      backgroundColor: colors.success,
      textColor: colors.white
    },
    danger: {
      backgroundColor: colors.danger,
      textColor: colors.white
    },
    secondary: {
      backgroundColor: colors.secondary,
      textColor: colors.textColor
    },
    warning: {
      backgroundColor: colors.warning,
      textColor: colors.white
    }
  };

  let { backgroundColor, textColor } = kinds[kind];
  backgroundColor = background || backgroundColor;
  textColor = color || textColor;
  
  const onPressHandler = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <View
        style={{
          backgroundColor,
          paddingVertical: 2,
          paddingHorizontal: 8,
          borderRadius: 10
        }}
      >
        <Text size="small" color={textColor}>
          {children}
        </Text>
      </View>
    </View>
  );
};
