import React from 'react';
import { createStackNavigator } from 'react-navigation';
import NewRecipe from '../Areas/Recipes/Containers/NewRecipe';
import HeaderIconButton from '../Components/HeaderIconButton';
import { View } from 'react-native';

const NewRecipeNavigator = createStackNavigator(
  {
    NewRecipe: {
      screen: NewRecipe,
      navigationOptions: state => {
        const onPressHandler = () => {
          state.navigation.navigate('Recipes');
        };
        return {
          title: 'New Recipe',
          headerRight: (
            <View style={{ marginRight: 20 }}>
              <HeaderIconButton onPress={onPressHandler} icon="md-close" />
            </View>
          ),
          mode: 'modal'
        };
      }
    }
  },
  {
    mode: 'modal'
  }
);

export default NewRecipeNavigator;
