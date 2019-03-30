import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Layout } from '../../../Components/Layout';
import { ContentHeader } from '../../../Components/ContentHeader';
import { Chip } from '../../../Components/Chip';
import { Section } from '../../../Components/Section';
import { List, ListItem } from '../../../Components/List';
import { Text, Theme, Http, stringToTitleCase, stringRemoveLineBreaks } from '../../../Core';

const { colors } = Theme;

export class RecipeDetail extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    Http.get('recipes/008d0db2-b2c1-d5d8-50c8-10dd3a496cf4').then(x => {
      this.setState({
        data: x
      });
    });
  }

  render() {
    const {
      name,
      rating,
      imageUrl,
      ingredients,
      steps,
      relatedCategories,
      difficulty,
      prepTime
    } = this.state.data || {};
    const meta = [
      {
        label: 'Rating',
        value: rating || 'N/A'
      },
      {
        label: 'Difficulty',
        value: difficulty || 'N/A'
      },
      {
        value: prepTime || 'N/A',
        label: 'Cook Time'
      }
    ];
    return (
      <Layout>
        <ScrollView>
          <ContentHeader
            title={stringToTitleCase(stringRemoveLineBreaks(name))}
            imageUrl={imageUrl}
            meta={meta}
          />
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
              <View
                style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}
              >
                {(relatedCategories || []).map((x, index) => (
                  <View
                    key={index}
                    style={{ marginRight: 6, marginBottom: 6 }}
                  >
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
