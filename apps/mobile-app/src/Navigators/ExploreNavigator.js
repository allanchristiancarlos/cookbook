import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Explore from '../Areas/Explore/Containers/Explore';
import HeaderIconButton from '../Components/HeaderIconButton';
import { View, TextInput } from 'react-native';
import { Theme } from '../Core';

const { colors, fontSizes } = Theme;
const ExploreNavigator = createStackNavigator({
  Explore: {
    screen: Explore,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeftContainerStyle: {
          flex: 1,
          width: '100%'
        },
        headerLeft: (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center'
            }}
          >
            <View style={{ flex: 1 }}>
              <TextInput
                onChangeText={navigation.getParam('onChangeText')}
                onSubmitEditing={navigation.getParam('onSearch')}
                placeholder="Search recipes here..."
                value={navigation.getParam('keyword')}
                style={{
                  height: 32,
                  paddingVertical: 3,
                  paddingHorizontal: 8,
                  borderRadius: 2,
                  fontWeight: '500',
                  fontSize: fontSizes.large
                  // backgroundColor: colors.secondary
                }}
              />
            </View>
            <View style={{ marginLeft: -22 }}>
              <HeaderIconButton
                onPress={navigation.getParam('onClear')}
                size={24}
                icon="md-close"
              />
            </View>
          </View>
        )
      };
    }
  }
});

export default ExploreNavigator;
