import React, { Component } from 'react';
import { View, Animated, Text, StyleSheet} from 'react-native';
import Svg, { Line } from 'react-native-svg';

import Footer from '../common/Footer';

export default class Jastrow extends Component {
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
      outputRange: [0, 1]
    });
    return (
      <View style={styles.containerView}>
        <View style={styles.figureView}>
          {/* 文字A, B, C */}
          <Animated.View style={[styles.text_a]}>
            <Text style={styles.abText}>A</Text>
          </Animated.View>
          <Animated.View style={[styles.text_b]}>
            <Text style={styles.abText}>B</Text>
          </Animated.View>
          <Animated.View style={[styles.text_c]}>
            <Text style={styles.abText}>C</Text>
          </Animated.View>
          {/* 消えない線 */}
          <View style={[styles.outerSvg]}>
            <Svg height="200" width="200">
              <Line x1="20" y1="50"  x2="190" y2="50" stroke="black" strokeWidth="3"/>
              <Line x1="20" y1="110" x2="190" y2="110" stroke="black" strokeWidth="3"/>
              {/* 正解の線 */}
              <Line x1="120" y1="50" x2="150" y2="20" stroke="black" strokeWidth="3"/>
              {/* A */}
              <Line x1="30" y1="140" x2="60" y2="110" stroke="black" strokeWidth="3"/>
              {/* B */}
              <Line x1="40" y1="140" x2="70" y2="110" stroke="black" strokeWidth="3"/>
              {/* C */}
              <Line x1="50" y1="140" x2="80" y2="110" stroke="black" strokeWidth="3"/>
            </Svg>
          </View>
          {/* 消える線 */}
          <Animated.View style={[styles.outerSvg, {opacity: lineOpacity}]}>
            <Svg height="200" width="200">
              <Line x1="60" y1="110" x2="120" y2="50" stroke="black" strokeWidth="3"/>
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
          "上の線を延長すると、A、B、Cのどの線につながるでしょうか？",
        ]
        break;
      case 1:
        descArray = [
          "【答え】 A",
          "斜めの線が障害物に遮蔽されたとき、線がずれているように見えることを「ポッゲンドルフ錯視」といいます。",
        ]
        break;
      case 2:
        descArray = [
          "【解説】",
          "斜線はAにつながっていますが、BやCにつながっているように見えてしまいます。",
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
  path: {
    top: 50,
    left: 20,
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
    top: 140,
    left: 10,
  },
  text_b: {
    position:'absolute',
    top: 140,
    left: 25,
  },
  text_c: {
    position:'absolute',
    top: 140,
    left: 40,
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
