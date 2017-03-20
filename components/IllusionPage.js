import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

export default class IllusionPage extends Component {
  _pressReturn(navigator) {
    //navigator.push({title: 'TopPage', index: 0});
    navigator.pop();
  }

  render () {
    const { navigator } = this.props;
    const { title, illusion } = navigator.navigationContext._currentRoute;
    return (
      <View style={styles.containerView}>
        <View style={styles.header}>
          <Text style={{color: 'white'}}>{ title }</Text>
        </View>
        <View style={styles.body}>
          { illusion }
        </View>
        <View style={styles.footer}>
          <Button
            color="white"
            onPress={() => {
              this._pressReturn(navigator)
            }}
            title="戻る"
          />
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
    paddingTop: 22,
  },
  header: {
    flex: 1,
    backgroundColor: '#2980B9',
    height: 10,
  },
  body: {
    flex: 10,
  },
  footer: {
    flex: 1,
    backgroundColor: '#2980B9',
  }
});

