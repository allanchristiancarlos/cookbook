import React from 'react';
import { createStackNavigator } from 'react-navigation';
import RecipesByCategory from '../Areas/Recipes/Containers/RecipesByCategory';
import RecipesByOccasion from '../Areas/Recipes/Containers/RecipesByOccasion';
import Recipes from '../Areas/Recipes/Containers/Recipes';
import RecipeDetail from '../Areas/Recipes/Containers/RecipeDetail';
import HeaderIconButton from '../Components/HeaderIconButton';
import { View } from 'react-native';
import MyRecipes from '../Areas/Recipes/Containers/MyRecipes';

const MyRecipesNavigator = createStackNavigator({
  MyRecipes: {
    screen: MyRecipes,
    navigationOptions: () => {
      return {
        title: 'My Recipes'
      };
    }
  }
});

export default MyRecipesNavigator;
