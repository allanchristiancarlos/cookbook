import React from 'react';
import { Layout } from './src/Core/Layout';
import { PostsListContainer } from './src/Modules/Posts';

export default class App extends React.Component {
  state = {
    selectedTab: 'Home'
  };

  onTabPressed = (tab) => {
    this.setState(state => {
      return {
        ...state,
        selectedTab: tab
      };
    });
  };

  render() {
    return (
      <Layout
        selectedTab={this.state.selectedTab}
        onTabPressed={this.onTabPressed}
      >
        <PostsListContainer />
      </Layout>
    );
  }
}
