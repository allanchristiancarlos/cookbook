import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
export default class TabBarButton extends React.Component {
  componentDidMount() {
    this.refs.touch.setOpacityTo(10, 20);
  }
  render() {
    const { text, onPress, active } = this.props;
    
    return (
      <View
        style={{ flexBasis: 0, flexGrow: 1, height: '100%', maxWidth: '100%' }}
      >
        <TouchableOpacity ref="touch" style={{ height: '100%' }} onPress={onPress}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ fontSize: 11, fontWeight: active ? 'bold' : 'normal', color: active ? '#000000' : '#757575' }}>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>
      
    );
  }
}

TabBarButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  active: PropTypes.bool
};
