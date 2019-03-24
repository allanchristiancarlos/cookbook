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
// console.log(recipes.map.length);
// console.log(db.recipes.length);

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
//       'https://myfoodbook.com.au/recipes/show/avocado-pumpkin-salsa?recipeId=02757533-5a5b-b594-7452-12d02913487a',
//       'https://myfoodbook.com.au/recipes/show/dukkah-chicken-nourish-bowls?recipeId=050c83c5-3432-3a88-edd1-5b191c3a7dbb',
//       'https://myfoodbook.com.au/recipes/show/chicken-and-mushroom-baked-risotto?recipeId=0c200a68-3b8f-4d1f-fc95-6e9aaa361334',
//       'https://myfoodbook.com.au/recipes/show/caesar-salad-with-hot-smoked-salmon?recipeId=1a5f1d0a-c73c-08fa-204e-b837adfca7b8',
//       'https://myfoodbook.com.au/recipes/show/corn-chip-sliders-with-crumbed-fish-patties?recipeId=1bcfbf65-fc87-d032-1375-a6054ae78262',
//       'https://myfoodbook.com.au/recipes/show/dukkah-chicken-nourish-bowls?recipeId=1e9bf485-f50d-b439-c15b-1f3d5447d423',
//       'https://myfoodbook.com.au/recipes/show/roasted-mushroom-and-cauliflower-soup?recipeId=207427e9-19ef-27e4-1509-5bcf879ac3ea',
//       'https://myfoodbook.com.au/recipes/show/pork-and-mushroom-bacon-wrapped-patties?recipeId=231a1d54-d57c-57bc-53fd-5e3903bafd91',
//       'https://myfoodbook.com.au/recipes/show/mushroom-and-char-siu-pork-stir-fry?recipeId=2c225f70-87a2-0c30-1d5a-1cf6485c6c94',
//       'https://myfoodbook.com.au/recipes/show/mexican-chicken-and-rice-casserole?recipeId=2f294a03-ce3a-aa9a-c132-cf77e0281093',
//       'https://myfoodbook.com.au/recipes/show/chargrilled-herb-chicken-with-freekeh-and-peach-salad?recipeId=316cb4b2-937a-f41e-fb50-fd08ee90c712',
//       'https://myfoodbook.com.au/recipes/show/nonnas-bolognese-with-mushrooms-and-red-wine?recipeId=35281328-901b-09fa-cc64-5a16e9e624b0',
//       'https://myfoodbook.com.au/recipes/show/vietnamese-chicken-salad-0?recipeId=3f8861fd-3b67-ddd5-3f9f-48fb43fdbb3e',
//       'https://myfoodbook.com.au/recipes/show/one-pot-sausage-pasta?recipeId=44ee3f2f-dc03-74b5-03c6-f2360cd62969',
//       'https://myfoodbook.com.au/recipes/show/turkey-san-choy-bau?recipeId=50c660ca-cb7f-2332-a0a1-78eeb74f9635',
//       'https://myfoodbook.com.au/recipes/show/turkey-fajitas?recipeId=5316b4f2-3904-f196-35da-0b097ac5b332',
//       'https://myfoodbook.com.au/recipes/show/lemon-and-pepper-chicken-zucchini-slaw-pitas?recipeId=53b633b5-68bb-cf3c-6ab1-e52a10fbd695',
//       'https://myfoodbook.com.au/recipes/show/duck-rice-paper-rolls-with-asian-dipping-sauce?recipeId=59173212-f7b4-e131-82e9-0e648ff9a00f',
//       'https://myfoodbook.com.au/recipes/show/chicken-burger-with-maple-bacon?recipeId=5b2540ff-875a-278d-4c4d-c8142039f9c5',
//       'https://myfoodbook.com.au/recipes/show/easy-four-cheese-spaghetti-carbonara?recipeId=63975de0-8c33-5a6c-a49d-3903776acdea',
//       'https://myfoodbook.com.au/recipes/show/ham-cranberry-and-camembert-french-toasts?recipeId=66b9aff5-150a-2547-bea3-97c855ffe81d',
//       'https://myfoodbook.com.au/recipes/show/garlic-and-herb-ricotta-penne?recipeId=6b28486d-01dc-cd25-c09a-390d85176e79',
//       'https://myfoodbook.com.au/recipes/show/prawn-and-lime-sliders?recipeId=6f7ef1e0-c831-cb43-ae89-69060f1cc087',
//       'https://myfoodbook.com.au/recipes/show/lamb-burger-with-avocado-and-chilli-jam?recipeId=76f02df7-6e2c-5bc9-9c30-2326d77b6c67',
//       'https://myfoodbook.com.au/recipes/show/sweet-potato-pasta-bake-with-spinach-and-pine-nuts?recipeId=77c1944b-148f-e3c2-1583-37c2df2f0f6c',
//       'https://myfoodbook.com.au/recipes/show/bbq-mushroom-caprese-salad?recipeId=7e952e63-9e67-b8a1-31a2-72a3b024438b',
//       'https://myfoodbook.com.au/recipes/show/sun-dried-tomato-and-parmesan-crumbed-chicken-strips?recipeId=7f624499-62a4-9d86-f222-30200425589e',
//       'https://myfoodbook.com.au/recipes/show/the-avo-licious-pig?recipeId=836ad11a-e4a0-3486-9ce1-4acd9fcb02ec',
//       'https://myfoodbook.com.au/recipes/show/three-flavoured-butters-for-roasting-chicken-or-turkey?recipeId=afc1cae8-fc82-3580-d438-507bfe0cf962',
//       'https://myfoodbook.com.au/recipes/show/best-german-potato-salad?recipeId=b3287d22-338c-8f29-ec4e-36a642478ec1',
//       'https://myfoodbook.com.au/recipes/show/easy-watermelon-pizza?recipeId=bc10fea5-fd41-d130-2a38-6685fe88325c',
//       'https://myfoodbook.com.au/recipes/show/sweet-potato-wedges-with-dips?recipeId=c0b096fc-7ed2-7ace-c03b-63efd71e38fa',
//       'https://myfoodbook.com.au/recipes/show/chicken-schnitzel-and-eggplant-parmigiana?recipeId=c9f23826-10da-97af-1b08-d424f56775ad',
//       'https://myfoodbook.com.au/recipes/show/abc-bites-avocado-bacon-and-cheese?recipeId=cac6779d-a92e-a159-fed4-d037bbb61ab3',
//       'https://myfoodbook.com.au/recipes/show/minestrone?recipeId=cc4d2487-6973-31ee-8732-05bf6eaeea27',
//       'https://myfoodbook.com.au/recipes/show/mushroom-and-lamb-shank-pot-pies?recipeId=ddc71c51-1ce7-0cc2-1084-eeb9c57463a3',
//       'https://myfoodbook.com.au/recipes/show/chicken-and-mushroom-pie?recipeId=e204e7f1-5a09-9095-df40-6f6a4c09b45a',
//       'https://myfoodbook.com.au/recipes/show/mushrooms-and-ancient-grain-salad?recipeId=f8eec9e9-e0af-5c15-3a22-a2e5cbc38fec'
//     ],
//     'recipes.json'
//   )
//   .then(() => {
//     console.log('finished');
//   });
