import React from 'react';
import { Layout } from './src/core/Layout';
import { ButtonSamples } from './src/core/Button';
import { TextSamples } from './src/core/Text';
import { ImageSamples } from './src/core/Image';
import { ScrollView } from 'react-native';

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
    return (
      <Layout
        selectedTab={this.state.selectedTab}
        onTabPressed={this.onTabPressed}
      >
        <ScrollView>
          <ButtonSamples />
          <TextSamples />
          <ImageSamples />
        </ScrollView>
      </Layout>
    );
  }
}
