import React, { Fragment } from 'react';
import { RecipesList } from './src/areas/Recipes/RecipesList';
import { CategoriesList } from './src/areas/Categories/CategoriesList';

export default class App extends React.Component {
  render() {
    return (
      <Fragment>
        <RecipesList />
      </Fragment>
    );
  }
}
