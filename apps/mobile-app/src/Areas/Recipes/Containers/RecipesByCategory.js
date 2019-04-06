import React, { Component } from 'react';
import { Http } from '../../../Core';
import { normalizeRecipe } from '../Utils';
import RecipesList from '../Components/RecipesList';

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

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

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
        onShowRecipe={this.onViewRecipe}
        onShowCategory={this.onViewCategory}
      />
    );
  }
}

export default RecipesByCategory;
