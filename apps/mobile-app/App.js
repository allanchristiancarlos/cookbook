import React, { Fragment } from 'react';
import { RecipesList } from './src/Areas/Recipes/Containers/RecipesList';
import { CategoriesList } from './src/Areas/Categories/Containers/CategoriesList';

export default class App extends React.Component {
  render() {
    return (
      <Fragment>
        <RecipesList />
      </Fragment>
    );
  }
}
