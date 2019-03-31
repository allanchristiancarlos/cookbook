import AppTabNavigator from './AppTabNavigator';
import { createSwitchNavigator } from 'react-navigation';
const AppNavigator = createSwitchNavigator({
  Main: AppTabNavigator
});

export default AppNavigator;