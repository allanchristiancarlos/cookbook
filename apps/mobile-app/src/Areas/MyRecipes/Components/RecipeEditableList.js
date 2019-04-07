import React from 'react';
import { View } from 'react-native';
import { Text, TappableText } from '../../../Core';

function RecipeEditableList(props) {
  const { items, onEdit, onDelete, renderItem } = props;
  return (
    <React.Fragment>
      {items.map((item, index) => (
        <View
          key={index}
          style={{
            paddingHorizontal: 10,
            marginBottom: 10,
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          <View style={{ marginRight: 10 }}>
            {renderItem ? renderItem() : <Text>- {item}</Text>}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TappableText onPress={() => onEdit(item, index)}>
              Edit
            </TappableText>
            <View style={{ marginHorizontal: 5 }}>
              <Text muted>|</Text>
            </View>
            <TappableText onPress={() => onDelete(index)}>Delete</TappableText>
          </View>
        </View>
      ))}
    </React.Fragment>
  );
}

export default RecipeEditableList;
