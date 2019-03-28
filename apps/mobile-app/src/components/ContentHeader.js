import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Image, Button } from '../core';

export class ContentHeader extends Component {
  render() {
    const { imageUrl, action, onAction, title, description } = this.props;

    const onActionHandler = () => {
      if (onAction) {
        onAction();
      }
    };

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10
        }}
      >
        <View style={{ marginRight: 15 }}>
          <Image width={100} height={100} url={imageUrl} />
        </View>
        <View>
          <View style={{ marginBottom: 10 }}>
            <Text size="large">{title}</Text>
            <Text size="small" muted>
              {description}
            </Text>
          </View>
          <Button onPress={onActionHandler} size="small">
            {action}
          </Button>
        </View>
      </View>
    );
  }
}

export const ContentHeaderSamples = () => {
  return (
    <ContentHeader
      imageUrl="https://myfoodbook.com.au/sites/default/files/styles/recipe_3_col/public/recipe_photo/Brev20155486_0.jpg?itok=1osMdS-X"
      action="Follow"
      title="#ChineseNewYear"
      description="Hoisin sauce, sriracha sauce"
    />
  );
};
