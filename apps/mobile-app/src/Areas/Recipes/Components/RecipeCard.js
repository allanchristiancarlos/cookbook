import React, { Component } from 'react';
import { TouchableHighlight, View, Dimensions } from 'react-native';
import { Image, Text, Theme } from '../../../Core';
import { RecipeTagChip } from './RecipeTagChip';
import Rating from '../../../Components/Rating';

const { colors } = Theme;

class RecipeCard extends React.PureComponent {
  render() {
    const { data, onPress, onCategoryPress } = this.props;
    const { imageUrl, name, rating, relatedCategories } = data || {};
    const onPressHandler = () => {
      if (onPress) {
        onPress();
      }
    };

    const onCategoryPressHandler = category => {
      return () => {
        return onCategoryPress(category);
      };
    };

    const renderRelatedCategories = () => {
      if (!relatedCategories) {
        return;
      }

      return relatedCategories.slice(0, 3).map((category, index) => (
        <View key={index} style={{ marginRight: 4 }}>
          <RecipeTagChip onPress={onCategoryPressHandler(category)}>
            {category}
          </RecipeTagChip>
        </View>
      ));
    };
    return (
      <TouchableHighlight
        onPress={onPressHandler}
        underlayColor={colors.secondary}
        activeOpacity={0.9}
      >
        <View style={{ marginBottom: 30 }}>
          <View style={{ marginBottom: 10 }}>
            <Image width={Dimensions.width} height={200} url={imageUrl} />
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text bold size="large">
              {name}
            </Text>
            <View style={{ marginBottom: 10 }}>
              <Rating readOnly={true} rating={rating} size={20} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start'
              }}
            >
              {renderRelatedCategories()}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export const RecipeCardSamples = () => {
  return (
    <View>
      <RecipeCard
        data={{
          name: 'Pho Ga (Vietnamese Chicken Noodle Soup)',
          description: `Simple breakfast recipes that make your day great. This recipe collection includes breakfast recipes with eggs, avocado recipes, smoothies and more`,
          imageUrl:
            'https://myfoodbook.com.au/sites/default/files/styles/recipe_3_col/public/recipe_photo/Brev20155486_0.jpg?itok=1osMdS-X'
        }}
      />
    </View>
  );
};


export default RecipeCard;