import React, { Component } from 'react';
import Layout from '../../../Components/Layout';
import RecipesFlatList from '../Components/RecipesFlatList';
import RecipeCard from '../Components/RecipeCard';

class RecipesByCategory extends Component {
  static navigationOptions = ({ navigation }) => {
    const { category } = navigation.state.params;
    return {
      title: `Category: ${category}`
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
    const { category } = this.props.navigation.state.params;
    return (
      <Layout>
        <RecipesFlatList
          url={`recipes?relatedCategories_like=${category}`}
          renderItem={this._renderItem}
        />
      </Layout>
    );
  }
}

export default RecipesByCategory;
