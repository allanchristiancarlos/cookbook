import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Layout from '../../../Components/Layout';
import { Section } from '../../../Components/Section';
import ToggleButton from '../../../Components/ToggleButton';
import { Text, TextBox, Button } from '../../../Core';

class EditRecipeContainer extends Component {
  static navigationOptions = () => {
    return {
      title: 'Edit Recipe'
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      difficulty: 'Easy'
    };
  }

  _handleAddIngredient = () => {
    this.props.navigation.navigate('RecipeTextModal', {
      title: 'Add Ingredient',
      label: 'Ingredient',
      button: 'Add',
      onResult: result => {
        console.log(result);
      }
    });
  };

  _handleChangeDifficulty = value => {
    this.setState(state => ({
      ...state,
      difficulty: value
    }));
  };

  _handleAddInstruction = () => {
    this.props.navigation.navigate('RecipeTextModal', {
      title: 'Add Instruction',
      label: 'Instruction',
      button: 'Add',
      multiline: true,
      onResult: result => {
        console.log(result);
      }
    });
  };

  render() {
    const difficulties = ['Easy', 'Moderate', 'Difficult'];
    const { difficulty } = this.state;
    return (
      <Layout>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
                <Section title="Details">
                  <View style={{ marginBottom: 20 }}>
                    <View style={{ marginBottom: 10 }}>
                      <Text size="small" bold letterCase="upper">
                        Recipe
                      </Text>
                    </View>
                    <TextBox placeholder="Ravioli Pasta..." />
                  </View>
                  <View style={{ marginBottom: 20 }}>
                    <View style={{ marginBottom: 10 }}>
                      <Text size="small" bold letterCase="upper">
                        Difficulty
                      </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      {difficulties.map((item, index) => (
                        <View key={index} style={{ flex: 1 }}>
                          <ToggleButton
                            onPress={() =>
                              this._handleChangeDifficulty(item)
                            }
                            block
                            active={item === difficulty}
                          >
                            {item}
                          </ToggleButton>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View>
                    <View style={{ marginBottom: 10 }}>
                      <Text size="small" bold letterCase="upper">
                        Cook Time
                      </Text>
                    </View>
                    <TextBox placeholder="20 minutes..." />
                  </View>
                </Section>
                <Section title="Ingredients">
                  <Button
                    onPress={this._handleAddIngredient}
                    icon="md-add"
                    look="bare"
                    kind="primary"
                  >
                    Add Ingredient
                  </Button>
                </Section>
                <Section title="Instructions">
                  <Button
                    onPress={this._handleAddInstruction}
                    icon="md-add"
                    look="bare"
                    kind="primary"
                  >
                    Add Instruction
                  </Button>
                </Section>
                <Section title="Categories">
                  <Button icon="md-add" look="bare" kind="primary">
                    Add Category
                  </Button>
                </Section>
                <Section title="Occasions">
                  <Button icon="md-add" look="bare" kind="primary">
                    Add Occasion
                  </Button>
                </Section>
              </View>
            </ScrollView>
          </View>
          <View>
            <Button block size="large" kind="primary">
              Update Recipe
            </Button>
          </View>
        </View>
      </Layout>
    );
  }
}

export default EditRecipeContainer;
