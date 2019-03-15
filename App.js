import React from 'react';
import { Layout } from './src/Core/Layout';
import { PostsListContainer } from './src/Modules/Posts';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const colors = {
  primary: '#3498db',
  gray: '#bdc3c7',
  dark: '#545454',
  white: '#ffffff'
};

const button = {
  height: 42,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 12,
  borderRadius: 2
};

const buttonWrapper = {
  flexDirection: 'row',
  flexWrap: 'wrap'
};

const defaultButtonStyles = StyleSheet.create({
  buttonWrapper: {
    ...buttonWrapper
  },
  button: {
    ...button,
    backgroundColor: colors.gray
  },
  buttonText: {
    color: colors.dark
  }
});

const BaseButton = ({ children, icon, color, background }) => {
  let buttonTextStyles = StyleSheet.flatten([defaultButtonStyles.buttonText]);
  let buttonStyles = StyleSheet.flatten([defaultButtonStyles.button]);

  if (color) {
    buttonTextStyles = {
      ...buttonTextStyles,
      color: color
    };
  }

  if (background) {
    buttonStyles = {
      ...buttonStyles,
      backgroundColor: background
    };
  }
  let iconButton = icon ? (
    <View style={{ marginRight: children ? 5 : 0 }}>
      <Ionicons name={icon} size={26} style={buttonTextStyles} />
    </View>
  ) : null;
  return (
    <View style={defaultButtonStyles.buttonWrapper}>
      <TouchableOpacity style={buttonStyles}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {iconButton}
          <Text style={buttonTextStyles}>{children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const DefaultButton = ({ children, icon }) => {
  return (
    <BaseButton icon={icon} color={colors.dark} background={colors.gray}>
      {children}
    </BaseButton>
  );
};

const PrimaryButton = ({ children, icon }) => {
  return (
    <BaseButton icon={icon} color={colors.white} background={colors.primary}>
      {children}
    </BaseButton>
  );
};

const BareButton = ({ children, icon, color }) => {
  return (
    <BaseButton icon={icon} color={color || colors.dark} background="none">
      {children}
    </BaseButton>
  );
};

export default class App extends React.Component {
  state = {
    selectedTab: 'Home'
  };

  onTabPressed = tab => {
    this.setState(state => {
      return {
        ...state,
        selectedTab: tab
      };
    });
  };

  render() {
    return (
      <Layout
        selectedTab={this.state.selectedTab}
        onTabPressed={this.onTabPressed}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <DefaultButton>Default</DefaultButton>
          <PrimaryButton>Primary</PrimaryButton>
          <BareButton>Bare</BareButton>
          <DefaultButton icon="md-checkmark-circle"></DefaultButton>
        </View>
      </Layout>
    );
  }
}
