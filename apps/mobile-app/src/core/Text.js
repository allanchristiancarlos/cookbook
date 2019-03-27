import React from 'react';
import { Text as NativeText, View } from 'react-native';
import { theme } from './Theme';
import PropTypes from 'prop-types';

const { fontSizes, colors } = theme;

export const Text = props => {
  const {
    children,
    bold = false,
    italic = false,
    size = 'default',
    letterCase,
    color,
    muted = false
  } = props;

  const sizes = {
    small: fontSizes.small,
    default: fontSizes.default,
    large: fontSizes.large,
    xlarge: fontSizes.extraLarge
  };

  const style = {
    fontSize: sizes[size] || fontSizes.default,
    fontWeight: bold ? 'bold' : 'normal',
    fontStyle: italic ? 'italic' : 'normal',
    color: color || colors.textColor
  };

  if (muted) {
    style.color = colors.muted;
  }

  const casing = letterCase || 'none';
  let text = children;
  switch (casing) {
    case 'upper':
      text = text.toUpperCase();
      break;
    case 'lower':
      text = text.toLowerCase();
      break;
  }

  return <NativeText style={style}>{text}</NativeText>;
};

Text.propTypes = {
  size: PropTypes.oneOf(['small', 'default', 'large', 'xlarge']),
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  letterCase: PropTypes.oneOf(['upper', 'lower']),
  color: PropTypes.string,
  muted: PropTypes.bool
};

export const TextSamples = () => {
  return (
    <View>
      <Text size="small">Small Text</Text>
      <Text>Default Text</Text>
      <Text size="large">Large Text</Text>
      <Text size="xlarge">X-Large Text</Text>
      <Text italic>Italic Text</Text>
      <Text bold>Bold Text</Text>
      <Text letterCase="upper">Uppercase Text</Text>
      <Text letterCase="lower">Lowercase Text</Text>
    </View>
  );
};
