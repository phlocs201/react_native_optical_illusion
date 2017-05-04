import React, { Component } from 'react';
import { View, Animated, Text, Image, StyleSheet} from 'react-native';
import Svg, { Line, Rect, Path } from 'react-native-svg';

import Footer from '../common/Footer';
import Description from '../common/Description';

export default class Jastrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charsOpacity: new Animated.Value(0),
      linesOpacity: new Animated.Value(0),
      imageOpacity: new Animated.Value(0),
      pathLocation: new Animated.Value(0),
      illusionPhase: 0,
      descPhase: 0,
    };
    this._nextPhase = this._nextPhase.bind(this);
    this._previousPhase = this._previousPhase.bind(this);
  }
  _nextPhase() {
    const { illusionPhase, descPhase } = this.state;
    switch (illusionPhase) {
      case 0:
        Animated.sequence([
          Animated.timing(
            this.state.charsOpacity,
            {toValue: 1, duration: 1000},
          ),
          Animated.timing(
            this.state.pathLocation,
            {toValue: 1, duration: 2000},
          ),
        ]).start(() => this.setState({illusionPhase: 1, descPhase: descPhase === 0 ? 1 : descPhase}));
        break;
      case 1:
        Animated.sequence([
          Animated.timing(
            this.state.pathLocation,
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
        break;
      case 2:
        Animated.sequence([
          Animated.timing(
            this.state.imageOpacity,
            {toValue: 1, duration: 3000},
          ),
        ]).start(() => this.setState({illusionPhase: 3, descPhase: descPhase === 2 ? 3 : descPhase}));
        break;
    }
  }
  _previousPhase() {
    const { illusionPhase, descPhase } = this.state;
    switch (illusionPhase) {
      case 1:
        Animated.sequence([
          Animated.timing(
            this.state.pathLocation,
            {toValue: 0, duration: 1000},
          ),
          Animated.timing(
            this.state.charsOpacity,
            {toValue: 0, duration: 500},
          ),
        ]).start(() => this.setState({illusionPhase: 0}));
        break;
      case 2:
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
            this.state.pathLocation,
            {toValue: 1, duration: 1000},
          ),
        ]).start(() => this.setState({illusionPhase: 1}));
        break;
      case 3:
        Animated.sequence([
          Animated.timing(
            this.state.imageOpacity,
            {toValue: 0, duration: 1000},
          ),
        ]).start(() => this.setState({illusionPhase: 2}));
        break;
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
    const imageOpacity = this.state.imageOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    const pathRotate = this.state.pathLocation.interpolate({
      inputRange: [0, 1],
      outputRange: ['-5deg', '0deg']
    });
    const pathTop = this.state.pathLocation.interpolate({
      inputRange: [0, 1],
      outputRange: [-5, 50]
    });
    const pathLeft = this.state.pathLocation.interpolate({
      inputRange: [0, 1],
      outputRange: [5, 20]
    });
    return (
      <View style={styles.containerView}>
        <View style={styles.figureView}>
          {/* 文字A, B */}
          <Animated.View style={[styles.text_a, {opacity: charsOpacity}]}>
            <Text style={styles.abText}>A</Text>
          </Animated.View>
          <Animated.View style={[styles.text_b, {opacity: charsOpacity}]}>
            <Text style={styles.abText}>B</Text>
          </Animated.View>
          {/* かまぼこ形 */}
          <Animated.View style={[styles.outerSvg, styles.path, {
            top: pathTop,
            left: pathLeft,
            transform: [{ rotate: pathRotate}],
          }]}>
            <Svg height="200" width="200">
              {/* Aの引数: 楕円の半径1 楕円の半径2 回転量 arcフラグ sweepフラグ 目的地x 目的地y */}
              <Path d="M 20 40 L 35 85 A 150 150 0 0 1 165 85 L 180 40 A 180 180 0 0 0 20 40" fill="none" stroke="black" strokeWidth="3"/>
            </Svg>
          </Animated.View>
          <View style={[styles.outerSvg, styles.path]}>
            <Svg height="200" width="200">
              <Path d="M 20 40 L 35 85 A 150 150 0 0 1 165 85 L 180 40 A 180 180 0 0 0 20 40" fill="none" stroke="black" strokeWidth="3"/>
            </Svg>
          </View>
          {/* 赤線 */}
          <Animated.View style={[
            styles.outerSvg, styles.path, {
              opacity: linesOpacity,
              top: -5,
              left: 5,
              transform: [{ rotate: '-5deg'}],
              zIndex: 10,
            }]}>
            <Svg height="200" width="200">
              <Path d="M 35 85 A 150 150 0 0 1 165 85" fill="none" stroke="red" strokeWidth="3"/>
            </Svg>
          </Animated.View>
          <Animated.View style={[
            styles.outerSvg, styles.path, {
              opacity: linesOpacity,
              zIndex: 10,
            }]}>
            <Svg height="200" width="200">
              <Path d="M 180 40 A 180 180 0 0 0 20 40" fill="none" stroke="red" strokeWidth="3"/>
            </Svg>
          </Animated.View>
          {/* バームクーヘン画像 */}
          <Animated.View style={[styles.imageView, {
            opacity: imageOpacity,
            zIndex: 20,
          }]}>
            <Image style={styles.image} source={require('../../images/baumkuchen.jpg')}/>
          </Animated.View>
        </View>
        <Description descPhase={descPhase} texts={texts} />
        <Footer
          illusionPhase={illusionPhase}
          maxPhase={3}
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
    "あなたは、AとBのかまぼこ形のどちらが大きく見えますか？",
  ],
  [
    "【答え】",
    "Bの方が大きく見えたでしょうか？",
    "同じ大きさのかまぼこ形でも、並べると下のかまぼこ形の方が大きく見えることを、「エーレンシュタイン形錯視」といいます。",
  ],
  [
    "【解説】",
    "Aの下の円弧とBの上の円弧を比べてしまうため、Bの方が大きく見えてしまうのです。",
  ],
  [
    "【解説】",
    "この錯視を知っていれば、見た目に惑わされずに大きい方のバームクーヘンを選べるはず！",
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
  path: {
    top: 50,
    left: 20,
  },
  abText: {
    fontSize: 20,
  },
  text_a: {
    position:'absolute',
    top: 45,
    left: 5,
  },
  text_b: {
    position:'absolute',
    top: 95,
    left: 25
  },
  imageView: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image: {
    width: 300,
    height: 200,
  },
});
