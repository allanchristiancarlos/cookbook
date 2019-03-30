import React from 'react';
import { View } from 'react-native';
import { Text, Theme } from '../Core';
import { Ionicons } from '@expo/vector-icons';

const { colors, fontSizes } = Theme;

export const List = props => {
  const { ordered = false, children } = props;

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        bullet: ordered ? `${index + 1}.` : null
      });
    });
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>{renderChildren()}</View>
  );
};

export const ListItem = props => {
  const { children, bullet } = props;

  const renderBullet = () => {
    const renderBulletOrText = () => {
      if (!!bullet) {
        return <Text>{bullet}</Text>;
      }

      return (
        <View style={{ width: fontSizes.default }}>
          <Ionicons
            size={fontSizes.default}
            name="md-radio-button-on"
            color={colors.textColor}
          />
        </View>
      );
    };
    return (
      <View
        style={{
          marginRight: 6,
          marginTop: bullet ? 0 : 3,
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}
      >
        {renderBulletOrText()}
      </View>
    );
  };
  return (
    <View style={{ marginBottom: 10 }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start'
        }}
      >
        {renderBullet()}
        <View
          style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
        >
          {children}
        </View>
      </View>
    </View>
  );
};
