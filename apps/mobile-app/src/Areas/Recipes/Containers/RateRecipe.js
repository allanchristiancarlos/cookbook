import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button, Http } from '../../../Core';
import Rating from '../../../Components/Rating';

class RateRecipe extends Component {
  static navigationOptions = {
    title: 'Rate Recipe'
  };

  constructor(props) {
    super(props);

    this.state = {
      rating: 0
    };
  }

  onRateHandler = rate => {
    this.setState(state => ({
      ...state,
      rating: rate
    }));
  };

  onSaveHandler = () => {
    const { rating } = this.state;
    const { id, currentRating } = this.props.navigation.state.params;
    const isCurrentRatingZero = (currentRating || 0) === 0;
    const divisor = isCurrentRatingZero ? 1 : 2;
    // simple to average rating computation
    const averageRating = (currentRating + rating) / divisor;
    this.setState(state => ({
      ...state,
      isLoading: true
    }));
    Http.patch(`recipes/${id}`, {
      rating: averageRating
    }).then(() => {
      this.setState(state => ({
        ...state,
        isLoading: false
      }));
      this.props.navigation.goBack();
    });
  };

  componentDidMount() {
    const { rating } = this.props.navigation.state.params;
    this.setState(state => ({
      ...state,
      rating: rating
    }));
  }

  render() {
    const { rating, isLoading = false } = this.state;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column'
        }}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <View
            style={{
              marginBottom: 30,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text muted>Please press your rating below.</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Rating
              onPress={this.onRateHandler}
              readOnly={false}
              rating={rating}
              size={42}
            />
          </View>
        </View>
        <View>
          <Button
            onPress={this.onSaveHandler}
            kind="primary"
            size="large"
            block
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </View>
      </View>
    );
  }
}

export default RateRecipe;
