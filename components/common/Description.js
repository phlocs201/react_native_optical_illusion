import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class Description extends Component {
  render() {
    const { descPhase, texts, flex } = this.props;
    let descArray = [];
    if (texts[descPhase]) {
      descArray = texts[descPhase];
    } else {
      descArray = ["エラーが発生しました。トップページから開き直してください。"];
    }
    const viewArray = descArray.map((v) => {
       return (<Text style={styles.descText}>{v}</Text>);
    });
    return (
      <View style={[styles.descriptionView, {flex: flex || 4}]}>{viewArray}</View>
    )
  }
}

const styles = StyleSheet.create({
  descriptionView: {
    margin: 20,
  },
  descText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'left',
  },
});