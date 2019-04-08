import React from 'react';
import { ActivityIndicator as BaseActivityIndicator } from 'react-native';
import { Theme } from '../Core';

class ActivityIndicator extends React.PureComponent {
  render() {
    return (
      <BaseActivityIndicator color={Theme.colors.primary} {...this.props} />
    );
  }
}

export default ActivityIndicator;
