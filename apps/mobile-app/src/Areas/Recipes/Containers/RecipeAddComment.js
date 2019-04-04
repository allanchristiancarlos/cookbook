import React, { Component } from 'react';
import { Text, Button, TextBox, Http } from '../../../Core';
import { View } from 'react-native';

class RecipeAddComment extends Component {
  static navigationOptions = {
    title: 'Add Comment'
  };

  onSaveHandler = () => {
    const { recipe, onCommentSaved } = this.props.navigation.state.params;
    const { id } = recipe;
    this.setState((state) => ({
      ...state,
      isLoading: true
    }));
    Http.post(`recipes/${id}/comments`, {
      userId: 1, // todo: get current user
      comment: this.state.comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }).then(x => {
      this.setState((state) => ({
        ...state,
        isLoading: false
      }));
      onCommentSaved(x);
      this.props.navigation.goBack();
    });
  };

  onChangeCommentHandler = text => {
    this.setState(state => ({
      ...state,
      comment: text
    }));
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      comment: ''
    };
  }

  render() {
    const { isLoading = false } = this.state;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column'
        }}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <View
            style={{
              marginBottom: 20
            }}
          >
            <Text muted>Comment</Text>
          </View>
          <View>
            <TextBox
              onChangeText={this.onChangeCommentHandler}
              multiline={true}
              lines={8}
            />
          </View>
        </View>
        <View>
          <Button
            disabled={isLoading}
            onPress={this.onSaveHandler}
            kind="primary"
            size="large"
            block
          >
            {isLoading ? 'Saving Comment...' : 'Save Comment'}
          </Button>
        </View>
      </View>
    );
  }
}

export default RecipeAddComment;
