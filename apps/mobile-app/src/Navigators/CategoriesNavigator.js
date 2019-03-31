import { createStackNavigator } from 'react-navigation';
import CategoriesList from '../Areas/Categories/Containers/CategoriesList';

const CategoriesNavigator = createStackNavigator({
  CategoriesList: {
    screen: CategoriesList,
    navigationOptions: () => {
      return {
        title: 'Categories'
      };
    }
  }
});

export default CategoriesNavigator;
