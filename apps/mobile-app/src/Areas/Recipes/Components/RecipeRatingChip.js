import React from 'react';
import { Chip } from '../../../Components/Chip';
import { Theme } from '../../../Core';

const { colors } = Theme;

export const RecipeRatingChip = props => {
  let { rating } = props;
  rating = parseFloat(rating);
  let color = colors.white;
  if (rating <= 5 && rating >= 4) {
    backgroudColor = colors.success;
  } else if (rating <= 3.99 && rating >= 3) {
    backgroudColor = '#b7dd28';
  } else if (rating <= 2.99 && rating >= 2) {
    backgroudColor = '#fee134';
  } else if (rating <= 1.99 && rating >= 1) {
    backgroudColor = '#fee134';
  } else {
    backgroudColor = colors.secondary;
    color = colors.white;
  }
  return (
    <Chip background={backgroudColor} color={color}>
      {rating}/5
    </Chip>
  );
};
