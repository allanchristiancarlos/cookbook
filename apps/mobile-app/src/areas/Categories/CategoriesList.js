import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Http } from '../../core';
import { Layout } from '../../components/Layout';
import { CategoryCard } from './CategoryCard';

export class CategoriesList extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    Http.get(
      'http://192.168.1.30:3000/categories?_page=1&_limit=50&_sort=name'
    ).then(x => {
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
          {data.map((x) => (
            <CategoryCard key={x.id} data={x} />
          ))}
        </ScrollView>
      </Layout>
    );
  }
}
