import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Http } from '../../../Core';
import { CategoryCard } from '../Components/CategoryCard';
import WithCategoryNavigator from '../Hoc/WithCategoryNavigator';

class Categories extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    Http.get('categories?_page=1&_limit=50&_sort=name').then(x => {
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
            <CategoryCard
              onPress={() => this.props.navigateToCategoryDetail(x)}
              data={x}
            />
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default WithCategoryNavigator(Categories);
