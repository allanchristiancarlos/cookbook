import React, { Component } from 'react';
import { TouchableHighlight, View, Dimensions } from 'react-native';
import { Image, Text, Theme } from '../../../Core';

const { colors } = Theme;

export class CategoryCard extends Component {
  onPressHandler = () => {
    const { onPress } = this.props;

    if (onPress) {
      onPress();
    }
  };

  render() {
    const { data } = this.props;
    const { imageUrl, name, description } = data || {};

    return (
      <TouchableHighlight
        onPress={this.onPressHandler}
        underlayColor={colors.secondary}
        activeOpacity={0.9}
      >
        <View
          style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}
        >
          <View style={{ width: 120, marginRight: 10 }}>
            <Image width={120} height={100} url={imageUrl} />
          </View>
          <View style={{ flex: 1 }}>
            <View>
              <View style={{ marginBottom: 6 }}>
                <Text bold size="large">
                  {name}
                </Text>
              </View>
              <Text size="small" muted>
                {description}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
