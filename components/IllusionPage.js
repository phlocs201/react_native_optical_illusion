import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import MullerLyer from './optical_illusion';

export default class IllusionPage extends Component {
  render () {
    console.log(MullerLyer);
    return (
      <View style={{
        flex: 1,
        paddingTop: 22
      }}>
        <MullerLyer />
      </View>
    );
  }
}
