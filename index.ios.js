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
    this.state = { isTutorialEnded: false　};
  }

  componentWillMount() {
      try {
        const value = AsyncStorage.getItem('@isTutorialEnded', (err, value) => {
            if (value === null) {
                AsyncStorage.setItem('@isTutorialEnded', 'hoge');
            } else {
                this.setState({ isTutorialEnded: true });
            }
        });
      } catch (err) {
          console.log(err);
      }
  }

  render() {
    // DEBUG
    this.state.isTutorialEnded = false
    // DEBUG
    const { isTutorialEnded } = this.state;
    return (
        <Navigator
          initialRoute={ isTutorialEnded ?
              {title: 'TopPage', index: 1} :
              {title: 'Tutorial', index: 0}
          }
          // initialRouteStack={routes}
          renderScene={(route, navigator) => {
              if (route.index === 0) {
                  return (<Tutorial navigator={navigator} />)
              } else if (route.index === 1) {
                return (<TopPage navigator={navigator} />)
            } else if (route.index === 2) {
                return (<IllusionPage navigator={navigator}/>)
            }
            }
          }
        />
    )
  }
}

AppRegistry.registerComponent('react_native_optical_illusion', () => react_native_optical_illusion);
