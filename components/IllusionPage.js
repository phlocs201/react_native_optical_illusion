import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

import MullerLyer from './optical_illusion/MullerLyer';

export default class IllusionPage extends Component {
  _pressReturn(navigator) {
    //navigator.push({title: 'TopPage', index: 0});
    navigator.pop();
  }

  render () {
    const navigator = this.props.navigator;
    return (
      <View style={styles.containerView}>
        <Text>錯視のページだよ</Text>
        {navigator.navigationContext._currentRoute.illusion}
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

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 22,
  },
});

