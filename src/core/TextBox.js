import React from 'react';
import { TextInput, View } from 'react-native';
import { theme } from './Theme';
import { FormLabelText } from './Text';

const { colors } = theme;

export const TextBox = ({ defaultValue, disabled, placeholder }) => {
  const containerStyles = {
    borderColor: disabled ? colors.disabled : colors.dark,
    borderWidth: 1,
    backgroundColor: disabled ? colors.lightGray : null
  };

  const inputStyles = {
    height: 36,
    color: disabled ? colors.textLight : colors.textColor,
    paddingHorizontal: 10
  };

  return (
    <View style={containerStyles}>
      <TextInput
        style={inputStyles}
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
        <FormLabelText label="Label">
          <TextBox defaultValue="Value" />
        </FormLabelText>
      </View>
    </View>
  );
};
