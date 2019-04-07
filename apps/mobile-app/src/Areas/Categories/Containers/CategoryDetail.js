import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Http } from '../../../Core';
import CategoryDetailHeader from '../Components/CategoryDetailHeader';
import RecipesList from '../../../Areas/Recipes/Components/RecipesList';

class CategoryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { category } = navigation.state.params;
    return {
      title: category.name
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  onViewRecipe = recipe => {
    this.props.navigation.push('RecipeDetail', {
      recipe
    });
  };

  onViewCategory = category => {
    this.props.navigation.push('RecipesByCategory', {
      category
    });
  };

  componentDidMount() {
    const { category } = this.props.navigation.state.params;

    this.setState({
      data: {
        ...category,
        recipes: []
      }
    });

    Http.get(`categories/${category.id}/recipes?_limit=10`).then(({ data: recipes}) => {
      this.setState(state => ({
        ...state,
        data: {
          ...state.data,
          recipes
        }
      }));
    });
  }

  render() {
    const data = this.state.data || {};
    const { recipes } = data || {};

    return (
      <ScrollView>
        <CategoryDetailHeader data={data} />
        <RecipesList
          data={recipes}
          onShowRecipe={this.onViewRecipe}
          onShowCategory={this.onViewCategory}
        />
      </ScrollView>
    );
  }
}

export default CategoryDetail;
