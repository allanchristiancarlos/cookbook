import React, { Fragment } from 'react';
import { RecipesList } from './src/Areas/Recipes/Containers/RecipesList';
import { NewRecipe } from './src/Areas/Recipes/Containers/NewRecipe';
import { RecipeDetail } from './src/Areas/Recipes/Containers/RecipeDetail';
import { CategoriesList } from './src/Areas/Categories/Containers/CategoriesList';

export default class App extends React.Component {
  render() {
    return (
      <Fragment>
        <RecipeDetail />
      </Fragment>
    );
  }
}
