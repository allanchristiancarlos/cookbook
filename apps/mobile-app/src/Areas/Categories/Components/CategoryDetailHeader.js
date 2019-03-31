import React from 'react';
import { ContentHeader } from '../../../Components/ContentHeader';

export default function CategoryDetailHeader(props) {
  const { data } = props;
  const { name, imageUrl, recipes, description } = data;
  const recipesCount = (recipes || []).length;
  const meta = [
    {
      label: 'Recipes',
      value: recipesCount || 'N/A'
    }
  ];

  return (
    <ContentHeader
      title={name}
      description={description}
      imageUrl={imageUrl}
      meta={meta}
    />
  );
}
