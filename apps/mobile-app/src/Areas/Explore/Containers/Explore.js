import React, { Component } from 'react';
import { Http } from '../../../Core';
import { normalizeRecipe } from '../../Recipes/Utils';
import RecipesList from '../../Recipes/Components/RecipesList';

class Explore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      keyword: ''
    };

    this.testRef = React.createRef();
  }

  onSearch = ({ nativeEvent }) => {
    const { text: keyword } = nativeEvent;
    Http.get(`recipes?_page=1&_limit=20&q=${keyword}`).then(x => {
      this.setState(state => ({
        ...state,
        data: x.map(t => normalizeRecipe(t))
      }));
      this.testRef.current.scrollToTop();
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
        ref={this.testRef}
        data={data}
        onShowRecipe={this.props.navigateToRecipe}
        onShowCategory={this.props.navigateToCategory}
      />
    );
  }
}

export default Explore;
