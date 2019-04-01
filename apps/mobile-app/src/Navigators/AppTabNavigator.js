import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';
import NewRecipe from '../Areas/Recipes/Containers/NewRecipe';
import RecipesNavigator from './RecipesNavigator';
import CategoriesNavigator from './CategoriesNavigator';
import NewRecipeNavigator from './NewRecipeNavigator';
import { Theme } from '../Core';
import MyRecipesNavigator from './MyRecipesNavigator';

const { colors } = Theme;

const AppTabNavigator = createBottomTabNavigator(
  {
    HomeTab: {
      screen: RecipesNavigator,
      navigationOptions: () => ({
        title: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-home" size={24} style={{ color: tintColor }} />
        )
      })
    },
    CategoriesTab: {
      screen: CategoriesNavigator,
      navigationOptions: () => ({
        title: 'Categories',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="md-square-outline"
            size={24}
            style={{ color: tintColor }}
          />
        )
      })
    },
    NewRecipe: {
      screen: NewRecipeNavigator,
      navigationOptions: () => ({
        title: 'New Recipe',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="md-add-circle-outline"
            size={24}
            style={{ color: tintColor }}
          />
        ),
        tabBarVisible: false
      })
    },
    MyRecipesTab: {
      screen: MyRecipesNavigator,
      navigationOptions: () => ({
        title: 'My Recipes',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="md-clipboard"
            size={24}
            style={{ color: tintColor }}
          />
        )
      })
    },
    FavoritesTab: {
      screen: RecipesNavigator,
      navigationOptions: () => ({
        title: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-menu" size={24} style={{ color: tintColor }} />
        )
      })
    }
  },
  {
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.muted,
      showIcon: true
    },
    initialRouteName: 'HomeTab'
  }
);

export default AppTabNavigator;
