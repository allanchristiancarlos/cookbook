import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';
import NewRecipe from '../Areas/Recipes/Containers/NewRecipe';
import RecipesNavigator from './RecipesNavigator';
import CategoriesNavigator from './CategoriesNavigator';
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
    CategoriesTab: {
      screen: CategoriesNavigator,
      navigationOptions: () => ({
        title: 'Categories',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-filing" size={24} style={{ color: tintColor }} />
        )
      })
    },
    NewRecipe: {
      screen: NewRecipe,
      navigationOptions: () => ({
        headerTitle: 'New Recipe',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-add" size={24} style={{ color: tintColor }} />
        ),
        tabBarVisible: false
      })
    },
    MyRecipesTab: {
      screen: RecipesNavigator,
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
        title: 'Favorites',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-heart" size={24} style={{ color: tintColor }} />
        )
      })
    }
  },
  {
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.muted,
      showIcon: true
    }
  }
);

export default AppTabNavigator;