import React, { Component } from 'react';
import { Layout } from '../../../Components/Layout';
import { Text, TextBoxSamples } from '../../../Core';
import { View, ScrollView } from 'react-native';

export class NewRecipe extends Component {
  render() {
    return (
      <Layout>
        <ScrollView>
          <TextBoxSamples />
          <Text>TEst</Text>
        </ScrollView>
      </Layout>
    );
  }
}
