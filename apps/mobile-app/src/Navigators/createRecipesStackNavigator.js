import { createStackNavigator } from 'react-navigation';
import RecipesByCategory from '../Areas/Recipes/Containers/RecipesByCategory';
import RecipesByOccasion from '../Areas/Recipes/Containers/RecipesByOccasion';
import RateRecipe from '../Areas/Recipes/Containers/RateRecipe';
import RecipeAddComment from '../Areas/Recipes/Containers/RecipeAddComment';
import RecipeDetail from '../Areas/Recipes/Containers/RecipeDetail';

function createRecipesStackNavigator(routes, routesWithoutTab) {
  const stackNavigator = createStackNavigator({
    ...routes,
    RecipeDetail,
    RateRecipe,
    RecipeAddComment,
    RecipesByCategory,
    RecipesByOccasion
  });

  stackNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 1) {
      const withoutTab = [
        'RateRecipe',
        'RecipeAddComment',
        ...(routesWithoutTab || [])
      ];
      navigation.state.routes.map(route => {
        if (withoutTab.indexOf(route.routeName) !== -1) {
          tabBarVisible = false;
        } else {
          tabBarVisible = true;
        }
      });
    }

    return {
      tabBarVisible
    };
  };

  return stackNavigator;
}

export default createRecipesStackNavigator;
