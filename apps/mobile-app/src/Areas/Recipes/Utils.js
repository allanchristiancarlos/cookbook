import { stringRemoveLineBreaks, stringToTitleCase } from '../../Core';
export function normalizeRecipe(recipe) {
  return {
    ...recipe,
    name: stringRemoveLineBreaks(stringToTitleCase(recipe.name))
  };
}
