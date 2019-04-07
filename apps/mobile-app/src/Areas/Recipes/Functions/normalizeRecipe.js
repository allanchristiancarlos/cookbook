import { stringRemoveLineBreaks, stringToTitleCase } from '../../../Core';
export default function normalizeRecipe(recipe) {
  return {
    ...recipe,
    name: stringRemoveLineBreaks(stringToTitleCase(recipe.name))
  };
}
