import React, { Component } from 'react';
import { View, Animated, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';

import Footer from '../common/Footer';

export default class Fick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charsOpacity: new Animated.Value(0),
      linesOpacity: new Animated.Value(0),
      rectTop: new Animated.Value(0),
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
          this.state.rectTop,
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
          this.state.rectTop,
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
    const rectTop = this.state.rectTop.interpolate({
      inputRange: [0, 1],
      outputRange: [25, 0]
    });
    const rectRotate = this.state.rectRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['90deg', '0deg']
    });
    const rectCentering = this.state.rectRotate.interpolate({
        inputRange: [0, 1],
        outputRange: [120, -25],
    })

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
            <Svg height="300" width="300">
              <Rect x="5" y="5" width="270" height="25" fill="gray" stroke="black" strokeWidth="1"/>
            </Svg>
          </View>
          <Animated.View style={[
            styles.outerSvg, {
                top: rectTop,
                right: rectCentering,
                transform: [{ rotate: rectRotate}],
            }]}>
            <Svg height="300" width="300">
              <Rect x="5" y="5" width="270" height="25" fill="gray" stroke="black" strokeWidth="1"/>
            </Svg>
          </Animated.View>
          <Animated.View style={[
            styles.outerSvg, {
              opacity: linesOpacity,
              zIndex: 10,
            }]}>
            <Svg height="300" width="300">
              <Line x1="5" y1="17" x2="275" y2="17" stroke="red" strokeWidth="3"/>
            </Svg>
          </Animated.View>
          <Animated.View style={[
            styles.outerSvg, {
            opacity: linesOpacity,
            zIndex: 10,
          }]}>
            <Svg height="300" width="300">
              <Line x1="137" y1="30" x2="137" y2="297" stroke="red" strokeWidth="3"/>
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
          "あなたは、Aの棒とBの棒、どちらが長く見えますか？",
        ]
        break;
      case 1:
        descArray = [
          "【答え】",
          "Bのほうが長く見えたでしょうか？長さは同じです。",
          "たて棒と横棒は同じ長さですが、たて線の方が長く見えることを「フィック錯視」といいます。",
        ]
        break;
      case 2:
        descArray = [
          "【解説】",
          "人間の脳は同じ長さでもたて棒よりも横棒を長いと認識します。",
        　"そのため、物を収納する際は縦に置くより横に置くことですっきり見える技術があります。",
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
    top: 60,
    left: 100
  },
});
