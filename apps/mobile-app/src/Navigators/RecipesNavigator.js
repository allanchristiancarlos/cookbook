import React from 'react';
import { createStackNavigator } from 'react-navigation';
import RecipesByCategory from '../Areas/Recipes/Containers/RecipesByCategory';
import RecipesByOccasion from '../Areas/Recipes/Containers/RecipesByOccasion';
import Recipes from '../Areas/Recipes/Containers/Recipes';
import RecipeDetail from '../Areas/Recipes/Containers/RecipeDetail';
import HeaderIconButton from '../Components/HeaderIconButton';
import { View } from 'react-native';

const RecipesNavigator = createStackNavigator({
  Recipes: {
    screen: Recipes,
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
          <View style={{ marginRight: 20 }}>
            <HeaderIconButton icon="md-heart-empty" />
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
        title: `Category: ${category}`
      };
    }
  },
  RecipesByOccasion: {
    screen: RecipesByOccasion,
    navigationOptions: ({ navigation }) => {
      const { occasion } = navigation.state.params;
      return {
        title: `Occassion: ${occasion}`
      };
    }
  }
});

export default RecipesNavigator;
