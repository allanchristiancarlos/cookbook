import React from 'react';
import { View } from 'react-native';

export class NewPostContainer extends React.Component {
  render() {
    return <View>{this.props.children}</View>;
  }
}
