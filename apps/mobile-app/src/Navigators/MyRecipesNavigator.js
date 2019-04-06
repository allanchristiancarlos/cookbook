import { createStackNavigator } from 'react-navigation';
import MyRecipes from '../Areas/Recipes/Containers/MyRecipes';
import NewRecipe from '../Areas/Recipes/Containers/NewRecipe';
import RecipesByCategory from '../Areas/Recipes/Containers/RecipesByCategory';
import RecipesByOccasion from '../Areas/Recipes/Containers/RecipesByOccasion';
import RateRecipe from '../Areas/Recipes/Containers/RateRecipe';
import RecipeAddComment from '../Areas/Recipes/Containers/RecipeAddComment';
import EditRecipeContainer from '../Areas/Recipes/Containers/EditRecipe';
import RecipeDetail from '../Areas/Recipes/Containers/RecipeDetail';
import RecipeTextModal from '../Areas/Recipes/Containers/RecipeTextModal';

const MyRecipesNavigator = createStackNavigator({
  MyRecipes,
  NewRecipe,
  RecipeDetail,
  RateRecipe,
  RecipeAddComment,
  RecipesByCategory,
  RecipesByOccasion,
  RecipeTextModal,
  EditRecipeContainer
});

MyRecipesNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    const routesWithoutTab = [
      'NewRecipe',
      'RateRecipe',
      'RecipeAddComment',
      'RecipeTextModal',
      'EditRecipeContainer'
    ];
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
    tabBarVisible
  };
};

export default MyRecipesNavigator;
