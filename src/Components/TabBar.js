import React from 'react';
import { View } from 'react-native';
export default function TabBar({ children }) {
  return <View style={{ height: '100%', flexWrap: 'wrap', flexDirection: 'row', borderTopWidth: 0.4, borderTopColor: '#e0e0e0'}}>{children}</View>;
}
