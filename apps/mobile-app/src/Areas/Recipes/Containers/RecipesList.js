import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Http } from '../../../Core';
import { RecipeCard } from '../Components/RecipeCard';
import BaseRecipesListHOC from './BaseRecipesList';
import { normalizeRecipe } from '../Utils';

class RecipesList extends Component {
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
      <ScrollView>
        {data.map(x => (
          <RecipeCard
            key={x.id}
            data={x}
            onPress={() => this.props.onShowDetail(x)}
            onCategoryPress={this.props.onShowCategory}
          />
        ))}
      </ScrollView>
    );
  }
}

export default BaseRecipesListHOC(RecipesList);
