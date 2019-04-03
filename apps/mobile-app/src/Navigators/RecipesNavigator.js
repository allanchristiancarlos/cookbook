import React from 'react';
import { createStackNavigator } from 'react-navigation';
import RecipesByCategory from '../Areas/Recipes/Containers/RecipesByCategory';
import RecipesByOccasion from '../Areas/Recipes/Containers/RecipesByOccasion';
import Recipes from '../Areas/Recipes/Containers/Recipes';
import RateRecipe from '../Areas/Recipes/Containers/RateRecipe';
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
  RateRecipe,
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

RecipesNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'RateRecipe') {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    initialRouteName: 'Recipes',
    tabBarVisible
  };
}

export default RecipesNavigator;
