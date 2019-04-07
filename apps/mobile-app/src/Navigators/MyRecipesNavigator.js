import createRecipesStackNavigator from './createRecipesStackNavigator';
import MyRecipes from '../Areas/Recipes/Containers/MyRecipes';
import NewRecipe from '../Areas/Recipes/Containers/NewRecipe';
import EditRecipe from '../Areas/Recipes/Containers/EditRecipe';
import RecipeTextModal from '../Areas/Recipes/Containers/RecipeTextModal';

const MyRecipesNavigator = createRecipesStackNavigator(
  {
    MyRecipes,
    NewRecipe,
    RecipeTextModal,
    EditRecipe
  },
  ['NewRecipe', 'RecipeTextModal', 'EditRecipe']
);

export default MyRecipesNavigator;
