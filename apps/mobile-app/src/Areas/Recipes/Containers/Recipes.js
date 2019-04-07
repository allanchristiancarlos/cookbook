import React, { Component } from 'react';
import Layout from '../../../Components/Layout';
import RecipesFlatList from '../Components/RecipesFlatList';
import RecipeCard from '../Components/RecipeCard';

class Recipes extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Recipes'
    };
  };

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

  _renderItem = ({ item: recipe }) => {
    return (
      <RecipeCard
        data={recipe}
        onPress={() => this.onViewRecipe(recipe)}
        onCategoryPress={this.onViewCategory}
      />
    );
  };

  render() {
    return (
      <Layout>
        <RecipesFlatList
          url="recipes"
          renderItem={this._renderItem}
        />
      </Layout>
    );
  }
}

export default Recipes;
