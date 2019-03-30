import React from 'react';
import { Text, Theme, TappableText } from '../Core';
import { View } from 'react-native';

const { colors } = Theme;

export const Section = props => {
  const { children, title, action, onAction } = props;

  const onActionHandler = () => {
    if (!onAction) {
      return;
    }

    onAction();
  }

  const renderAction = () => {
    if (!action) {
      return;
    }
    
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}
      >
        <TappableText onPress={onActionHandler} bold size="small">
          {action}
        </TappableText>
      </View>
    );
  };

  return (
    <View
      style={{
        paddingVertical: 20,
        borderBottomColor: colors.secondary,
        borderBottomWidth: 1
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 15
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Text bold size="large">
            {title}
          </Text>
        </View>
        {renderAction()}
      </View>
      {children}
    </View>
  );
};
