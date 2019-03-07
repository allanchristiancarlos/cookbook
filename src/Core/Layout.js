import React from 'react';
import { View, StatusBar } from 'react-native';
import TabBar from '../Components/TabBar';
import TabBarButton from '../Components/TabBarButton';
import TopBar from './TopBar';

export class Layout extends React.Component {
  render() {
    const { children, onTabPressed, selectedTab } = this.props;
    const tabBarButtonPressed = e => {
      return clickEvent => {
        onTabPressed(e, clickEvent);
      };
    };

    const activeTab = (selectedTab || '').toLowerCase();

    const buttons = ['Home', 'Search', 'New'].map((button, index) => {
      const isActive = button.toLowerCase() === activeTab;
      return (
        <TabBarButton
          key={index}
          active={isActive}
          onPress={tabBarButtonPressed(button)}
          icon={button}
          text={button}
        />
      );
    });

    return (
      <React.Fragment>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: StatusBar.currentHeight }}>
            <TopBar />
          </View>
          <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
            {children}
          </View>
          <View style={{ height: 48 }}>
            <TabBar>{buttons}</TabBar>
          </View>
        </View>
      </React.Fragment>
    );
  }
}
