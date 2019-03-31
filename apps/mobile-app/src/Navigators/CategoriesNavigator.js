import { createStackNavigator } from 'react-navigation';
import Categories from '../Areas/Categories/Containers/Categories';
import CategoryDetail from '../Areas/Categories/Containers/CategoryDetail';

const CategoriesNavigator = createStackNavigator({
  CategoriesList: {
    screen: Categories,
    navigationOptions: () => {
      return {
        title: 'Categories'
      };
    }
  },
  CategoryDetail: {
    screen: CategoryDetail,
    navigationOptions: ({ navigation }) => {
      const { category } = navigation.state.params;
      return {
        title: category.name
      };
    }
  }
});

export default CategoriesNavigator;
