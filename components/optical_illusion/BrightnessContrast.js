import React, { Component } from 'react';
import { View, Animated, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';

import Footer from '../common/Footer';
import Description from '../common/Description';

export default class BrightnessContrast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rectsOpacity: new Animated.Value(0),
      rectsLeft: new Animated.Value(0),
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
          this.state.rectsLeft,
          {toValue: 1, duration: 2000},
        ),
        Animated.timing(
          this.state.rectsOpacity,
          {toValue: 1, duration: 2000},
        ),
      ]).start(() => this.setState({illusionPhase: 1, descPhase: descPhase === 0 ? 1 : descPhase}));
    } else if (illusionPhase === 1) {
      Animated.sequence([
        Animated.timing(
          this.state.rectsLeft,
          {toValue: 0, duration: 2000},
        ),
        Animated.timing(
          this.state.rectsOpacity,
          {toValue: 0, duration: 1000},
        ),
      ]).start(() => this.setState({illusionPhase: 2, descPhase: descPhase === 1 ? 2 : descPhase}));
    }
  }
  _previousPhase() {
    const { illusionPhase, descPhase } = this.state;
    if (illusionPhase === 1) {
      Animated.sequence([
        Animated.timing(
          this.state.rectsOpacity,
          {toValue: 0, duration: 1000},
        ),
        Animated.timing(
          this.state.rectsLeft,
          {toValue: 0, duration: 1000},
        ),
      ]).start(() => this.setState({illusionPhase: 0}));
    } else if (illusionPhase === 2) {
      Animated.sequence([
        Animated.timing(
          this.state.rectsOpacity,
          {toValue: 1, duration: 1000},
        ),
        Animated.timing(
          this.state.rectsLeft,
          {toValue: 1, duration: 1000},
        ),
      ]).start(() => this.setState({illusionPhase: 1}));
    }
  }

  render() {
    const { illusionPhase, descPhase } = this.state;
    const rectsOpacity = this.state.rectsOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const leftRectLeft = this.state.rectsLeft.interpolate({
      inputRange: [0, 1],
      outputRange: [55, 110]
    });
    const rightRectLeft = this.state.rectsLeft.interpolate({
      inputRange: [0, 1],
      outputRange: [205, 150]
    });
    return (
      <View style={styles.containerView}>
        <View style={styles.figureView}>
          <Animated.View style={[styles.text_a, {opacity: rectsOpacity}]}>
            <Text style={styles.abText}>A</Text>
          </Animated.View>
          <Animated.View style={[styles.text_b, {opacity: rectsOpacity}]}>
            <Text style={styles.abText}>B</Text>
          </Animated.View>
          <Animated.View style={[styles.outerSvg, {opacity: rectsOpacity}]}>
            <Svg height="150" width="150">
              <Rect x="0" y="0" width="150" height="150" fill="#000000" strokeWidth="1"/>
            </Svg>
          </Animated.View>
          <Animated.View style={[styles.outerSvg, {
            top: 55,
            left: leftRectLeft,
          }]}>
            <Svg height="40" width="40">
              <Rect x="0" y="0" width="40" height="40" fill="#333333" strokeWidth="1"/>
            </Svg>
            </Animated.View>
          <Animated.View style={[styles.outerSvg, {opacity: rectsOpacity, left: 150}]}>
            <Svg height="150" width="150">
              <Rect x="0" y="0" width="150" height="150" fill="#eeeeee" strokeWidth="1"/>
            </Svg>
          </Animated.View>
          <Animated.View style={[styles.outerSvg, {
            top: 55,
            left: rightRectLeft,
          }]}>
            <Svg height="40" width="40">
              <Rect x="0" y="0" width="40" height="40" fill="#333333" strokeWidth="1"/>
            </Svg>
            </Animated.View>
        </View>
        <Description descPhase={descPhase} texts={texts} />
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

const texts = [
  [
    "【質問】",
    "AとBの中心にある四角形の色は、どちらが暗く見えますか？",
  ],
  [
    "【答え】同じ色",
    "暗い領域に囲まれた灰色(A)は明るく見え、明るい領域に囲まれた灰色(B)は暗く見えます。",
    "これを「明るさの対比錯視」といいます。",
  ],
  [
    "【解説】",
    "囲まれる色によって、同じ色でも違う色に見えます。",
  　"身近な例でいえば、髪の色を明るくすることで、顔は暗く見えてしまいます。",
  ],
];

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
  outerSvg: {
    position:'absolute',
  },
  abText: {
    fontSize: 20,
  },
  text_a: {
    position:'absolute',
    top: -30,
    left: 10,
  },
  text_b: {
    position:'absolute',
    top: -30,
    left: 160
  },
});
