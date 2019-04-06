import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';
import RecipesNavigator from './RecipesNavigator';
import CategoriesNavigator from './CategoriesNavigator';
import NewRecipeNavigator from './NewRecipeNavigator';
import MyRecipesNavigator from './MyRecipesNavigator';
import ExploreNavigator from './ExploreNavigator';
import { Theme } from '../Core';

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
    ExploreTab: {
      screen: ExploreNavigator,
      navigationOptions: () => ({
        title: 'Explore',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-compass" size={24} style={{ color: tintColor }} />
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
