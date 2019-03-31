import React, { Component } from 'react';
import { Http } from '../../../Core';
import { normalizeRecipe } from '../Utils';
import RecipesList from '../Components/RecipesList';
import WithRecipeNavigator from '../Hoc/WithRecipeNavigator';

class RecipesByCategory extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    const { category } = this.props.navigation.state.params;
    Http.get(`recipes?_limit=10&relatedCategories_like=${category}`).then(x => {
      this.setState(state => ({
        ...state,
        data: x.map(t => normalizeRecipe(t))
      }));
    });
  }

  render() {
    const { data } = this.state;

    return (
      <RecipesList
        data={data}
        onShowRecipe={this.props.navigateToRecipe}
        onShowCategory={this.props.navigateToCategory}
      />
    );
  }
}

export default WithRecipeNavigator(RecipesByCategory);
