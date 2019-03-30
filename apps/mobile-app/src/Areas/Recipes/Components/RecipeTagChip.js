import React from 'react';
import { Chip } from '../../../Components/Chip';
import { Theme } from '../../../Core';

const { colors } = Theme;

export const RecipeTagChip = props => {
  const { children } = props;
  return (
    <Chip size="small" background={colors.secondary} color={colors.textColor}>
      #{children}
    </Chip>
  );
};
