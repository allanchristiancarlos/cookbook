import React from 'react';
import { View } from 'react-native';
import { Text } from '../Core';

function FormLabel(props) {
  const { required = false, children } = props;
  return (
    <View style={{ marginBottom: 10, flexDirection: 'row' }}>
      <Text size="small" bold letterCase="upper">
        {children}
      </Text>
      {required ? (
        <View style={{ marginLeft: 2 }}>
          <Text danger size="small" bold>
            *
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export default FormLabel;
