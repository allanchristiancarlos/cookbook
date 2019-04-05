import React, { Component } from 'react';
import { Http } from '../../../Core';
import RecipesList from '../Components/RecipesList';
import { normalizeRecipe } from '../Utils';
import WithRecipeNavigator from '../Hoc/WithRecipeNavigator';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';

class Recipes extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    Http.get('recipes?_page=1&_limit=20').then(x => {
      this.setState(state => ({
        ...state,
        data: x.map(t => normalizeRecipe(t))
      }));
    });
  }

  render() {
    const { data } = this.state;

    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <RecipesList
          data={data}
          onShowRecipe={this.props.navigateToRecipe}
          onShowCategory={this.props.navigateToCategory}
        />
      </SafeAreaView>
    );
  }
}

export default WithRecipeNavigator(Recipes);
