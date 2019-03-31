import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Chip } from '../../../Components/Chip';
import { Section } from '../../../Components/Section';
import Rating from '../../../Components/Rating';
import { List, ListItem } from '../../../Components/List';
import { RecipeDetailHeader } from '../Components/RecipeDetailHeader';
import { Text, Theme } from '../../../Core';
import WithRecipeNavigator from '../Hoc/WithRecipeNavigator';

const { colors } = Theme;

class RecipeDetail extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    const { recipe } = this.props.navigation.state.params;
    this.setState({
      data: recipe
    });
  }

  render() {
    const data = this.state.data || {};
    const { ingredients, steps, relatedCategories, occasions, rating } = data;
    return (
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
              {(relatedCategories || []).map((category, index) => (
                <View key={index} style={{ marginRight: 6, marginBottom: 6 }}>
                  <Chip
                    color={colors.primary}
                    backgroundColor={colors.secondary}
                    onPress={() => this.props.navigateToCategory(category)}
                  >
                    {category}
                  </Chip>
                </View>
              ))}
            </View>
          </Section>
          <Section title="Occasions">
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
              {(occasions || []).map((occasion, index) => (
                <View key={index} style={{ marginRight: 6, marginBottom: 6 }}>
                  <Chip
                    color={colors.primary}
                    backgroundColor={colors.secondary}
                    onPress={() => this.props.navigateToOccasion(occasion)}
                  >
                    {occasion}
                  </Chip>
                </View>
              ))}
            </View>
          </Section>
          <Section title="Rating">
            <Rating rating={rating} />
          </Section>
          <Section title="Comments" action="View All">
            <Text muted>No comments.</Text>
          </Section>
        </View>
      </ScrollView>
    );
  }
}

export default WithRecipeNavigator(RecipeDetail);
