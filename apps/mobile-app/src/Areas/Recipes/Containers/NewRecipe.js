import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, TextBox, Button, Http } from '../../../Core';
import Layout from '../../../Components/Layout';

class NewRecipe extends Component {
  static navigationOptions = () => {
    return {
      title: 'New Recipe',
      tabBarVisible: false
    };
  };
  state = {
    name: '',
    cookTime: '',
    difficulty: '',
    description: '',
    isLoading: false
  };

  defaultRecipe = {
    name: '',
    cookTime: '',
    cookTimeRaw: 0,
    difficulty: '',
    description: '',
    imageUrl:
      'https://myfoodbook.com.au/sites/default/files/styles/recipe_3_col/public/recipe_photo/Brev20155486_0.jpg?itok=1osMdS-X',
    categoryId: '1f4f2b16-8985-6d45-5749-bfa1f588727f',
    occasions: ['Winter', 'Chinese New Year', 'Dinner Party', 'Autumn'],
    relatedCategories: ['Dinner', 'Soups', 'Noodles'],
    rating: null,
    serving: 4,
    prepTimeRaw: null,
    prepTime: null,
    steps: ['Simmer', 'Fry'],
    ingredients: ['Onion', 'Rings'],
    userId: 1
  };

  onNameChange = name => {
    this.setState(state => ({
      ...state,
      name
    }));
  };

  onCookTimeChange = cookTimeRaw => {
    this.setState(state => ({
      ...state,
      cookTimeRaw,
      cookTime: cookTimeRaw.toString()
    }));
  };

  onDifficultyChange = difficulty => {
    this.setState(state => ({
      ...state,
      difficulty
    }));
  };

  onDescriptionChange = description => {
    this.setState(state => ({
      ...state,
      description
    }));
  };

  onSaveRecipe = () => {
    this.setState(state => ({
      ...state,
      isLoading: true
    }));

    const { isLoading, ...form } = this.state;
    const recipe = { ...this.defaultRecipe, ...form };

    Http.post('recipes', recipe).then(response => {
      this.setState(state => ({
        isLoading: false
      }));
      this.props.navigateToMyRecipesTab();
    });
  };

  render() {
    const { isLoading, name, difficulty, description, cookTime } = this.state;

    return (
      <Layout>
        <View
          style={{
            flex: 1,
            flexDirection: 'column'
          }}
        >
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ padding: 20 }}>
                <View style={{ marginBottom: 10 }}>
                  <Text size="small" muted bold letterCase="upper">
                    Name
                  </Text>
                  <TextBox value={name} onChangeText={this.onNameChange} />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Text size="small" muted bold letterCase="upper">
                    Cook Time
                  </Text>
                  <TextBox
                    value={cookTime}
                    onChangeText={this.onCookTimeChange}
                  />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Text size="small" muted bold letterCase="upper">
                    Difficulty
                  </Text>
                  <TextBox
                    value={difficulty}
                    onChangeText={this.onDifficultyChange}
                  />
                </View>
                <View style={{ marginBottom: 20 }}>
                  <Text size="small" muted bold letterCase="upper">
                    Description
                  </Text>
                  <TextBox
                    value={description}
                    onChangeText={this.onDescriptionChange}
                    multiline={true}
                    lines={6}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
          <View>
            <Button
              disabled={isLoading}
              onPress={this.onSaveRecipe}
              kind="primary"
              size="large"
              block
            >
              {isLoading ? 'Saving Recipe...' : 'Save Recipe'}
            </Button>
          </View>
        </View>
      </Layout>
    );
  }
}

export default NewRecipe;
