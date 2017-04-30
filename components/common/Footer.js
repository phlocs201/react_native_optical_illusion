import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
} from 'react-native';

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { illusionPhase, maxPhase, _previousPhase, _nextPhase } = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.previousButton}>
          { !_previousPhase || illusionPhase === 0 ?
            <View /> :
            <Button
              onPress={_previousPhase}
              style={styles.button}
              color='#2F387A'
              title="戻る"
            />
          }
        </View>
        <View style={styles.nextButton}>
          {illusionPhase === maxPhase ? <View /> :
              <Button
              onPress={_nextPhase}
              style={styles.button}
              color='#2F387A'
              title="次へ"
            />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  previousButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
  button: {
    justifyContent: 'flex-start',
  },
});