import React, { Component } from 'react';
import { View, Animated, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Svg, { Line, Circle, Rect, Polygon } from 'react-native-svg';

import Footer from '../common/Footer';
import Description from '../common/Description';

export default class Ehrenstein extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circlesOpacity: new Animated.Value(0),
      rectOpacity: new Animated.Value(0),
      triangleOpacity: new Animated.Value(0),
      arrowOpacity: new Animated.Value(0),
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
          this.state.circlesOpacity,
          {toValue: 1, duration: 3000},
        ),
      ]).start(() => this.setState({illusionPhase: 1, descPhase: descPhase === 0 ? 1 : descPhase}));
    } else if (illusionPhase === 1) {
      this.setState({descPhase: descPhase === 1 ? 2 : descPhase});
      Animated.sequence([
        Animated.timing(
          this.state.circlesOpacity,
          {toValue: 0, duration: 1000},
        ),
        Animated.delay(1000),
        Animated.timing(
          this.state.rectOpacity,
          {toValue: 1, duration: 1000},
        ),
        Animated.timing(
          this.state.triangleOpacity,
          {toValue: 1, duration: 1000},
        ),
        Animated.delay(1000),
        Animated.timing(
          this.state.triangleOpacity,
          {toValue: 0, duration: 1000},
        ),
        Animated.timing(
          this.state.arrowOpacity,
          {toValue: 1, duration: 1000},
        ),
      ]).start(() => this.setState({illusionPhase: 2}));
    }
  }
  _previousPhase() {
    const { illusionPhase, descPhase } = this.state;
    if (illusionPhase === 1) {
      Animated.sequence([
        Animated.timing(
          this.state.circlesOpacity,
          {toValue: 0, duration: 1000},
        ),
      ]).start(() => this.setState({illusionPhase: 0}));
    } else if (illusionPhase === 2) {
      Animated.sequence([
        Animated.timing(
          this.state.arrowOpacity,
          {toValue: 0, duration: 500},
        ),
        Animated.timing(
          this.state.triangleOpacity,
          {toValue: 1, duration: 500},
        ),
        Animated.timing(
          this.state.triangleOpacity,
          {toValue: 0, duration: 500},
        ),
        Animated.timing(
          this.state.rectOpacity,
          {toValue: 0, duration: 500},
        ),
        Animated.timing(
          this.state.circlesOpacity,
          {toValue: 1, duration: 500},
        ),
      ]).start(() => this.setState({illusionPhase: 1}));
    }
  }

  render() {
    const { illusionPhase, descPhase } = this.state;
    const circlesOpacity = this.state.circlesOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const rectOpacity = this.state.rectOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const triangleOpacity = this.state.triangleOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    const arrowOpacity = this.state.arrowOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    return (
      <View style={styles.containerView}>
        <View style={styles.figureView}>
          <Animated.View style={[styles.outerSvg, {opacity: circlesOpacity}]}>
            <Circles />
          </Animated.View>
          <Animated.View style={[styles.outerSvg, {opacity: rectOpacity}]}>
            <Svg height="200" width="200">
              <Rect x="45" y="45" width="110" height="110" fill="none" stroke="black" strokeWidth="2" rotate="45" originX="100" originY="100"/>
            </Svg>
          </Animated.View>
          <Animated.View style={[styles.outerSvg, {opacity: triangleOpacity}]}>
            <Svg height="200" width="200">
              <Polygon points="100,21 30,140 170,140" fill="none" stroke="black" strokeWidth="2" />
            </Svg>
          </Animated.View>
          <Animated.View style={[styles.outerSvg, {opacity: arrowOpacity}]}>
            <Svg height="200" width="200">
              <Line x1="40"  y1="80"  x2="160" y2="80" stroke="black" strokeWidth="2" />
              <Line x1="130" y1="50"  x2="160" y2="80" stroke="black" strokeWidth="2" />
              <Line x1="130" y1="110" x2="160" y2="80" stroke="black" strokeWidth="2" />
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
class Circles extends Component {
  render() {
    let viewArray = [];
    for (let i = 0; i < 90; i+=4) {
      viewArray.push(
        <Circle cx="100" cy="100" r={i.toString()} fill="none" stroke="black" strokeWidth="1"/>
      );
    }
    return (
      <Svg height="200" width="200">{viewArray}</Svg>
    )
  }
}

const texts = [
  [
    "【質問】",
    "円の中にある四角形がどのように見えますか？",
    "1. 正方形",
    "2. 長方形",
    "3. 歪んだ四角形",
  ],
  [
    "【答え】",
    "「3. 歪んだ四角形」に見えたでしょうか？",
    "円の中に直線があると曲がって見えることを、エーレンシュタイン錯視と言います。",
  ],
  [
    "【解説】",
    "円の中に直線があると曲がって見えるため、四角形以外にも三角形や矢印でさえ曲がって見えます。",
    "円の中に入れば、鉄の棒ですら簡単に曲げてしまうのです。",
  ],
];

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'column',
  },
  figureView: {
    flex: 5,
    margin: 70,
  },
  outerSvg: {
    position:'absolute',
  },
});
