/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  AppRegistry,
  Navigator,
  AsyncStorage,
} from 'react-native';
import React, { Component } from 'react';

import TopPage from './components/TopPage';
import IllusionPage from './components/IllusionPage';
import MullerLyer from './components/optical_illusion/MullerLyer';
import Tutorial from './components/Tutorial';

export default class react_native_optical_illusion extends Component {
  constructor(props) {
    super(props);
    this.state = { isTutorialEnded: 3 };
  }

  componentWillMount() {
      try {
        const value = AsyncStorage.getItem('@isTutorialEnded', (err, value) => {
            if (value === null) {
                this.setState({ isTutorialEnded: 0 });
            } else {
                this.setState({ isTutorialEnded: 1 });
            }
        });
      } catch (err) {
          console.log(err);
      }
  }

  _renderScene(route, navigator) {
    switch(route.index) {
        case 0:
        return (<Tutorial navigator={navigator} />);
        case 1:
        return (<TopPage navigator={navigator} />);
        case 2:
        return (<IllusionPage navigator={navigator}/>);
        default:
        return null;
    }
  }

  render() {
    const { isTutorialEnded } = this.state;
    return (isTutorialEnded !== 3) ?
        (<Navigator
          initialRoute={{ index: isTutorialEnded }}
          renderScene={(route, navigator) => this._renderScene(route, navigator)}
          configureScene={(route, routeStack) =>
            Navigator.SceneConfigs.HorizontalSwipeJump
          }
        />) :
        null;
  }
}

AppRegistry.registerComponent('react_native_optical_illusion', () => react_native_optical_illusion);
