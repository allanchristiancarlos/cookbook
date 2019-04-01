import React from 'react';
import { TextInput, View } from 'react-native';
import { Theme } from './Theme';
import { Text } from './Text';

const { colors } = Theme;

export const TextBox = ({
  defaultValue,
  disabled,
  placeholder,
  lines = 1,
  multiline = false,
  onChangeText,
  value
}) => {
  const containerStyles = {
    borderColor: disabled ? colors.disabled : colors.dark,
    borderWidth: 1,
    backgroundColor: disabled ? colors.secondary : null
  };

  const inputStyles = {
    color: disabled ? colors.textLight : colors.textColor,
    paddingHorizontal: 10
  };
  if (multiline === false) {
    inputStyles.height = 36;
  } else {
    inputStyles.paddingVertical = 10;
  }

  const onChangeTextHandler = e => {
    if (!onChangeText) {
      return;
    }

    onChangeText(e);
  };

  return (
    <View style={containerStyles}>
      <TextInput
        value={value}
        onChangeText={onChangeTextHandler}
        textAlignVertical={multiline ? 'top' : 'center'}
        numberOfLines={lines}
        style={inputStyles}
        multiline={multiline}
        defaultValue={defaultValue}
        placeholder={placeholder}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        placeholderTextColor={colors.textLight}
      />
    </View>
  );
};

export const TextBoxSamples = () => {
  return (
    <View style={{ margin: 5 }}>
      <View style={{ marginBottom: 10 }}>
        <TextBox defaultValue="Test" />
      </View>
      <View style={{ marginBottom: 10 }}>
        <TextBox placeholder="Placeholder" />
      </View>
      <View style={{ marginBottom: 10 }}>
        <TextBox defaultValue="Disabled" disabled />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text size="small" bold letterCase="upper">
          Field Label
        </Text>
        <TextBox defaultValue="Value" />
      </View>
    </View>
  );
};
