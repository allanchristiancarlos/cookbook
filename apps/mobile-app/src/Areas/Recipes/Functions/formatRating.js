import { numberFormatMaxDecimalPlaces } from '../../../Core';

export default function formatRating(rating) {
  return numberFormatMaxDecimalPlaces(rating, 1);
}