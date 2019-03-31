import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Http } from '../../../Core';
import { RecipeCard } from '../Components/RecipeCard';
import { normalizeRecipe } from '../Utils';
import BaseRecipesListHOC from './BaseRecipesList';

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

export default BaseRecipesListHOC(RecipesByCategory);
