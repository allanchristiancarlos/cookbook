import React from 'react';

function WithRecipeNavigator(WrappedComponent) {
  return class extends React.Component {
    navigateToRecipes = () => {
      this.props.navigation.navigate('Recipes');
    };

    navigateToMyRecipesTab = () => {
      this.props.navigation.navigate('MyRecipesTab');
    };

    navigateToRecipe = recipe => {
      this.props.navigation.push('RecipeDetail', {
        recipe
      });
    };

    navigateToCategory = category => {
      this.props.navigation.push('RecipesByCategory', {
        category
      });
    };

    navigateToOccasion = occasion => {
      this.props.navigation.push('RecipesByOccasion', {
        occasion
      });
    };

    navigateToNewRecipe = () => {
      this.props.navigation.push('NewRecipe');
    };

    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return (
        <WrappedComponent
          navigateToCategory={this.navigateToCategory}
          navigateToRecipe={this.navigateToRecipe}
          navigateToOccasion={this.navigateToOccasion}
          navigateToMyRecipesTab={this.navigateToMyRecipesTab}
          navigateToRecipes={this.navigateToRecipes}
          {...this.props}
        />
      );
    }
  };
}

export default WithRecipeNavigator;
