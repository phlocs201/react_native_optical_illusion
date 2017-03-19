/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  AppRegistry,
  Navigator,
} from 'react-native';
import React, { Component } from 'react';

import TopPage from './components/TopPage';
import IllusionPage from './components/IllusionPage';

export default class react_native_optical_illusion extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{title: 'TopPage', index: 0}}
        // initialRouteStack={routes}
        renderScene={(route, navigator) =>
          {
            if (route.index === 0) {
              return (<TopPage navigator={navigator} />)
            } else if (route.index === 1) {
              return (<IllusionPage navigator={navigator}/>)
            }
          }
        }
      />
    );
  }
}

AppRegistry.registerComponent('react_native_optical_illusion', () => react_native_optical_illusion);
