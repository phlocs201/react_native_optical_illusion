import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
} from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    const { title, hasButton, onReturn } = this.props;
    return (
      <View style={styles.header}>
            <View style={styles.L_ButtonContainer}>
              {(() => { return hasButton === 'true' ? (
                <Button
                    color="white"
                    onPress={() => onReturn()}
                    title="戻る"
                />
              ) : null;
              })()}
            </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.R_ButtonContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#2F387A',
  },
  L_ButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  R_ButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  title: {
    color: 'white',
    fontSize: 20,
   },
});