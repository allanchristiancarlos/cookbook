import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Layout from '../../../Components/Layout';
import { Section } from '../../../Components/Section';
import FormLabel from '../../../Components/FormLabel';
import ToggleButton from '../../../Components/ToggleButton';
import RecipeEditableList from '../Components/RecipeEditableList';
import { TextBox, Button, Image, Http } from '../../../Core';
import { ImagePicker, Permissions } from 'expo';

const IMAGE_PICKER_OPTIONS = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: false,
  base64: true,
  aspect: [4, 3]
};

class NewRecipe extends Component {
  static navigationOptions = () => {
    return {
      title: 'New Recipe'
    };
  };

  static noImageUrl = 'https://placehold.it/100x100?text=no%20image';

  constructor(props) {
    super(props);

    this.state = {
      recipe: {
        difficulty: 'Easy',
        imageUrl: '',
        ingredients: [],
        steps: [],
        relatedCategories: [],
        occasions: [],
        name: '',
        cookTime: '',
        userId: 1
      },
      isLoading: false
    };
  }

  componentDidMount() {}

  _handleChangeNewIngredient = newIngredient => {
    this.setState(state => ({
      ...state,
      newIngredient
    }));
  };

  _handleAddIngredient = () => {
    if (!this.state.newIngredient) {
      return;
    }

    this._addStateListItem('ingredients', this.state.newIngredient);
    this.setState(
      state => ({
        ...state,
        newIngredient: ''
      }),
      () => {
        setTimeout(() => {
          this.newIngredientInput.focus();
        });
      }
    );
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
    if (!this.state.newOccasion) {
      return;
    }
    this._addStateListItem('occasions', this.state.newOccasion);
    this.setState(
      state => ({
        ...state,
        newOccasion: ''
      }),
      () => {
        setTimeout(() => {
          this.newOccasionInput.focus();
        });
      }
    );
  };

  _handleChangeNewOccasion = newOccasion => {
    this.setState(state => ({
      ...state,
      newOccasion
    }));
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

  _handleChangeNewCategory = newCategory => {
    this.setState(state => ({
      ...state,
      newCategory
    }));
  };

  _handleAddCategory = () => {
    if (!this.state.newCategory) {
      return;
    }
    this._addStateListItem('relatedCategories', this.state.newCategory);
    this.setState(
      state => ({
        ...state,
        newCategory: ''
      }),
      () => {
        setTimeout(() => {
          this.newCategoryInput.focus();
        });
      }
    );
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

  _handleChangeNewInstruction = newInstruction => {
    this.setState(state => ({
      ...state,
      newInstruction
    }));
  };

  _handleAddInstruction = () => {
    if (!this.state.newInstruction) {
      return;
    }
    this._addStateListItem('steps', this.state.newInstruction);
    this.setState(
      state => ({
        ...state,
        newInstruction: ''
      }),
      () => {
        setTimeout(() => {
          this.newInstructionInput.focus();
        }, 100);
      }
    );
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

  _handleChangeDescription = description => {
    this.setState(state => ({
      ...state,
      recipe: {
        ...state.recipe,
        description
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

  _handleSaveRecipe = () => {
    const { onSavedRecipe } = this.props.navigation.state.params;
    const newRecipe = { ...this.state.recipe };
    newRecipe.createdAt = new Date().toISOString();
    newRecipe.updatedAt = new Date().toISOString();
    this.setState(state => ({
      ...state,
      isLoading: true
    }));
    Http.post(`recipes`, newRecipe).then(({data: x}) => {
      if (onSavedRecipe) {
        onSavedRecipe(x);
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
    const {
      recipe,
      isLoading,
      newIngredient,
      newInstruction,
      newOccasion,
      newCategory
    } = this.state;
    const {
      name,
      difficulty,
      cookTime,
      imageUrl,
      ingredients,
      steps: instructions,
      relatedCategories: categories,
      occasions,
      description
    } = recipe;

    const hasName = !!name;
    const hasIngredients = (ingredients || []).length > 0;
    const hasDifficulty = !!difficulty;
    const hasCookTime = !!cookTime;

    const isValid = hasName && hasIngredients && hasDifficulty && hasCookTime;

    return (
      <Layout>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps="always">
              <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
                <Section title="Details">
                  <View style={{ marginBottom: 20 }}>
                    <FormLabel required>Recipe</FormLabel>
                    <TextBox
                      ref={input => (this.input = input)}
                      value={name}
                      onChangeText={this._handleChangeRecipe}
                      placeholder="Ravioli Pasta..."
                    />
                  </View>
                  <View style={{ marginBottom: 20 }}>
                    <FormLabel>Description</FormLabel>
                    <TextBox
                      value={description}
                      multiline={true}
                      lines={6}
                      onChangeText={this._handleChangeDescription}
                    />
                  </View>
                  <View style={{ marginBottom: 20 }}>
                    <FormLabel required>Photo</FormLabel>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      <View style={{ marginRight: 10 }}>
                        <Image
                          size="thumbnail"
                          url={imageUrl || NewRecipe.noImageUrl}
                        />
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
                    <FormLabel required>Difficulty</FormLabel>
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
                    <FormLabel required>Cook Time</FormLabel>
                    <TextBox
                      value={cookTime}
                      onChangeText={this._handleChangeCookTime}
                      placeholder="20 minutes..."
                    />
                  </View>
                </Section>
                <Section title="Ingredients" required>
                  <View style={{ marginBottom: 10 }}>
                    <RecipeEditableList
                      items={ingredients}
                      onEdit={this._handleEditIngredient}
                      onDelete={this._handleDeleteIngredient}
                    />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View style={{ flex: 1 }}>
                        <TextBox
                          ref={input => (this.newIngredientInput = input)}
                          value={newIngredient}
                          onChangeText={this._handleChangeNewIngredient}
                          onSubmitEditing={this._handleAddIngredient}
                          placeholder="Enter ingredient here..."
                        />
                      </View>
                      <Button
                        disabled={!newIngredient}
                        onPress={this._handleAddIngredient}
                        icon="md-add"
                        kind="primary"
                      />
                    </View>
                  </View>
                </Section>
                <Section title="Instructions">
                  <View style={{ marginBottom: 10 }}>
                    <RecipeEditableList
                      items={instructions}
                      onEdit={this._handleEditInstruction}
                      onDelete={this._handleDeleteInstruction}
                    />
                    <View style={{ marginBottom: 5 }}>
                      <TextBox
                        value={newInstruction}
                        ref={input => (this.newInstructionInput = input)}
                        multiline={true}
                        lines={6}
                        onChangeText={this._handleChangeNewInstruction}
                        placeholder={
                          instructions.length < 1
                            ? 'Enter first instruction...'
                            : 'Enter another instruction...'
                        }
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <View>
                        <Button
                          disabled={!newInstruction}
                          onPress={this._handleAddInstruction}
                          kind="primary"
                        >
                          Add Instruction
                        </Button>
                      </View>
                    </View>
                  </View>
                </Section>
                <Section title="Categories">
                  <View style={{ marginBottom: 10 }}>
                    <RecipeEditableList
                      items={categories}
                      onEdit={this._handleEditCategory}
                      onDelete={this._handleDeleteCategory}
                    />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View style={{ flex: 1 }}>
                        <TextBox
                          ref={input => (this.newCategoryInput = input)}
                          value={newCategory}
                          onChangeText={this._handleChangeNewCategory}
                          onSubmitEditing={this._handleAddCategory}
                          placeholder="Enter category here..."
                        />
                      </View>
                      <Button
                        disabled={!newCategory}
                        onPress={this._handleAddCategory}
                        icon="md-add"
                        kind="primary"
                      />
                    </View>
                  </View>
                </Section>
                <Section title="Occasions">
                  <View style={{ marginBottom: 10 }}>
                    <RecipeEditableList
                      items={occasions}
                      onEdit={this._handleEditOccasion}
                      onDelete={this._handleDeleteOccasion}
                    />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View style={{ flex: 1 }}>
                        <TextBox
                          ref={input => (this.newOccasionInput = input)}
                          value={newOccasion}
                          onChangeText={this._handleChangeNewOccasion}
                          onSubmitEditing={this._handleAddOccasion}
                          placeholder="Enter occasion here..."
                        />
                      </View>
                      <Button
                        disabled={!newOccasion}
                        onPress={this._handleAddOccasion}
                        icon="md-add"
                        kind="primary"
                      />
                    </View>
                  </View>
                </Section>
              </View>
            </ScrollView>
          </View>
          <View>
            <Button
              disabled={isLoading || !isValid}
              onPress={this._handleSaveRecipe}
              block
              size="large"
              kind="primary"
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
