import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Theme } from './Theme';
import PropTypes from 'prop-types';

const { colors, fontSizes } = Theme;

const BaseButton = props => {
  const {
    children,
    icon,
    color,
    background,
    block,
    look,
    size = 'default',
    onPress,
    disabled
  } = props;

  const sizes = {
    small: {
      height: 32,
      fontSize: fontSizes.small
    },
    default: {
      height: 38,
      fontSize: fontSizes.default
    },
    large: {
      height: 46,
      fontSize: fontSizes.large
    }
  };

  const selectedSize = sizes[size];

  let buttonTextStyles = {
    color: color || colors.textColor,
    fontSize: selectedSize.fontSize
  };

  let buttonStyles = {
    height: selectedSize.height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 0,
    minWidth: 40
  };

  switch (look) {
    case 'bare': {
      buttonTextStyles.color = background || colors.textColor;
      break;
    }
    case 'outline': {
      buttonTextStyles.color = background || colors.textColor;
      if (background === colors.secondary) {
        buttonTextStyles.color = colors.textColor;
      }
      buttonStyles.borderWidth = 1;
      buttonStyles.borderColor = background || colors.textColor;
      break;
    }
    default: {
      buttonStyles.backgroundColor = background || colors.secondary;
    }
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

  const isDisabled = !!disabled;

  if (isDisabled) {
    buttonTextStyles.color = colors.white;
    buttonStyles.backgroundColor = colors.lightGray;
  }

  const onPressHandler = () => {
    if (onPress) {
      onPress();
    }
  };

  let iconStyles = buttonTextStyles;
  let iconWrapperStyles = {
    marginRight: children ? 5 : 0
  };

  let iconButton = icon ? (
    <View style={iconWrapperStyles}>
      <Ionicons name={icon} size={26} style={iconStyles} />
    </View>
  ) : null;

  return (
    <View style={buttonWrapperStyles}>
      <TouchableHighlight
        disabled={disabled}
        underlayColor={colors.lightGray}
        activeOpacity={0.9}
        onPress={onPressHandler}
        style={buttonStyles}
      >
        <View style={buttonTextWrapperStyles}>
          {iconButton}
          <Text style={buttonTextStyles}>{children}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

BaseButton.propTypes = {
  icon: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  block: PropTypes.bool,
  look: PropTypes.oneOf(['flat', 'bare', 'outline']),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  onClick: PropTypes.func
};

export const Button = props => {
  const { color, children, kind, ...lessProps } = props;
  const kinds = {
    primary: {
      background: colors.primary,
      textColor: colors.white
    },
    default: {
      background:
        lessProps.look === 'bare' ? colors.textColor : colors.secondary,
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
};

Button.propTypes = {
  kind: PropTypes.oneOf(['primary', 'default', 'danger', 'warning', 'success']),
  icon: PropTypes.string,
  block: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  onClick: PropTypes.func
};

export const ButtonSamples = () => {
  return (
    <React.Fragment>
      <Button>Default</Button>
      <Button kind="primary">Primary</Button>
      <Button kind="danger">Danger</Button>
      <Button kind="success">Success</Button>
      <Button kind="warning">Warning</Button>
      <Button look="bare">Bare</Button>
      <Button size="small">Small</Button>
      <Button size="large">Large</Button>
    </React.Fragment>
  );
};
