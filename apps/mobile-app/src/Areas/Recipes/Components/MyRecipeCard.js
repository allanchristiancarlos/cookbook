import React, { Component } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Image, Text, Theme } from '../../../Core';
import { RecipeRatingChip } from './RecipeRatingChip';

const { colors } = Theme;

class MyRecipeCard extends Component {
  render() {
    const { data, onPress } = this.props;
    const { imageUrl, name, rating } = data || {};

    const onPressHandler = () => {
      if (onPress) {
        onPress();
      }
    };

    const renderRating = () => {
      if (!rating) {
        return;
      }

      return (
        <View>
          <RecipeRatingChip rating={rating} />
        </View>
      );
    };

    return (
      <TouchableHighlight
        onPress={onPressHandler}
        underlayColor={colors.secondary}
        activeOpacity={0.9}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.lighterGray,
            backgroundColor: colors.white
          }}
        >
          <View style={{ width: 72, marginRight: 10 }}>
            <Image width={72} height={72} url={imageUrl} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 10, maxHeight: 35 }}>
              <Text bold size="large">{name}</Text>
            </View>
            <View>{renderRating()}</View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default MyRecipeCard;
