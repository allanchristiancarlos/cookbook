import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import RecipesByCategory from '../Areas/Recipes/Containers/RecipesByCategory';
import RecipesList from '../Areas/Recipes/Containers/RecipesList';
import RecipeDetail from '../Areas/Recipes/Containers/RecipeDetail';
import { Theme } from '../Core';
import { View } from 'react-native';

const { colors } = Theme;

const RecipesNavigator = createStackNavigator({
  RecipesList: {
    screen: RecipesList,
    navigationOptions: () => {
      return {
        title: 'Recipes'
      };
    }
  },
  RecipeDetail: {
    screen: RecipeDetail,
    navigationOptions: () => {
      return {
        title: 'Recipe Details',
        headerRight: (
          <View style={{marginRight: 20}}>
            <Ionicons
              name="md-heart-empty"
              size={28}
              color={colors.textColor}
            />
          </View>
        )
      };
    }
  },
  RecipesByCategory: {
    screen: RecipesByCategory,
    navigationOptions: ({ navigation }) => {
      const { category } = navigation.state.params;
      return {
        title: `#${category}`
      };
    }
  }
});

export default RecipesNavigator;
