import React, { Component } from 'react';
import { View, Animated, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';

import Footer from '../common/Footer';
import Description from '../common/Description';

const AnimatedLine = Animated.createAnimatedComponent(Line);

export default class Ponzo02 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linesOpacity: new Animated.Value(0),
      wholeOpacity: new Animated.Value(0),
      circleTop: new Animated.Value(0),
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
          this.state.linesOpacity,
          {toValue: 1, duration: 2000},
        ),
        Animated.timing(
          this.state.circleTop,
          {toValue: 1, duration: 2000},
        ),
      ]).start(() => this.setState({illusionPhase: 1, descPhase: descPhase === 0 ? 1 : descPhase}));
    } else if (illusionPhase === 1) {
      Animated.sequence([
        Animated.timing(
          this.state.circleTop,
          {toValue: 0, duration: 1000},
        ),
        Animated.timing(
          this.state.linesOpacity,
          {toValue: 0, duration: 1000},
        ),
        Animated.timing(
          this.state.wholeOpacity,
          {toValue: 1, duration: 3000},
        ),
      ]).start(() => this.setState({illusionPhase: 2, descPhase: descPhase === 1 ? 2 : descPhase}));
    }
  }
  _previousPhase() {
    const { illusionPhase, descPhase } = this.state;
    if (illusionPhase === 1) {
      Animated.sequence([
        Animated.timing(
          this.state.circleTop,
          {toValue: 0, duration: 1000},
        ),
        Animated.timing(
          this.state.linesOpacity,
          {toValue: 0, duration: 1000},
        ),
      ]).start(() => this.setState({illusionPhase: 0}));
    } else if (illusionPhase === 2) {
      Animated.sequence([
        Animated.timing(
          this.state.wholeOpacity,
          {toValue: 0, duration: 1000},
        ),
        Animated.timing(
          this.state.circleTop,
          {toValue: 1, duration: 1000},
        ),
        Animated.timing(
          this.state.linesOpacity,
          {toValue: 1, duration: 1000},
        ),
      ]).start(() => this.setState({illusionPhase: 1}));
    }
  }

  render() {
    const { illusionPhase, descPhase } = this.state;
    const linesOpacity = this.state.linesOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const imageOpacity = this.state.wholeOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    const illusionOpacity = this.state.wholeOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const circleTop = this.state.circleTop.interpolate({
      inputRange: [0, 1],
      outputRange: [140, 40]
    });
    return (
      <View style={styles.containerView}>
        <View style={styles.figureView}>
          <Animated.View style={{opacity: imageOpacity}}>
            <Image
               style={styles.image}
               source={require('../../images/moon.jpg')}
            />
          </Animated.View>
          <Animated.View style={[styles.outerSvg, {opacity: illusionOpacity}]}>
            <View>
              <Svg height="200" width="200">
                {/* 外側の ∧ */}
                <AnimatedLine x1="100" y1="0" x2="0" y2="200" stroke="black" strokeWidth="2" opacity={linesOpacity} />
                <AnimatedLine x1="100" y1="0" x2="200" y2="200" stroke="black" strokeWidth="2" opacity={linesOpacity} />
              </Svg>
            </View>
            <Animated.View style={[styles.text_a, {opacity: linesOpacity}]}>
              <Text style={styles.abText}>A</Text>
            </Animated.View>
            <View style={styles.circle}>
              <Svg height="70" width="70">
                {/* 上の ○ */}
                <Circle cx="35" cy="35" r="30" fill="none" stroke="black" strokeWidth="3" />
              </Svg>
            </View>
            <Animated.View style={[styles.text_b, {opacity: linesOpacity}]}>
              <Text style={styles.abText}>B</Text>
            </Animated.View>
            <Animated.View style={[styles.circle, {top: circleTop}]}>
              <Svg height="100" width="100">
                {/* 下の ○ */}
                <Circle cx="35" cy="35" r="30" fill="none" stroke="black" strokeWidth="3" />
              </Svg>
            </Animated.View>
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
    "AとBの2つの丸があります。",
    "どちらの丸の方が大きく見えますか？",
  ],
  [
    "【答え】",
    "AとBの丸は同じ大きさです。",
    "人間は物体の大きさを背景に依存して判断していることを、示したポンゾ錯視といいます。",
  ],
  [
    "【解説】",
    "この錯視によって「地平線近くに浮かぶ月は、なぜか大きく見え、天高く上った月は小さく見える」という誰でも経験した現象を説明することができます。",
  ],
];

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'column',
  },
  figureView: {
    flex: 6,
  },
  outerSvg: {
    margin: 70,
    position:'absolute',
  },
  circle: {
    position:'absolute',
    top: 40,
    left: 65
  },
  image: {
    position: 'absolute',
    top: 20,
    left: 70,
    width: 200,
    height: 300,
  },
  abText: {
    fontSize: 20,
  },
  text_a: {
    position:'absolute',
    top: 90,
    left: 60,
  },
  text_b: {
    position:'absolute',
    top: 190,
    left: 60
  },
});
