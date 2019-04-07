import React, { Component } from 'react';
import { Http } from '../../../Core';
import RecipesList from '../Components/RecipesList';
import normalizeRecipe from '../Functions/normalizeRecipe';

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

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

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
        onShowRecipe={this.onViewRecipe}
        onShowCategory={this.onViewCategory}
      />
    );
  }
}

export default RecipesByOccasion;
