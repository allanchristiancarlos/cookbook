import React from 'react';
import { createStackNavigator } from 'react-navigation';
import RecipesByCategory from '../Areas/Recipes/Containers/RecipesByCategory';
import RecipesByOccasion from '../Areas/Recipes/Containers/RecipesByOccasion';
import Recipes from '../Areas/Recipes/Containers/Recipes';
import RateRecipe from '../Areas/Recipes/Containers/RateRecipe';
import RecipeAddComment from '../Areas/Recipes/Containers/RecipeAddComment';
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
  RecipeDetail,
  RateRecipe,
  RecipeAddComment,
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

RecipesNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    const routesWithoutTab = ['RateRecipe', 'RecipeAddComment'];
    navigation.state.routes.map(route => {
      if (routesWithoutTab.indexOf(route.routeName) !== -1) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    initialRouteName: 'Recipes',
    tabBarVisible,
    headerMode: 'none'
  };
};

export default RecipesNavigator;
