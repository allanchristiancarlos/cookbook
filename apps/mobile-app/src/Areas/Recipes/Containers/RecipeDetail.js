import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Chip } from '../../../Components/Chip';
import { Section } from '../../../Components/Section';
import Rating from '../../../Components/Rating';
import { List, ListItem } from '../../../Components/List';
import { RecipeDetailHeader } from '../Components/RecipeDetailHeader';
import RecipeComment from '../Components/RecipeComment';
import { Text, Theme, Http, Button } from '../../../Core';
import WithRecipeNavigator from '../Hoc/WithRecipeNavigator';
import { of, forkJoin } from 'rxjs';

const { colors } = Theme;

class RecipeDetail extends Component {
  state = {
    recipe: {},
    comments: []
  };

  onRateHandler = rating => {
    const { id, rating: currentRating } = this.state.recipe;
    this.props.navigation.push('RateRecipe', {
      id: id,
      rating: rating,
      currentRating: currentRating
    });
  };

  onAddCommentHandler = () => {
    this.props.navigation.push('RecipeAddComment', {
      recipe: this.state.recipe,
      onCommentSaved: ({ id }) => {
        Http.get(`comments/${id}?_expand=user`).then(newComment => {
          this.setState(state => {
            return {
              ...state,
              comments: [...state.comments, newComment]
            };
          });
        });
      }
    });
  };

  onRateRecipeHandler = () => {
    this.onRateHandler(1);
  };

  componentDidMount() {
    const { recipe } = this.props.navigation.state.params;
    forkJoin(
      of(recipe),
      Http.get(`recipes/${recipe.id}/comments?_expand=user`)
    ).subscribe(([recipe, comments]) => {
      this.setState(() => ({
        recipe,
        comments
      }));
    });
  }

  render() {
    const { recipe, comments } = this.state;
    const { ingredients, steps, relatedCategories, occasions, rating } = recipe;

    const renderComments = () => {
      const hasComments = comments && comments.length > 0;

      const renderAddCommentButton = (
        <View
          style={{
            marginTop: 5,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Button onPress={this.onAddCommentHandler} look="bare" kind="primary">
            Add comment
          </Button>
        </View>
      );

      if (!hasComments) {
        return (
          <View>
            <Text muted>No comments.</Text>
            {renderAddCommentButton}
          </View>
        );
      }

      const commentsList = comments.map((comment, index) => {
        return <RecipeComment key={index} comment={comment} />;
      });

      return (
        <View>
          {commentsList}
          {renderAddCommentButton}
        </View>
      );
    };
    return (
      <ScrollView>
        <RecipeDetailHeader data={recipe} />
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
          <Section
            title="Rating"
            onAction={this.onRateRecipeHandler}
            action="Rate this recipe"
          >
            <Rating
              onPress={this.onRateHandler}
              readOnly={true}
              rating={rating}
              size={32}
            />
          </Section>
          <Section title="Comments">{renderComments()}</Section>
        </View>
      </ScrollView>
    );
  }
}

export default WithRecipeNavigator(RecipeDetail);
