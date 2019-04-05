import React, { Component } from 'react';
import { Http, Theme } from '../../../Core';
import { ScrollView, View } from 'react-native';
import { normalizeRecipe } from '../Utils';
import MyRecipeCard from '../Components/MyRecipeCard';
import HeaderIconButton from '../../../Components/HeaderIconButton';

class MyRecipes extends Component {
  static navigationOptions = ({ navigation }) => {
    const newRecipe = navigation.getParam('newRecipe');
    return {
      title: 'My Recipes',
      headerRight: (
        <View style={{ marginRight: 20 }}>
          <HeaderIconButton
            onPress={newRecipe}
            icon="md-add"
            colors={Theme.colors.primary}
          />
        </View>
      )
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  onNewRecipe = () => {
    this.props.navigation.push('NewRecipe');
  };

  componentDidMount() {
    this.props.navigation.setParams({
      newRecipe: this.onNewRecipe
    });
    Http.get('user/1/recipes?_page=1&_limit=20').then(x => {
      this.setState(state => ({
        ...state,
        data: x.map(t => normalizeRecipe(t))
      }));
    });
  }

  render() {
    const { data: recipes } = this.state;

    return (
      <ScrollView>
        {(recipes || []).map(recipe => (
          <MyRecipeCard key={recipe.id} data={recipe} />
        ))}
      </ScrollView>
    );
  }
}

export default MyRecipes;
