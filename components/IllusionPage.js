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
                <View style={styles.backButton}>
                    <Button
                        color="white"
                        onPress={() => this._pressReturn(navigator)}
                        title="戻る"
                    />
                </View>
                <View style={styles.headerTextArea}>
                    <Text style={styles.headerText}>{ title }</Text>
                </View>
            </View>
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

