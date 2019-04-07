import createRecipesStackNavigator from './createRecipesStackNavigator';
import CategoryDetail from '../Areas/Categories/Containers/CategoryDetail';
import Categories from '../Areas/Categories/Containers/Categories';

const CategoriesNavigator = createRecipesStackNavigator({
  Categories,
  CategoryDetail
});

export default CategoriesNavigator;
