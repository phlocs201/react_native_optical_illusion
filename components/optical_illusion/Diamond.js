import React, { Component } from 'react';
import { View, Animated, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';

import Footer from '../common/Footer';

export default class Diamond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charsOpacity: new Animated.Value(0),
      linesOpacity: new Animated.Value(0),
      rectLeft: new Animated.Value(0),
      rectRotate: new Animated.Value(0),
      illusionPhase: 0,
      descPhase: 0,
    };
    this._nextPhase = this._nextPhase.bind(this);
    this._previousPhase = this._previousPhase.bind(this);
  }
  _nextPhase() {
    const { illusionPhase, descPhase } = this.state;
    if (illusionPhase === 0) {
      Animated.sequence([
        Animated.timing(
          this.state.charsOpacity,
          {toValue: 1, duration: 1000},
        ),
        Animated.timing(
          this.state.rectRotate,
          {toValue: 1, duration: 2000},
        ),
        Animated.timing(
          this.state.rectLeft,
          {toValue: 1, duration: 2000},
        ),
      ]).start(() => this.setState({illusionPhase: 1, descPhase: descPhase === 0 ? 1 : descPhase}));
    } else if (illusionPhase === 1) {
      Animated.sequence([
        Animated.timing(
          this.state.rectLeft,
          {toValue: 0, duration: 1000},
        ),
        Animated.timing(
          this.state.rectRotate,
          {toValue: 0, duration: 1000},
        ),
        Animated.timing(
          this.state.charsOpacity,
          {toValue: 0, duration: 500},
        ),
        Animated.timing(
          this.state.linesOpacity,
          {toValue: 1, duration: 1000},
        ),
      ]).start(() => this.setState({illusionPhase: 2, descPhase: descPhase === 1 ? 2 : descPhase}));
    }
  }
  _previousPhase() {
    const { illusionPhase, descPhase } = this.state;
    if (illusionPhase === 1) {
      Animated.sequence([
        Animated.timing(
          this.state.rectLeft,
          {toValue: 0, duration: 1000},
        ),
        Animated.timing(
          this.state.rectRotate,
          {toValue: 0, duration: 1000},
        ),
        Animated.timing(
          this.state.charsOpacity,
          {toValue: 0, duration: 500},
        ),
      ]).start(() => this.setState({illusionPhase: 0}));
    } else if (illusionPhase === 2) {
      Animated.sequence([
        Animated.timing(
          this.state.linesOpacity,
          {toValue: 0, duration: 500},
        ),
        Animated.timing(
          this.state.charsOpacity,
          {toValue: 1, duration: 500},
        ),
        Animated.timing(
          this.state.rectRotate,
          {toValue: 1, duration: 1000},
        ),
        Animated.timing(
          this.state.rectLeft,
          {toValue: 1, duration: 1000},
        ),
      ]).start(() => this.setState({illusionPhase: 1}));
    }
  }

  render() {
    const { illusionPhase, descPhase } = this.state;
    const charsOpacity = this.state.charsOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const linesOpacity = this.state.linesOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    const rectLeft = this.state.rectLeft.interpolate({
      inputRange: [0, 1],
      outputRange: [120, 0]
    });
    const rectRotate = this.state.rectRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['45deg', '0deg']
    });
    return (
      <View style={styles.containerView}>
        <View style={styles.figureView}>
          <Animated.View style={[styles.text_a, {opacity: charsOpacity}]}>
            <Text style={styles.abText}>A</Text>
          </Animated.View>
          <Animated.View style={[styles.text_b, {opacity: charsOpacity}]}>
            <Text style={styles.abText}>B</Text>
          </Animated.View>
          <View style={[styles.outerSvg]}>
            <Svg height="200" width="200">
              <Rect x="5" y="5" width="100" height="100" fill="none" stroke="black" strokeWidth="3"/>
            </Svg>
          </View>
          <Animated.View style={[
            styles.outerSvg, {
            left: rectLeft,
            transform: [{ rotate: rectRotate}],
          }]}>
            <Svg height="200" width="200">
              <Rect x="5" y="5" width="100" height="100" fill="none" stroke="black" strokeWidth="3"/>
            </Svg>
          </Animated.View>
          <Animated.View style={[
            styles.outerSvg, {
              opacity: linesOpacity,
              zIndex: 10,
            }]}>
            <Svg height="200" width="200">
              <Line x1="105" y1="5" x2="105" y2="105" stroke="red" strokeWidth="3"/>
            </Svg>
          </Animated.View>
          <Animated.View style={[
            styles.outerSvg, {
            opacity: linesOpacity,
            left: 120,
            transform: [{ rotate: '45deg'}],
            zIndex: 10,
          }]}>
            <Svg height="200" width="200">
              <Line x1="5" y1="5" x2="105" y2="105" stroke="red" strokeWidth="3"/>
            </Svg>
          </Animated.View>
        </View>
        <Description descPhase={descPhase}/>
        <Footer
          illusionPhase={illusionPhase}
          maxPhase={2}
          _previousPhase={this._previousPhase}
          _nextPhase={this._nextPhase}
        />
      </View>
    );
  }
}
class Description extends Component {
  render() {
    const { descPhase } = this.props;
    let descArray = [];
    switch (descPhase) {
      case 0:
        descArray = [
          "【質問】",
          "あなたは、AとBの正方形のどちらが大きく見えますか？",
        ]
        break;
      case 1:
        descArray = [
          "【答え】",
          "Bの方が大きく見えたでしょうか？",
          "同じ大きさの正方形でも、傾けた方が大きく見えることを、「正方形・ダイヤモンド形錯視」といいます。",
        ]
        break;
      case 2:
        descArray = [
          "【解説】",
          "AとBを比較する際に、脳が勝手に赤い線の部分を比較してしまい、Bの方が大きく見えてしまいます。",
          "お店の梱包では、少しでも量を多く見せるためにこの手法が使われます。",
        ]
        break;
      default:
        descArray = [
          "エラーが発生しました。トップページから開き直してください。"
        ]
        break;
    }
    const viewArray = descArray.map((v) => {
       return (<Text style={styles.descText}>{v}</Text>);
    });
    return (
      <View style={styles.descriptionView}>{viewArray}</View>
    )
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'column',
  },
  figureView: {
    flex: 5,
    marginVertical: 70,
    marginHorizontal: 50,
  },
  descriptionView: {
    flex: 4,
    margin: 20,
  },
  outerSvg: {
    position:'absolute',
  },
  descText: {
    fontSize: 20,
    textAlign: 'left',
  },
  abText: {
    fontSize: 20,
  },
  text_a: {
    position:'absolute',
    top: -30,
    left: 0,
  },
  text_b: {
    position:'absolute',
    top: -30,
    left: 150
  },
});
