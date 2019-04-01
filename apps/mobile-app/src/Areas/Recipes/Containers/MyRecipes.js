import React, { Component } from 'react';
import { Http } from '../../../Core';
import RecipesList from '../Components/RecipesList';
import { normalizeRecipe } from '../Utils';
import WithRecipeNavigator from '../Hoc/WithRecipeNavigator';

class MyRecipes extends Component {
  state = {
    data: []
  };

  componentWillUnmount() {
    console.log('iasdasd');
  }

  componentDidMount() {
    Http.get('user/1/recipes?_page=1&_limit=20').then(x => {
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

export default WithRecipeNavigator(MyRecipes);
