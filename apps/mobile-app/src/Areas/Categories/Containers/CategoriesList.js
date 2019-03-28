import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Http } from '../../../Core';
import { Layout } from '../../../Components/Layout';
import { CategoryCard } from '../Components/CategoryCard';

export class CategoriesList extends Component {
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
      <Layout>
        <ScrollView>
          {data.map(x => (
            <CategoryCard key={x.id} data={x} />
          ))}
        </ScrollView>
      </Layout>
    );
  }
}
