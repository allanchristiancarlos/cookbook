import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Http } from '../../../Core';
import { CategoryCard } from '../Components/CategoryCard';

class Categories extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Categories'
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  onViewCategory = category => {
    this.props.navigation.push('CategoryDetail', {
      category
    });
  };

  componentDidMount() {
    Http.get('categories?_page=1&_limit=50&_sort=name').then(({data: x}) => {
      this.setState(state => ({
        ...state,
        data: x
      }));
    });
  }

  render() {
    const { data } = this.state;

    return (
      <ScrollView>
        {data.map(x => (
          <View key={x.id} style={{ paddingVertical: 10 }}>
            <CategoryCard onPress={() => this.onViewCategory(x)} data={x} />
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default Categories;
