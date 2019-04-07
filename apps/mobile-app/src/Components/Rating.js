import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../Core';
import { View, TouchableOpacity } from 'react-native';
const { colors } = Theme;

function RatingStar(props) {
  const { onPress, kind, size = 28 } = props;
  const renderProps = {
    activeOpacity: 0.5
  };

  if (onPress) {
    renderProps.onPress = onPress;
  }

  let kindIcon = '';

  switch (kind) {
    case 'full':
      kindIcon = 'md-star';
      break;
    case 'half':
      kindIcon = 'md-star-half';
      break;
    default:
      kindIcon = 'md-star-outline';
      break;
  }

  return (
    <TouchableOpacity {...renderProps}>
      <Ionicons name={kindIcon} size={size} color={colors.primary} />
    </TouchableOpacity>
  );
}

class Rating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0
    };
  }

  onStarPress = starPosition => {
    const { readOnly = false, onPress } = this.props;
    const rating = starPosition + 1;

    if (onPress) {
      onPress(rating);
    }

    if (readOnly) {
      return;
    }

    this.setState(state => ({
      ...state,
      rating: rating
    }));
  };

  componentDidMount() {
    this.setState(state => ({
      ...state,
      rating: this.props.rating
    }));
  }

  componentWillReceiveProps({ rating }) {
    this.setState(state => ({
      ...state,
      rating: rating
    }));
  }

  render() {
    const { props } = this;
    const { size = 28 } = props;
    let rating = parseFloat(this.state.rating || 0);

    if (rating > 5) {
      rating = 5;
    }
    const fullStartCount = Math.floor(rating);
    const isWholeNo = rating % 1 === 0;
    const hasHalfStar = !isWholeNo && !!rating;
    const halfStarsCount = hasHalfStar ? 1 : 0;
    const emptyStarsCount = 5 - (fullStartCount + halfStarsCount);

    const createStartKind = (count, value) => {
      const items = [];
      for (let index = 0; index < count; index++) {
        items.push(index);
      }

      return items.map(i => value);
    };

    const starProps = {};

    starProps.onPress = index => {
      return () => this.onStarPress(index + 1);
    };

    const renderStars = () => {
      const stars = [
        ...createStartKind(fullStartCount, 'full'),
        ...createStartKind(halfStarsCount, 'half'),
        ...createStartKind(emptyStarsCount, '')
      ];

      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {stars.map((kind, i) => (
            <View key={i} style={{ marginRight: 4 }}>
              <RatingStar
                kind={kind}
                size={size}
                onPress={() => this.onStarPress(i)}
              />
            </View>
          ))}
        </View>
      );
    };

    return renderStars();
  }
}

export default Rating;
