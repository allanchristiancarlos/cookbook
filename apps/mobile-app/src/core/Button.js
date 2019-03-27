import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from 'react-native';
import { theme } from './Theme';
import PropTypes from 'prop-types';

const { colors } = theme;

const BaseButton = ({ children, icon, color, background, block, look }) => {
  let buttonTextStyles = {
    color: color || colors.textColor
  };

  let buttonStyles = {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 0
  };

  const isBare = look === 'bare';

  if (isBare === true) {
    buttonTextStyles.color = background || colors.textColor;
  } else {
    buttonStyles.backgroundColor = background || colors.secondary;
  }

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
  block: PropTypes.bool,
  look: PropTypes.oneOf(['flat', 'bare'])
};

export const Button = (props) => {
  const { color, children, kind, ...lessProps } = props;
  const kinds = {
    primary: {
      background: colors.primary,
      textColor: colors.white
    },
    default: {
      background: lessProps.look === 'bare' ? colors.textColor : colors.secondary,
      textColor: colors.textColor
    },
    danger: {
      background: colors.danger,
      textColor: colors.white
    },
    success: {
      background: colors.success,
      textColor: colors.white
    },
    warning: {
      background: colors.warning,
      textColor: colors.white
    }
  };
  const kindColors = kinds[kind] || kinds['default'];

  return (
    <BaseButton
      background={kindColors.background}
      color={kindColors.textColor}
      {...lessProps}
    >
      {children}
    </BaseButton>
  );
}

Button.propTypes = {
  kind: PropTypes.oneOf(['primary', 'default', 'danger', 'warning', 'success']),
  icon: PropTypes.string,
  block: PropTypes.bool
}

export const ButtonSamples = () => {
  return (
    <React.Fragment>
      <Button>Default</Button>
      <Button kind="primary">Primary</Button>
      <Button kind="danger">Danger</Button>
      <Button kind="success">Success</Button>
      <Button kind="warning">Warning</Button>
      <Button look="bare">Bare</Button>
    </React.Fragment>
  );
};
