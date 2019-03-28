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
        style={{ paddingVertical: 10 }}
        onPress={this.onPressHandler}
        underlayColor={colors.lightGray}
        activeOpacity={0.9}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View style={{ marginRight: 10 }}>
            <Image width={120} height={100} url={imageUrl} />
          </View>
          <View>
            <View>
              <View style={{ marginBottom: 6 }}>
                <Text bold>{name}</Text>
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
