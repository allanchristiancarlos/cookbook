import React, { Component } from 'react';
import Layout from '../../../Components/Layout';
import RecipesFlatList from '../Components/RecipesFlatList';
import RecipeCard from '../Components/RecipeCard';

class RecipesByOccasion extends Component {
  static navigationOptions = ({ navigation }) => {
    const { occasion } = navigation.state.params;
    return {
      title: `Occassion: ${occasion}`
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
    const { occasion } = this.props.navigation.state.params;
    return (
      <Layout>
        <RecipesFlatList
          url={`recipes?occasions_like=${occasion}`}
          renderItem={this._renderItem}
        />
      </Layout>
    );
  }
}

export default RecipesByOccasion;
