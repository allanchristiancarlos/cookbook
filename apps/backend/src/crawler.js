function getCategoryRecipe() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get('categoryId');
  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  return JSON.stringify(Array.from(document.querySelectorAll('.view-recipes-categories .node-recipe')).map((x, index) => {
    const id = guidGenerator();

    return {
      id: id,
      name: x.querySelector('.field-name-title').innerText,
      imageUrl: x.querySelector('.field-name-field-photo img').src,
      link: x.querySelector('.field-name-field-photo a').href + `?recipeId=${id}`,
      categoryId: categoryId
    }
  })).replace('[', '').replace(']', '')
}

getCategoryRecipe();

function getCategories() {
  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  return JSON.stringify(Array.from(document.querySelectorAll('.view-categories .view-content > .views-row')).map((x, index) => {
    const id = guidGenerator();
    return {
      id: id,
      name: x.querySelector('.field-name-title-category .field-item a').innerText,
      imageUrl: x.querySelector('.field-name-field-image img').src,
      description: x.querySelector('.taxonomy-term-description p').innerText,
      link: x.querySelector('.field-name-title-category .field-item a').href + `?categoryId=${id}`
    }
  }));
}