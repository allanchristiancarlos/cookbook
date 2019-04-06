import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import Layout from '../../../Components/Layout';
import { Button, Text, TextBox } from '../../../Core';

class RecipeTextModal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      result: ''
    };
  }

  _handleChangeText = value => {
    this.setState(() => ({
      result: value
    }));
  };

  _handleButtonPress = () => {
    const { onResult } = this.props.navigation.state.params;
    onResult(this.state.result);
    this.props.navigation.goBack();
  };

  componentDidMount() {
    const { initialValue } = this.props.navigation.state.params;
    this.setState(() => ({
      result: initialValue
    }));
  }

  render() {
    const {
      label = 'Input',
      button = 'Save',
      multiline = false
    } = this.props.navigation.state.params;
    const textBoxProps = {};
    const { result } = this.state;

    if (multiline) {
      textBoxProps.multiline = true;
      textBoxProps.lines = 8;
    }
    return (
      <Layout>
        <View
          style={{
            flex: 1,
            flexDirection: 'column'
          }}
        >
          <View style={{ flex: 1, padding: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <Text size="small" bold letterCase="upper">
                {label}
              </Text>
            </View>
            <TextBox
              value={result}
              onChangeText={this._handleChangeText}
              {...textBoxProps}
            />
          </View>
          <View>
            <Button
              onPress={this._handleButtonPress}
              kind="primary"
              size="large"
              block
            >
              {button}
            </Button>
          </View>
        </View>
      </Layout>
    );
  }
}

export default RecipeTextModal;
