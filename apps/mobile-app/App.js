import React from 'react';
import { Layout } from './src/core/Layout';
import { ButtonSamples, Button } from './src/core/Button';
import { TextSamples, Text } from './src/core/Text';
import { ImageSamples, Image } from './src/core/Image';
import { ScrollView, View, Dimensions, TouchableHighlight } from 'react-native';

import { theme } from './src/core/Theme';
const { colors } = theme;

export default class App extends React.Component {
  state = {
    selectedTab: 'Home'
  };

  onTabPressed = tab => {
    this.setState(state => {
      return {
        ...state,
        selectedTab: tab
      };
    });
  };

  render() {
    const test = () => {
      console.log('test');
    };
    return (
      <Layout
        selectedTab={this.state.selectedTab}
        onTabPressed={this.onTabPressed}
      >
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10
            }}
          >
            <View style={{ marginRight: 15 }}>
              <Image
                width={100}
                height={100}
                url="https://myfoodbook.com.au/sites/default/files/styles/recipe_3_col/public/recipe_photo/Brev20155486_0.jpg?itok=1osMdS-X"
              />
            </View>
            <View>
              <View style={{ marginBottom: 10 }}>
                <Text size="large">#ChineseNewYear</Text>
                <Text size="small" muted>
                  Hoisin sauce, sriracha sauce
                </Text>
              </View>
              <Button size="small">Follow</Button>
            </View>
          </View>
          {[1, 2, 3].map(index => (
            <TouchableHighlight
              onPress={test}
              underlayColor={colors.lightGray}
              activeOpacity={0.9}
              key={index}
            >
              <View style={{ marginBottom: 30 }}>
                <View style={{ marginBottom: 10 }}>
                  <Image
                    width={Dimensions.width}
                    height={200}
                    url="https://myfoodbook.com.au/sites/default/files/styles/recipe_3_col/public/recipe_photo/Brev20155486_0.jpg?itok=1osMdS-X"
                  />
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text size="large">Egg and Prosquito Breakfast Pizza</Text>
                  <View style={{ marginTop: 6 }}>
                    <Text size="small" muted>
                      Simple breakfast recipes that make your day great. This
                      recipe collection includes breakfast recipes with eggs,
                      avocado recipes, smoothies and more
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          ))}
          <ButtonSamples />
          <TextSamples />
          <ImageSamples />
        </ScrollView>
      </Layout>
    );
  }
}
