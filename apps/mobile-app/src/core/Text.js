import React from 'react';
import { Text as NativeText, View } from 'react-native';
import { theme } from './Theme';
import PropTypes from 'prop-types';

const { fontSizes, colors } = theme;

const BaseText = ({ children, bold, italic, color, size, letterCase }) => {
  const style = {
    fontSize: size || fontSizes.default,
    fontWeight: bold ? 'bold' : 'normal',
    fontStyle: italic ? 'italic' : 'normal',
    color: color || colors.textColor
  };

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

const baseTextPropTypes = {
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
  letterCase: PropTypes.oneOf(['upper', 'lower'])
};

BaseText.propTypes = baseTextPropTypes;

export const LargeText = props => {
  const { size, ...propsWithoutSize } = props;
  return <BaseText size={fontSizes.large} {...propsWithoutSize} />;
};

LargeText.propTypes = baseTextPropTypes;

export const SmallText = props => {
  const { size, ...propsWithoutSize } = props;
  return <BaseText size={fontSizes.small} {...propsWithoutSize} />;
};

SmallText.propTypes = baseTextPropTypes;

export const DefaultText = props => {
  const { size, ...propsWithoutSize } = props;
  return <BaseText size={fontSizes.default} {...propsWithoutSize} />;
};

DefaultText.propTypes = baseTextPropTypes;

export const ExtraLargeText = props => {
  const { size, ...propsWithoutSize } = props;
  return <BaseText size={fontSizes.extraLarge} {...propsWithoutSize} />;
};

export const FormLabelText = ({ label, children }) => {
  return (
    <View>
      <View style={{ marginBottom: 5 }}>
        <SmallText color={colors.textLight}>{label}</SmallText>
      </View>
      {children}
    </View>
  );
};

ExtraLargeText.propTypes = baseTextPropTypes;

export const Text = props => {
  const {
    children,
    bold = false,
    italic = false,
    size = 'default',
    letterCase,
    color
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
  color: PropTypes.string
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
