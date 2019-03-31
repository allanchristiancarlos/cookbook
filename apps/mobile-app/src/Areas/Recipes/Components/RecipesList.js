import React from 'react';
import { ScrollView } from 'react-native';
import { RecipeCard } from './RecipeCard';

function RecipesList(props) {
  const { data: recipes, onShowRecipe, onShowCategory } = props;

  return (
    <ScrollView>
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

export default RecipesList;
