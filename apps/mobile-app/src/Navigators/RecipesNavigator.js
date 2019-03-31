import { createStackNavigator } from 'react-navigation';
import RecipesByCategory from '../Areas/Recipes/Containers/RecipesByCategory';
import RecipesList from '../Areas/Recipes/Containers/RecipesList';
import RecipeDetail from '../Areas/Recipes/Containers/RecipeDetail';


const RecipesNavigator = createStackNavigator({
  RecipesList: {
    screen: RecipesList,
    navigationOptions: () => {
      return {
        title: 'Recipes'
      };
    }
  },
  RecipeDetail: {
    screen: RecipeDetail,
    navigationOptions: () => {
      return {
        title: 'Recipe Details'
      };
    }
  },
  RecipesByCategory: {
    screen: RecipesByCategory,
    navigationOptions: ({ navigation }) => {
      const { category } = navigation.state.params;
      return {
        title: `#${category}`
      };
    }
  }
});

export default RecipesNavigator;
