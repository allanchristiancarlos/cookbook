import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Theme } from '../../../Core';
import Layout from '../../../Components/Layout';
import RecipesFlatList from '../../Recipes/Components/RecipesFlatList';
import RecipeCard from '../../Recipes/Components/RecipeCard';
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
      keyword: '',
      url: '',
      listLoaded: false
    };
  }

  onListFirstLoad = () => {
    this.setState(state => ({
      ...state,
      listLoaded: true
    }));
  };

  onSearch = ({ nativeEvent }) => {
    const { text: keyword } = nativeEvent;
    this.setState(
      state => ({
        ...state,
        url: `recipes?q=${keyword}`
      }),
      () => {
        const { listLoaded } = this.state;
        if (listLoaded) {
          this.list.refresh();
        }
      }
    );
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

  _renderItem = ({ item: recipe }) => {
    return (
      <RecipeCard
        data={recipe}
        onPress={() => this.onViewRecipe(recipe)}
        onCategoryPress={this.onViewCategory}
      />
    );
  };

  render() {
    const { url } = this.state;

    if (!url) {
      return !null;
    }

    return (
      <Layout>
        <RecipesFlatList
          onLoadInitial={this.onListFirstLoad}
          ref={list => (this.list = list)}
          url={url}
          renderItem={this._renderItem}
        />
      </Layout>
    );
  }
}

export default Search;
