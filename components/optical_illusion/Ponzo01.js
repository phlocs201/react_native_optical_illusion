import React, { Component } from 'react';
import { View, Button, Animated, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import Svg, { Line } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

export default class Ponzo01 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linesOpacity: new Animated.Value(0),
      wholeOpacity: new Animated.Value(0),
      lineTop: new Animated.Value(0),
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
          this.state.lineTop,
          {toValue: 1, duration: 2000},
        ),
      ]).start(() => this.setState({illusionPhase: 1, descPhase: descPhase === 0 ? 1 : descPhase}));
    } else if (illusionPhase === 1) {
      Animated.sequence([
        Animated.timing(
          this.state.lineTop,
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
          this.state.lineTop,
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
          this.state.lineTop,
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
    const lineTop = this.state.lineTop.interpolate({
      inputRange: [0, 1],
      outputRange: [180, 90]
    });
    return (
      <View style={styles.containerView}>
        <View style={styles.figureView}>
          <Animated.View style={{opacity: imageOpacity}}>
            <Image
               style={styles.image}
               source={require('../../images/rail_way.jpg')}
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
            <View style={styles.stickSvg}>
              <Svg height="10" width="100">
                {/* 上の − */}
                <Line x1="0" y1="0" x2="80" y2="0" stroke="black" strokeWidth="4" />
              </Svg>
            </View>
            <Animated.View style={[styles.text_b, {opacity: linesOpacity}]}>
              <Text style={styles.abText}>B</Text>
            </Animated.View>
            <Animated.View style={[styles.stickSvg, {top: lineTop}]}>
              <Svg height="10" width="100">
                {/* 下の − */}
                <Line x1="0" y1="0" x2="80" y2="0" stroke="black" strokeWidth="4" />
              </Svg>
            </Animated.View>
          </Animated.View>
        </View>
        <Description descPhase={descPhase}/>
        <Footer
          illusionPhase={illusionPhase}
          descPhase={descPhase}
          _nextPhase={this._nextPhase}
          _previousPhase={this._previousPhase}
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
          "AとBの2本の棒があります。",
          "どちらの棒の方が長く見えますか？",
        ]
        break;
      case 1:
        descArray = [
          "【解説】",
          "AとBの棒は同じ長さです。",
          "人間は物体の大きさを背景に依存して判断していることを、示したポンゾ錯視といいます。",
        ]
        break;
      case 2:
        descArray = [
          "【解説】",
          "電車の線路などでは、遠方が短く、近い線路程長く見えますが、実際は同じ長さですよね。",
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

class Footer extends Component {
  render() {
    const { illusionPhase, handleFunc } = this.props;
    return(
      <View style={styles.footerView}>
        <View style={styles.previousButton}>
          {illusionPhase === 0 ? <View /> :
              <Button
              onPress={this.props._previousPhase}
              style={styles.button}
              title="戻る"
            />
          }
        </View>
        <View style={styles.nextButton}>
          {illusionPhase === 2 ? <View /> :
              <Button
              onPress={this.props._nextPhase}
              style={styles.button}
              title="次へ"
            />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'column',
  },
  figureView: {
    flex: 5,
  },
  descriptionView: {
    flex: 2,
    margin: 20,
  },
  footerView: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  previousButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
  button: {
    justifyContent: 'flex-start'
  },
  outerSvg: {
    margin: 70,
    position:'absolute',
  },
  stickSvg: {
    position:'absolute',
    top: 90,
    left: 60
  },
  descText: {
    fontSize: 20,
    textAlign: 'left',
  },
  image: {
    position: 'absolute',
    top: 90,
    left: 60,
    width: 200,
    height: 200,
  },
  abText: {
    fontSize: 20,
  },
  text_a: {
    position:'absolute',
    top: 68,
    left: 70,
  },
  text_b: {
    position:'absolute',
    top: 158,
    left: 70
  },
});
