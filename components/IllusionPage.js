import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

export default class IllusionPage extends Component {
  _pressReturn(navigator) {
    navigator.push({title: 'TopPage', index: 0});
  }

  render () {
    const navigator = this.props.navigator;
    return (
      <View style={{
        flex: 1,
        paddingTop: 22
      }}>
        <Text>錯視のページだよ</Text>
        <Button
          onPress={() => {
            this._pressReturn(navigator)
          }}
          title="戻る"
        />
      </View>
    );
  }
}
