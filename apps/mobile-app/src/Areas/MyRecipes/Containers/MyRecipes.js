import React, { Component } from 'react';
import { Http, Theme } from '../../../Core';
import { View, FlatList } from 'react-native';
import normalizeRecipe from '../../Recipes/Functions/normalizeRecipe';
import MyRecipeCard from '../Components/MyRecipeCard';
import HeaderIconButton from '../../../Components/HeaderIconButton';
import Layout from '../../../Components/Layout';
import Swipeout from 'react-native-swipeout';

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

  _handleEdit = (recipe, index) => {
    return () => {
      this.props.navigation.push('EditRecipe', {
        recipe,
        onSavedRecipe: updatedRecipe => {
          this.setState(state => {
            const recipes = [...state.data];
            recipes.splice(index, 1, updatedRecipe);
            return {
              ...state,
              data: recipes
            };
          });
        }
      });
    };
  };

  _handleViewRecipe = recipe => {
    this.props.navigation.push('RecipeDetail', {
      recipe
    });
  };

  onNewRecipeHandler = () => {
    this.props.navigation.push('NewRecipe', {
      onSavedRecipe: this.onSavedRecipe
    });
  };

  onSavedRecipe = recipe => {
    this.setState(state => ({
      ...state,
      data: [recipe, ...state.data]
    }));
  };

  componentDidMount() {
    this.props.navigation.setParams({
      newRecipe: this.onNewRecipeHandler
    });
    Http.get('user/1/recipes?_page=1&_limit=20').then(x => {
      this.setState(state => ({
        ...state,
        data: x.map(t => normalizeRecipe(t))
      }));
    });
  }

  _handleDelete = (recipe, index) => {
    return () => {
      const recipeToDelete = { ...recipe };

      this.setState(state => {
        const recipes = [...state.data];
        recipes.splice(index, 1);
        return {
          ...state,
          data: recipes
        };
      });

      Http.delete(`recipes/${recipe.id}`).catch(() => {
        // on error revert the deleted item on list
        this.setState(state => {
          const recipes = [...state.data];
          recipes.splice(1, 0, recipeToDelete);
          return {
            ...state,
            data: recipes
          };
        });
      });
    };
  };

  _renderItem = ({ item: recipe, index }) => {
    return (
      <Swipeout
        key={recipe.id}
        buttonWidth={100}
        autoClose={true}
        right={[
          {
            text: 'Edit',
            backgroundColor: Theme.colors.primary,
            color: Theme.colors.white,
            onPress: this._handleEdit(recipe, index)
          },
          {
            text: 'Delete',
            backgroundColor: Theme.colors.danger,
            color: Theme.colors.white,
            onPress: this._handleDelete(recipe, index)
          }
        ]}
      >
        <MyRecipeCard
          data={recipe}
          onPress={() => this._handleViewRecipe(recipe, index)}
        />
      </Swipeout>
    );
  };

  _keyExtractor = item => item.id;

  render() {
    const { data: recipes } = this.state;

    return (
      <Layout>
        <FlatList
          data={recipes}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </Layout>
    );
  }
}

export default MyRecipes;
