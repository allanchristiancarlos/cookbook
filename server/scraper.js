const recipeScraper = require('./recipe.scraper');
const db = require('./db.json');

const currentCount = db.recipes.indexOf(
  db.recipes.find(x => x.id === '78ef2a56-9ea2-103e-02b6-e4a2c397314f')
);
const lastIndex = db.recipes.indexOf(
  db.recipes.find(x => x.id === '8610970a-21e3-802c-1d27-9477a3d7bbbb')
);
recipeScraper
  .scrapeMany(
    [
      'https://myfoodbook.com.au/recipes/show/pear-chia-and-spice-smoothie?recipeId=8610970a-21e3-802c-1d27-9477a3d7bbbb'
    ],
    'recipes.json'
  )
  .then(() => {
    console.log('finished');
  });
