import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

function Layout(props) {
  const { children } = props;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      {children}
    </SafeAreaView>
  );
}

export default Layout;
