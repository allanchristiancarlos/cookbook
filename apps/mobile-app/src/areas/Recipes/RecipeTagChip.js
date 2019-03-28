import React from 'react';
import { Chip } from '../../components/Chip';
import { Theme } from '../../core';

const { colors } = Theme;

export const RecipeTagChip = props => {
  const { children } = props;
  return (
    <Chip background={colors.secondary} color={colors.textColor}>
      #{children}
    </Chip>
  );
};
