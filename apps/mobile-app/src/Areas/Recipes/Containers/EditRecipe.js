import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Layout from '../../../Components/Layout';
import { Section } from '../../../Components/Section';
import ToggleButton from '../../../Components/ToggleButton';
import {
  Text,
  TextBox,
  Button,
  Image,
  TappableText,
  Http
} from '../../../Core';
import { ImagePicker, Permissions } from 'expo';

const IMAGE_PICKER_OPTIONS = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: false,
  base64: true,
  aspect: [4, 3]
};

class EditRecipeContainer extends Component {
  static navigationOptions = () => {
    return {
      title: 'Edit Recipe'
    };
  };

  static noImageUrl = 'https://placehold.it/100x100?text=no%20image';

  constructor(props) {
    super(props);

    this.state = {
      recipe: {
        difficulty: 'Easy',
        imageUrl: EditRecipeContainer.noImageUrl,
        ingredients: [],
        steps: [],
        relatedCategories: [],
        occasions: [],
        name: '',
        cookTime: ''
      },
      isLoading: false
    };
  }

  componentDidMount() {
    const { recipe } = this.props.navigation.state.params || {};

    if (recipe) {
      this.setState(state => ({
        ...state,
        recipe: recipe
      }));
    }
  }

  _handleAddIngredient = () => {
    this.props.navigation.navigate('RecipeTextModal', {
      title: 'Add Ingredient',
      label: 'Ingredient',
      button: 'Add',
      onResult: result => {
        this._addStateListItem('ingredients', result);
      }
    });
  };

  _handleEditIngredient = (ingredient, index) => {
    this.props.navigation.navigate('RecipeTextModal', {
      title: 'Edit Ingredient',
      label: 'Ingredient',
      button: 'Update',
      initialValue: ingredient,
      onResult: result => {
        this._editStateListItem('ingredients', result, index);
      }
    });
  };

  _handleDeleteIngredient = index => {
    this._deleteStateListItem('ingredients', index);
  };

  _handleAddOccasion = () => {
    this.props.navigation.navigate('RecipeTextModal', {
      title: 'Add Occasion',
      label: 'Occasion',
      button: 'Add',
      onResult: result => {
        this._addStateListItem('occasions', result);
      }
    });
  };

  _handleEditOccasion = (Occasion, index) => {
    this.props.navigation.navigate('RecipeTextModal', {
      title: 'Edit Occasion',
      label: 'Occasion',
      button: 'Update',
      initialValue: Occasion,
      onResult: result => {
        this._editStateListItem('occasions', result, index);
      }
    });
  };

  _handleDeleteOccasion = index => {
    this._deleteStateListItem('occasions', index);
  };

  _handleAddCategory = () => {
    this.props.navigation.navigate('RecipeTextModal', {
      title: 'Add Category',
      label: 'Category',
      button: 'Add',
      onResult: result => {
        this._addStateListItem('relatedCategories', result);
      }
    });
  };

  _handleEditCategory = (Category, index) => {
    this.props.navigation.navigate('RecipeTextModal', {
      title: 'Edit Category',
      label: 'Category',
      button: 'Update',
      initialValue: Category,
      onResult: result => {
        this._editStateListItem('relatedCategories', result, index);
      }
    });
  };

  _handleDeleteCategory = index => {
    this._deleteStateListItem('relatedCategories', index);
  };

  _handleAddInstruction = () => {
    this.props.navigation.navigate('RecipeTextModal', {
      title: 'Add Instruction',
      label: 'Instruction',
      button: 'Add',
      multiline: true,
      onResult: result => {
        this._addStateListItem('steps', result);
      }
    });
  };

  _handleEditInstruction = (instruction, index) => {
    this.props.navigation.navigate('RecipeTextModal', {
      title: 'Edit Instruction',
      label: 'Instruction',
      button: 'Update',
      multiline: true,
      initialValue: instruction,
      onResult: result => {
        this._editStateListItem('steps', result, index);
      }
    });
  };

  _handleDeleteInstruction = index => {
    this._deleteStateListItem('steps', index);
  };

  _deleteStateListItem(name, index) {
    this.setState(state => {
      const list = state.recipe[name];
      list.splice(index, 1);
      const newState = {
        ...state
      };
      newState.recipe[name] = [...list];
      return newState;
    });
  }

  _handleChangeRecipe = recipe => {
    this.setState(state => ({
      ...state,
      recipe: {
        ...state.recipe,
        name: recipe
      }
    }));
  };

  _handleChangeCookTime = cookTime => {
    this.setState(state => ({
      ...state,
      recipe: {
        ...state.recipe,
        cookTime
      }
    }));
  };

  _addStateListItem(name, value) {
    this.setState(state => {
      const list = state.recipe[name];
      const newState = {
        ...state
      };
      newState.recipe[name] = [...list, value];
      return newState;
    });
  }

  _editStateListItem(name, value, index) {
    this.setState(state => {
      const list = state.recipe[name];
      list.splice(index, 1, value);
      const newState = {
        ...state
      };
      newState.recipe[name] = [...list];
      return newState;
    });
  }

  _handleChangeDifficulty = value => {
    this.setState(state => ({
      ...state,
      recipe: {
        ...state.recipe,
        difficulty: value
      }
    }));
  };

  _handlePressChoosePhoto = () => {
    Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
      .then(() => ImagePicker.launchImageLibraryAsync(IMAGE_PICKER_OPTIONS))
      .then(({ cancelled, base64 }) => {
        if (cancelled) {
          return;
        }
        this._setImage(base64);
      });
  };

  _setImage(base64Image) {
    this.setState(state => ({
      ...state,
      recipe: {
        ...state.recipe,
        imageUrl: `data:image/jpeg;base64,${base64Image}`
      }
    }));
  }

  _handlePressTakePhoto = () => {
    Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
      .then(() => ImagePicker.launchCameraAsync(IMAGE_PICKER_OPTIONS))
      .then(({ cancelled, base64 }) => {
        if (cancelled) {
          return;
        }
        this._setImage(base64);
      });
  };

  _handleUpdateRecipe = () => {
    const { recipe, onSaveRecipe } = this.props.navigation.state.params;
    const updatedRecipe = { ...this.state.recipe };
    updatedRecipe.updatedAt = new Date().toISOString();
    this.setState(state => ({
      ...state,
      isLoading: true
    }));
    Http.patch(`recipes/${recipe.id}`, updatedRecipe).then(x => {
      if (onSaveRecipe) {
        onSaveRecipe(x);
      }
      this.setState(state => ({
        ...state,
        isLoading: false
      }));
      this.props.navigation.goBack();
    });
  };

  render() {
    const difficulties = ['Easy', 'Moderate', 'Difficult'];
    const { recipe, isLoading } = this.state;
    const {
      name,
      difficulty,
      cookTime,
      imageUrl,
      ingredients,
      steps: instructions,
      relatedCategories: categories,
      occasions
    } = recipe;
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
                    <TextBox
                      value={name}
                      onChangeText={this._handleChangeRecipe}
                      placeholder="Ravioli Pasta..."
                    />
                  </View>
                  <View style={{ marginBottom: 20 }}>
                    <View style={{ marginBottom: 10 }}>
                      <Text size="small" bold letterCase="upper">
                        Photo
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      <View style={{ marginRight: 10 }}>
                        <Image size="thumbnail" url={imageUrl} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Button
                          onPress={this._handlePressChoosePhoto}
                          size="small"
                          look="bare"
                          kind="primary"
                        >
                          Choose a Photo
                        </Button>
                        <Button
                          onPress={this._handlePressTakePhoto}
                          size="small"
                          look="bare"
                          kind="primary"
                        >
                          Take a Photo
                        </Button>
                      </View>
                    </View>
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
                            onPress={() => this._handleChangeDifficulty(item)}
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
                    <TextBox
                      value={cookTime}
                      onChangeText={this._handleChangeCookTime}
                      placeholder="20 minutes..."
                    />
                  </View>
                </Section>
                <Section title="Ingredients">
                  <View style={{ marginBottom: 10 }}>
                    <RecipeEditableList
                      items={ingredients}
                      onEdit={this._handleEditIngredient}
                      onDelete={this._handleDeleteIngredient}
                    />
                  </View>
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
                  <View style={{ marginBottom: 10 }}>
                    <RecipeEditableList
                      items={instructions}
                      onEdit={this._handleEditInstruction}
                      onDelete={this._handleDeleteInstruction}
                    />
                  </View>
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
                  <View style={{ marginBottom: 10 }}>
                    <RecipeEditableList
                      items={categories}
                      onEdit={this._handleEditCategory}
                      onDelete={this._handleDeleteCategory}
                    />
                  </View>
                  <Button
                    onPress={this._handleAddCategory}
                    icon="md-add"
                    look="bare"
                    kind="primary"
                  >
                    Add Category
                  </Button>
                </Section>
                <Section title="Occasions">
                  <View style={{ marginBottom: 10 }}>
                    <RecipeEditableList
                      items={occasions}
                      onEdit={this._handleEditOccasion}
                      onDelete={this._handleDeleteOccasion}
                    />
                  </View>
                  <Button
                    onPress={this._handleAddOccasion}
                    icon="md-add"
                    look="bare"
                    kind="primary"
                  >
                    Add Occasion
                  </Button>
                </Section>
              </View>
            </ScrollView>
          </View>
          <View>
            <Button
              disabled={isLoading}
              onPress={this._handleUpdateRecipe}
              block
              size="large"
              kind="primary"
            >
              {isLoading ? 'Updating Recipe...' : 'Update Recipe'}
            </Button>
          </View>
        </View>
      </Layout>
    );
  }
}

function RecipeEditableList(props) {
  const { items, onEdit, onDelete, renderItem } = props;
  return (
    <React.Fragment>
      {items.map((item, index) => (
        <View
          key={index}
          style={{
            paddingHorizontal: 10,
            marginBottom: 10,
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          <View style={{ marginRight: 10 }}>
            {renderItem ? renderItem() : <Text>- {item}</Text>}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TappableText onPress={() => onEdit(item, index)}>
              Edit
            </TappableText>
            <View style={{ marginHorizontal: 5 }}>
              <Text muted>|</Text>
            </View>
            <TappableText onPress={() => onDelete(index)}>Delete</TappableText>
          </View>
        </View>
      ))}
    </React.Fragment>
  );
}

export default EditRecipeContainer;
