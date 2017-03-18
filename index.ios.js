/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry, ListView, Text, View } from 'react-native';
import React, { Component } from 'react';

import { optical_illusion_set } from './data/optical_illusion_set';

export default class react_native_optical_illusion extends Component {
  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const data = ds.cloneWithRows(optical_illusion_set);
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={data}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('react_native_optical_illusion', () => react_native_optical_illusion);
