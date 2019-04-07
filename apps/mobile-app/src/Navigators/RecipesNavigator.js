import createRecipesStackNavigator from './createRecipesStackNavigator';
import Recipes from '../Areas/Recipes/Containers/Recipes';

const RecipesNavigator = createRecipesStackNavigator(
  {
    Recipes
  }
);

export default RecipesNavigator;
