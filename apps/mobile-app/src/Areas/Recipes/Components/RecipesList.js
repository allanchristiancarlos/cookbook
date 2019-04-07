import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import RecipeCard from './RecipeCard';

class RecipesList extends Component {
  constructor(props) {
    super(props);
    this.scrollView = React.createRef();

    this.scrollToTop = () => {
      if (!this.scrollView.current) {
        return;
      }

      this.scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
    };
  }
  render() {
    const { data: recipes, onShowRecipe, onShowCategory } = this.props;

    return (
      <ScrollView ref={this.scrollView}>
        {(recipes || []).map(recipe => (
          <RecipeCard
            key={recipe.id}
            data={recipe}
            onPress={() => onShowRecipe(recipe)}
            onCategoryPress={onShowCategory}
          />
        ))}
      </ScrollView>
    );
  }
}

export default RecipesList;
