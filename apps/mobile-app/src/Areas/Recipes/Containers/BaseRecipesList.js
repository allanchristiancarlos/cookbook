import React from 'react';

function BaseRecipesListHOC(WrappedComponent) {
  return class extends React.Component {
    onShowDetail = recipe => {
      this.props.navigation.navigate('RecipeDetail', {
        recipe
      });
    };

    onShowCategory = category => {
      this.props.navigation.push('RecipesByCategory', {
        category
      });
    };

    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return (
        <WrappedComponent
          onShowCategory={this.onShowCategory}
          onShowDetail={this.onShowDetail}
          {...this.props}
        />
      );
    }
  };
}

export default BaseRecipesListHOC;
