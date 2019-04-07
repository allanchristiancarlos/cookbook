import createRecipesStackNavigator from './createRecipesStackNavigator';
import MyRecipes from '../Areas/MyRecipes/Containers/MyRecipes';
import NewRecipe from '../Areas/MyRecipes/Containers/NewRecipe';
import EditRecipe from '../Areas/MyRecipes/Containers/EditRecipe';
import RecipeTextModal from '../Areas/MyRecipes/Containers/RecipeTextModal';

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
