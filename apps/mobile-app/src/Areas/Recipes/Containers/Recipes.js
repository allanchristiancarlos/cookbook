import React, { Component } from 'react';
import { Http } from '../../../Core';
import Layout from '../../../Components/Layout';
import RecipesList from '../Components/RecipesList';
import normalizeRecipe from '../Functions/normalizeRecipe';

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

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

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
      <Layout>
        <RecipesList
          data={data}
          onShowRecipe={this.onViewRecipe}
          onShowCategory={this.onViewCategory}
        />
      </Layout>
    );
  }
}

export default Recipes;
