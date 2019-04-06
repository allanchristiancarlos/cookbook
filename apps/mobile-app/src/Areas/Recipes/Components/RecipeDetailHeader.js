import React from 'react';
import { ContentHeader } from '../../../Components/ContentHeader';
import formatRating from '../Functions/formatRating';

export const RecipeDetailHeader = props => {
  const { data } = props;
  const { name, rating, imageUrl, difficulty, prepTime } = data;

  const meta = [
    {
      label: 'Rating',
      value: formatRating(rating) || 'N/A'
    },
    {
      label: 'Difficulty',
      value: difficulty || 'N/A'
    },
    {
      value: prepTime || 'N/A',
      label: 'Cook Time'
    }
  ];

  return <ContentHeader title={name} imageUrl={imageUrl} meta={meta} />;
};
