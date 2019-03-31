import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../Core';
import { View } from 'react-native';
const { colors } = Theme;

function Rating(props) {
  const { rating = 0, onPress, readOnly, size = 28 } = props;

  const fullStartsCount = Math.floor(rating);
  const isWholeNo = rating % 1 === 0;
  const hasHalfStar = !isWholeNo && !!rating;
  const halfStarsCount = hasHalfStar ? 1 : 0;
  const emptyStarsCount = 5 - (fullStartsCount + halfStarsCount);

  const loop = (count, fn) => {
    const items = [];
    for (let index = 0; index < count; index++) {
      items.push(index);
    }

    return items.map(i => fn(i));
  };

  const renderStars = () => {
    const fullStars = loop(fullStartsCount, i => (
      <Ionicons key={i} name="md-star" size={size} color={colors.primary} />
    ));
    const halfStars = loop(halfStarsCount, i => (
      <Ionicons
        key={i}
        name="md-star-half"
        size={size}
        color={colors.primary}
      />
    ));
    const emptyStars = loop(emptyStarsCount, i => (
      <Ionicons
        key={i}
        name="md-star-outline"
        size={size}
        color={colors.primary}
      />
    ));

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {fullStars}
        {halfStars}
        {emptyStars}
      </View>
    );
  };

  return renderStars();
}

export default Rating;
