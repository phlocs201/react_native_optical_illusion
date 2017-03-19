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

export default class react_native_optical_illusion extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{title: 'TopPage', index: 0}}
        // initialRouteStack={routes}
        renderScene={(route, navigator) =>
          <TopPage
            state={this.state}
            navigator={navigator}
          />
        }
      />
    );
  }
}



AppRegistry.registerComponent('react_native_optical_illusion', () => react_native_optical_illusion);
