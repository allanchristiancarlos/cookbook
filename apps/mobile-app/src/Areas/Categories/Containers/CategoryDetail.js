import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import CategoryDetailHeader from '../Components/CategoryDetailHeader';
import { Http } from '../../../Core';
import RecipesList from '../../../Areas/Recipes/Components/RecipesList';
import WithCategoryNavigator from '../Hoc/WithCategoryNavigator';

class CategoryDetail extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    const { category } = this.props.navigation.state.params;

    this.setState({
      data: {
        ...category,
        recipes: []
      }
    });

    Http.get(`categories/${category.id}/recipes?_limit=10`).then(recipes => {
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
          onShowRecipe={this.props.navigateToRecipe}
          onShowCategory={this.props.navigateToCategory}
        />
      </ScrollView>
    );
  }
}

export default WithCategoryNavigator(CategoryDetail);
