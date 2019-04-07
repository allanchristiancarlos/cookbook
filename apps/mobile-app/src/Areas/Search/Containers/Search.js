import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Http, Theme } from '../../../Core';
import normalizeRecipe from '../../Recipes/Functions/normalizeRecipe';
import RecipesList from '../../Recipes/Components/RecipesList';
import HeaderIconButton from '../../../Components/HeaderIconButton';

class Search extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeftContainerStyle: {
        flex: 1,
        width: '100%'
      },
      headerLeft: (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 20,
            alignItems: 'center'
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              autoFocus={true}
              onChangeText={navigation.getParam('onChangeText')}
              onSubmitEditing={navigation.getParam('onSearch')}
              placeholder="Search recipes here..."
              value={navigation.getParam('keyword')}
              style={{
                height: 32,
                paddingVertical: 3,
                paddingHorizontal: 8,
                borderRadius: 2,
                fontWeight: '500',
                fontSize: Theme.fontSizes.large
              }}
            />
          </View>
          <View style={{ marginLeft: -22 }}>
            <HeaderIconButton
              onPress={navigation.getParam('onClear')}
              size={24}
              icon="md-close"
            />
          </View>
        </View>
      )
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      keyword: ''
    };

    this.recipesListRef = React.createRef();
  }

  onSearch = ({ nativeEvent }) => {
    const { text: keyword } = nativeEvent;
    Http.get(`recipes?_page=1&_limit=20&q=${keyword}`).then(x => {
      this.setState(state => ({
        ...state,
        data: x.map(t => normalizeRecipe(t))
      }));
      this.recipesListRef.current.scrollToTop();
    });
  };

  onClear = () => {
    this.setState(state => ({
      ...state,
      keyword: ''
    }));
    this.props.navigation.setParams({
      ...this.props.navigation.state.params,
      keyword: ''
    });
  };

  onViewRecipe = recipe => {
    this.props.navigation.push('RecipeDetail', {
      recipe
    });
  };

  onViewCategory = category => {
    this.props.navigation.push('RecipesByCategory', {
      category
    });
  };

  onChangeText = text => {
    this.setState(state => ({
      ...state,
      keyword: text
    }));
    this.props.navigation.setParams({
      ...this.props.navigation.state.params,
      keyword: text
    });
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onChangeText: this.onChangeText,
      onSearch: this.onSearch,
      onClear: this.onClear,
      keyword: this.state.keyword
    });
  }

  render() {
    const { data } = this.state;

    return (
      <RecipesList
        ref={this.recipesListRef}
        data={data}
        onShowRecipe={this.onViewRecipe}
        onShowCategory={this.onViewCategory}
      />
    );
  }
}

export default Search;
