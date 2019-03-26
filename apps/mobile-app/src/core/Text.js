import React from 'react';
import { Text, View } from 'react-native';
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

  return <Text style={style}>{text}</Text>;
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

export const TextSamples = () => {
  return (
    <View>
      <SmallText>SmallText</SmallText>
      <DefaultText>DefaultText</DefaultText>
      <LargeText italic>LargeText</LargeText>
      <ExtraLargeText>ExtraLargeText</ExtraLargeText>
      <ExtraLargeText bold>ExtraLargeBoldText</ExtraLargeText>
      <DefaultText letterCase="upper">UpperCase</DefaultText>
      <DefaultText letterCase="lower">LowerCase</DefaultText>
      <SmallText letterCase="upper">Small Uppercase</SmallText>
      <SmallText bold letterCase="upper">
        Small Bold Uppercase
      </SmallText>
    </View>
  );
};
