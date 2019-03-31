import React from 'react';

function WithRecipeNavigator(WrappedComponent) {
  return class extends React.Component {
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

    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return (
        <WrappedComponent
          navigateToCategory={this.navigateToCategory}
          navigateToRecipe={this.navigateToRecipe}
          navigateToOccasion={this.navigateToOccasion}
          {...this.props}
        />
      );
    }
  };
}

export default WithRecipeNavigator;
