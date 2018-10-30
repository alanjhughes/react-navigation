import React from 'react';
import Expo from 'expo';
import { FlatList, I18nManager } from 'react-native';
import { createAppContainer } from '@react-navigation/native';
import {
  Assets as StackAssets,
  createStackNavigator,
} from 'react-navigation-stack';
import { ListSection, Divider } from 'react-native-paper';

import SimpleStack from './src/SimpleStack';
import ImageStack from './src/ImageStack';
import TransparentStack from './src/TransparentStack';
import ModalStack from './src/ModalStack';
import LifecycleInteraction from './src/LifecycleInteraction';
import GestureInteraction from './src/GestureInteraction';
import SwitchWithStacks from './src/SwitchWithStacks';
import StackWithDrawer from './src/StackWithDrawer';

// Comment the following two lines to stop using react-native-screens
import { useScreens } from 'react-native-screens';

// Uncomment the following line to force RTL. Requires closing and re-opening
// your app after you first load it with this option enabled.
I18nManager.forceRTL(false);
useScreens();

const data = [
  { component: SimpleStack, title: 'Simple', routeName: 'SimpleStack' },
  { component: ImageStack, title: 'Image', routeName: 'ImageStack' },
  { component: ModalStack, title: 'Modal', routeName: 'ModalStack' },
  {
    component: LifecycleInteraction,
    title: 'Lifecycle',
    routeName: 'LifecycleStack',
  },
  {
    component: TransparentStack,
    title: 'Transparent',
    routeName: 'TransparentStack',
  },
  {
    component: GestureInteraction,
    title: 'Gesture Interaction',
    routeName: 'GestureInteraction',
  },
  {
    component: SwitchWithStacks,
    title: 'Switch with Stacks',
    routeName: 'SwitchWithStacks',
  },
  {
    component: StackWithDrawer,
    title: 'Stack with drawer inside',
    routeName: 'StackWithDrawer',
  },
];

// Cache images
Expo.Asset.loadAsync(StackAssets);

class Home extends React.Component {
  static navigationOptions = {
    title: 'Examples',
  };

  _renderItem = ({ item }) => (
    <ListSection.Item
      title={item.title}
      onPress={() => this.props.navigation.navigate(item.routeName)}
    />
  );

  _keyExtractor = item => item.routeName;

  render() {
    return (
      <FlatList
        ItemSeparatorComponent={Divider}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        data={data}
        style={{ backgroundColor: '#fff' }}
      />
    );
  }
}

const Root = createStackNavigator(
  {
    Home: createStackNavigator({ Home }),
    ...data.reduce((acc, it) => {
      acc[it.routeName] = {
        screen: it.component,
        navigationOptions: {
          title: it.title,
        },
      };

      return acc;
    }, {}),
  },
  {
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  }
);

const App = createAppContainer(Root);
Expo.registerRootComponent(App);
