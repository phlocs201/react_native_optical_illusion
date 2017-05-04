import React, { Component } from 'react';
import { View, Animated, Text, StyleSheet} from 'react-native';
import Svg, { Line } from 'react-native-svg';

import Footer from '../common/Footer';
import Description from '../common/Description';

export default class Zollner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineOpacity: new Animated.Value(0),
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
            this.state.lineOpacity,
            {toValue: 1, duration: 3000},
          ),
        ]).start(() => this.setState({illusionPhase: 1, descPhase: descPhase === 0 ? 1 : descPhase}));
        break;
      case 1:
        Animated.sequence([
          Animated.timing(
            this.state.lineOpacity,
            {toValue: 0, duration: 2000},
          ),
        ]).start(() => this.setState({illusionPhase: 2, descPhase: descPhase === 1 ? 2 : descPhase}));
        break;
    }
  }
  _previousPhase() {
    const { illusionPhase, descPhase } = this.state;
    switch (illusionPhase) {
      case 1:
        Animated.sequence([
          Animated.timing(
            this.state.lineOpacity,
            {toValue: 0, duration: 1000},
          ),
        ]).start(() => this.setState({illusionPhase: 0}));
        break;
      case 2:
        Animated.sequence([
          Animated.timing(
            this.state.lineOpacity,
            {toValue: 1, duration: 1000},
          ),
        ]).start(() => this.setState({illusionPhase: 1}));
        break;
    }
  }

  render() {
    const { illusionPhase, descPhase } = this.state;
    const lineOpacity = this.state.lineOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    return (
      <View style={styles.containerView}>
        <View style={styles.figureView}>
          {/* 文字A */}
          <Animated.View style={[styles.text_a]}>
            <Text style={styles.abText}>A</Text>
          </Animated.View>
          {/* 水平線 */}
          <View style={[styles.outerSvg]}>
            <Svg height="255" width="255">
              <Line x1="0" y1="50"  x2="255" y2="50"  stroke="black" strokeWidth="2"/>
              <Line x1="0" y1="90"  x2="255" y2="90"  stroke="black" strokeWidth="2"/>
              <Line x1="0" y1="130" x2="255" y2="130" stroke="black" strokeWidth="2"/>
              <Line x1="0" y1="170" x2="255" y2="170" stroke="black" strokeWidth="2"/>
            </Svg>
          </View>
          {/* 消える線 */}
          <Animated.View style={[styles.outerSvg, {opacity: lineOpacity}]}>
            <Lines y="50" isNorthWest="1" />
          </Animated.View>
          <Animated.View style={[styles.outerSvg, {opacity: lineOpacity}]}>
            <Lines y="90" isNorthWest="0" />
          </Animated.View>
          <Animated.View style={[styles.outerSvg, {opacity: lineOpacity}]}>
            <Lines y="130" isNorthWest="1" />
          </Animated.View>
          <Animated.View style={[styles.outerSvg, {opacity: lineOpacity}]}>
            <Lines y="170" isNorthWest="0" />
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
class Lines extends Component {
  render() {
    const { y, isNorthWest } = this.props;
    const num = isNorthWest === "1" ? 20 : -20;
    let viewArray = [];
    for(let i = 0; i <= 255; i += 15 ) {
      viewArray.push(
        <Line x1={i - num}  y1={Number(y) - 5} x2={i + num}  y2={Number(y) + 5} stroke="black" strokeWidth="1" key={i}/>
      );
    }
    return (
      <Svg height="255" width="255">{viewArray}</Svg>
    )
  }
}

const texts = [
  [
    "【質問】",
    "直線Aは、下に傾いて見えますか？",
    "それとも、上に傾いて見えますか？",
  ],
  [
    "【答え】 傾いていない",
    "平行の水平線が交互に傾いて見えることを「ツェルナー錯視」といいます。",
  ],
  [
    "【解説】",
    "短い斜線と直線がつくる角度を鋭角過大視する方向に起こる、角度錯視になります。",
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
    top: 75,
    left: -20,
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
