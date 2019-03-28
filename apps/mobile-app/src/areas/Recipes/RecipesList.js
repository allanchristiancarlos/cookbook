import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Http } from '../../core';
import { Layout } from '../../components/Layout';
import { RecipeCard } from './RecipeCard';

export class RecipesList extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    Http.get('http://192.168.1.30:3000/recipes?_page=1&_limit=50').then(x => {
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
            <RecipeCard key={x.id} data={x} />
          ))}
        </ScrollView>
      </Layout>
    );
  }
}
