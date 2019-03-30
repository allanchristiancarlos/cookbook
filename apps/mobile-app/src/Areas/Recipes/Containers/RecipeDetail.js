import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Layout } from '../../../Components/Layout';
import { Chip } from '../../../Components/Chip';
import { Section } from '../../../Components/Section';
import { List, ListItem } from '../../../Components/List';
import { RecipeDetailHeader } from '../Components/RecipeDetailHeader';
import { Text, Theme, Http } from '../../../Core';

const { colors } = Theme;

export class RecipeDetail extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    Http.get('recipes/00d9ef60-b8a6-23f3-5910-b285db4435a8').then(x => {
      this.setState({
        data: x
      });
    });
  }

  render() {
    const data = this.state.data || {};
    const { ingredients, steps, relatedCategories } = data;
    return (
      <Layout>
        <ScrollView>
          <RecipeDetailHeader data={data} />
          <View style={{ paddingHorizontal: 20 }}>
            <Section title="Ingredients">
              <List>
                {(ingredients || []).map((x, index) => (
                  <ListItem key={index}>
                    <Text>{x}</Text>
                  </ListItem>
                ))}
              </List>
            </Section>
            <Section title="Steps">
              <List ordered={true}>
                {(steps || []).map((x, index) => (
                  <ListItem key={index}>
                    <Text>{x}</Text>
                  </ListItem>
                ))}
              </List>
            </Section>
            <Section title="Categories">
              <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                {(relatedCategories || []).map((x, index) => (
                  <View key={index} style={{ marginRight: 6, marginBottom: 6 }}>
                    <Chip
                      color={colors.primary}
                      backgroundColor={colors.secondary}
                    >
                      {x}
                    </Chip>
                  </View>
                ))}
              </View>
            </Section>
            <Section title="Rating" action="View All">
              <Text>No Rating</Text>
            </Section>
          </View>
        </ScrollView>
      </Layout>
    );
  }
}
