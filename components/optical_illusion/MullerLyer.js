import React, { Component } from 'react';
import { View, Animated, Text, StyleSheet} from 'react-native';
import Svg, { Line } from 'react-native-svg';

import Footer from '../common/Footer';
import Description from '../common/Description';

const AnimatedLine = Animated.createAnimatedComponent(Line);

export default class MullerLyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rectTop: new Animated.Value(0),
      linesOpacity: new Animated.Value(0),
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
          this.state.rectTop,
          {toValue: 1, duration: 2000},
        ),
      ]).start(() => this.setState({illusionPhase: 1, descPhase: descPhase === 0 ? 1 : descPhase}));
    } else if (illusionPhase === 1) {
      Animated.sequence([
        Animated.timing(
          this.state.rectTop,
          {toValue: 0, duration: 1000},
        ),
        Animated.timing(
          this.state.linesOpacity,
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
          this.state.rectTop,
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
          this.state.linesOpacity,
          {toValue: 1, duration: 1000},
        ),
        Animated.timing(
          this.state.rectTop,
          {toValue: 1, duration: 1000},
        ),
      ]).start(() => this.setState({illusionPhase: 1}));
    }
  }

  render() {
    const { illusionPhase, descPhase } = this.state;
    const rectTop = this.state.rectTop.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0]
    });
    const linesOpacity = this.state.linesOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });

    return (
      <View style={styles.containerView}>
        <View style={styles.figureView}>
          <Animated.View style={[styles.text_a, {opacity: linesOpacity}]}>
            <Text style={styles.abText}>A</Text>
          </Animated.View>
          <Animated.View style={[styles.text_b, {opacity: linesOpacity}]}>
            <Text style={styles.abText}>B</Text>
          </Animated.View>
            <Animated.View style={[ styles.outerSvg ]}>
            <Lines linesOpacity={linesOpacity} arrowDir={-40}/>
          </Animated.View>
          <Animated.View style={[
            styles.outerSvg, {
                top: rectTop,
            }]}>
            <Lines linesOpacity={linesOpacity} arrowDir={40}/>
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

const Lines = props => {
    const { arrowDir, linesOpacity } = props;
    return (
        <Svg height="300" width="300">
            <AnimatedLine x1={60 + arrowDir} y1="20" x2="60" y2="60" stroke="black" strokeWidth="2" opacity={linesOpacity} />
            <AnimatedLine x1={60 + arrowDir} y1="100" x2="60" y2="60" stroke="black" strokeWidth="2" opacity={linesOpacity} />
            <Line x1="60" y1="60" x2="250" y2="60" stroke="black" strokeWidth="2" />
            <AnimatedLine x1={250 - arrowDir} y1="20" x2="250" y2="60" stroke="black" strokeWidth="2" opacity={linesOpacity} />
            <AnimatedLine x1={250 -arrowDir} y1="100" x2="250" y2="60" stroke="black" strokeWidth="2" opacity={linesOpacity} />
        </Svg>
    );
};

const texts = [
  [
    "【質問】",
    "あなたは、Aの棒とBの棒、どちらが長く見えますか？",
  ],
  [
    "【答え】",
    "Bのほうが長く見えたでしょうか？長さは同じです。",
    "２つの棒は同じ長さですが、矢羽の向きによって見える長さが異なる錯視を「ミュラリー・リヤー錯視」といいます。",
  ],
  [
    "【解説】",
    "同じ長さの線分の両端に矢羽を付けた場合、内向きに付けると線分は短く見え，外向きに付けると線分は長く見えます。",
    "錯視量が非常に大きいことで有名な錯視です。",
  ],
];

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'column',
  },
  figureView: {
    flex: 5,
    marginVertical: 50,
    marginHorizontal: 30,
  },
  outerSvg: {
    position:'absolute',
  },
  abText: {
    fontSize: 20,
  },
  text_a: {
    position:'absolute',
    top: 30,
    left: 120,
  },
  text_b: {
    position:'absolute',
    top: 130,
    left: 120,
  },
});
