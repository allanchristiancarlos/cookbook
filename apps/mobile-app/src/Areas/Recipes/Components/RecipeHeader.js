import React, { Component } from 'react';
import { RecipeRatingChip } from '../Components/RecipeRatingChip';
import { ContentHeader } from '../../../Components/ContentHeader';

export const RecipeHeader = props => {
  return (
    <ContentHeader title={name} imageUrl={imageUrl}>
      <Text size="small" muted>
        Posted by: {userName}
      </Text>
      <RecipeRatingChip rating={rating} />
    </ContentHeader>
  );
};
