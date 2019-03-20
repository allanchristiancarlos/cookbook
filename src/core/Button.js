import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from 'react-native';
import { theme } from './Theme';
import PropTypes from 'prop-types';

const { colors } = theme;

const BaseButton = ({ children, icon, color, background, block }) => {
  let buttonTextStyles = {
    color: color || colors.textColor
  };

  let buttonStyles = {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 0,
    backgroundColor: background || colors.secondary
  };

  let buttonTextWrapperStyles = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  };

  let buttonWrapperStyles = {
    flexDirection: block ? 'column' : 'row',
    flexWrap: 'wrap'
  };

  let iconStyles = buttonTextStyles;
  let iconWrapperStyles = { marginRight: children ? 5 : 0 };

  let iconButton = icon ? (
    <View style={iconWrapperStyles}>
      <Ionicons name={icon} size={26} style={iconStyles} />
    </View>
  ) : null;

  return (
    <View style={buttonWrapperStyles}>
      <TouchableOpacity style={buttonStyles}>
        <View style={buttonTextWrapperStyles}>
          {iconButton}
          <Text style={buttonTextStyles}>{children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

BaseButton.propTypes = {
  icon: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  block: PropTypes.bool
};

export const DefaultButton = props => {
  const { background, color, children, ...lessProps } = props;
  return (
    <BaseButton background={colors.secondary} color={colors.textColor} {...lessProps}>
      {children}
    </BaseButton>
  );
};

export const PrimaryButton = props => {
  const { background, children, color, ...lessProps } = props;
  return (
    <BaseButton background={colors.primary} color={colors.white} {...lessProps}>
      {children}
    </BaseButton>
  );
};

export const BareButton = props => {
  const { background, children, ...lessProps } = props;
  return (
    <BaseButton background="none" {...lessProps}>
      {children}
    </BaseButton>
  );
};

export const ButtonSamples = () => {
  return (
    <React.Fragment>
      <DefaultButton>DefaultButton</DefaultButton>
      <PrimaryButton>PrimaryButton</PrimaryButton>
      <BareButton>BareButton</BareButton>
      <PrimaryButton block>Block PrimaryButton</PrimaryButton>
      <DefaultButton icon="md-checkmark-circle" />
      <BareButton icon="md-checkmark-circle" color={colors.primary} />
    </React.Fragment>
  );
};
