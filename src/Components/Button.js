import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
export default function Button(props) {
  return (
    <View>
      <TouchableHighlight>
        <Text>{props.text}</Text>
      </TouchableHighlight>
    </View>
  );
}
