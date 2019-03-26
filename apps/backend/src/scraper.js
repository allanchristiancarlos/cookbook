const recipeScraper = require('./recipe.scraper');
const db = require('./db.json');
const recipes = require('./recipes.json');
const lodash = require('lodash');
const fs = require('fs');
const path = require('path');

const first = lodash
  .chain(recipes)
  .sortBy(x => x.id)
  .value();
const dbRecipes = lodash
  .chain(db.recipes)
  .sortBy(x => x.id)
  .value();
const diff = lodash.difference(dbRecipes, first).map(o => {
  return db.recipes.find(x => x.id === o);
});
// console.log({
//   db: JSON.stringify(dbRecipes), 
//   first: JSON.stringify(first)
// });
const final = first.map(x => {
  const y = dbRecipes.find(o => o.id === x.id);
  return {
    ...x,
    ...y
  };
});
fs.writeFile(path.join(__dirname, 'temp.json'), JSON.stringify(final), () => {
  console.log(final.length);
});

// const currentCount = db.recipes.indexOf(
//   db.recipes.find(x => x.id === '78ef2a56-9ea2-103e-02b6-e4a2c397314f')
// );
// const lastIndex = db.recipes.indexOf(
//   db.recipes.find(x => x.id === '8610970a-21e3-802c-1d27-9477a3d7bbbb')
// );
// recipeScraper
//   .scrapeMany(
//     [
//       'https://myfoodbook.com.au/recipes/show/chicken-parmigiana-using-ham?recipeId=0140cf8b-97b8-9420-c435-26ff67756b41',
//     ],
//     'recipes.json'
//   )
//   .then(() => {
//     console.log('finished');
//   });
