import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

import Header from './common/Header';

export default class IllusionPage extends Component {
  _pressReturn(navigator) {
    navigator.pop();
  }

  render () {
    const { navigator } = this.props;
    const { title, illusion } = navigator.navigationContext._currentRoute;
    return (
        <View style={styles.containerView}>
          <Header title={ title } hasButton='true' onReturn={() => this._pressReturn(navigator)} />
          <View style={styles.body}>
              { illusion }
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2980B9',
  },
  headerTextArea: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
   },
  body: {
    flex: 8,
  },
  footer: {
    flex: 1,
    backgroundColor: '#2980B9',
  }
});

