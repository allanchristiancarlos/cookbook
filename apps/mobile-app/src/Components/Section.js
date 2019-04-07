import React from 'react';
import { Text, Theme, TappableText } from '../Core';
import { View } from 'react-native';

const { colors } = Theme;

export const Section = props => {
  const { children, title, action, onAction, required } = props;

  const onActionHandler = () => {
    if (!onAction) {
      return;
    }

    onAction();
  };

  const renderRequired = () => {
    if (!required) {
      return;
    }

    return (
      <View style={{ marginLeft: 2 }}>
        <Text danger size="small" bold>
          *
        </Text>
      </View>
    );
  };

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
          <View style={{ marginBottom: 10, flexDirection: 'row' }}>
            <Text bold size="large">
              {title}
            </Text>
            {renderRequired()}
          </View>
        </View>
        {renderAction()}
      </View>
      {children}
    </View>
  );
};
