import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Http } from '../../../Core';
import Layout from '../../../Components/Layout';
import RecipesList from '../Components/RecipesList';
import { RecipeCard } from '../Components/RecipeCard';
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
    Http.get('recipes?_page=1&_limit=20').then(({data, headers}) => {
      this.setState(state => ({
        ...state,
        data: data.map(t => normalizeRecipe(t))
      }));
    });
  }

  _renderItem = ({ item: recipe, index }) => {
    return <RecipeCard data={recipe} />;
  };

  _keyExtractor = item => item.id;

  _next = t => {
    console.log({ t });
  };

  render() {
    const { data } = this.state;

    return (
      <Layout>
        <FlatList
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onEndReached={this._next}
        />
      </Layout>
    );
  }
}

export default Recipes;
