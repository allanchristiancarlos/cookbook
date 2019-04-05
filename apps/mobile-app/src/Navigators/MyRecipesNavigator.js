import { createStackNavigator } from 'react-navigation';
import MyRecipes from '../Areas/Recipes/Containers/MyRecipes';
import NewRecipe from '../Areas/Recipes/Containers/NewRecipe';

const MyRecipesNavigator = createStackNavigator({
  MyRecipes,
  NewRecipe
});

MyRecipesNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    const routesWithoutTab = ['NewRecipe'];
    navigation.state.routes.map(route => {
      if (routesWithoutTab.indexOf(route.routeName) !== -1) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    initialRouteName: 'MyRecipes',
    tabBarVisible,
    headerMode: 'none'
  };
};

export default MyRecipesNavigator;
