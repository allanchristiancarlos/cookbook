import React, { Component } from 'react';
import { Http } from '../../../Core';
import RecipesList from '../Components/RecipesList';
import { normalizeRecipe } from '../Utils';
import WithRecipeNavigator from '../Hoc/WithRecipeNavigator';

class RecipesByOccasion extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    const { occasion } = this.props.navigation.state.params;
    Http.get(`recipes?_limit=10&occasions_like=${occasion}`).then(x => {
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

export default WithRecipeNavigator(RecipesByOccasion);
