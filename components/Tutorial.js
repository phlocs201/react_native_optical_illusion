import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Animated,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import Svg, { Line } from 'react-native-svg';

import Header from './common/Header';
import Footer from './common/Footer';
import Description from './common/Description';

export default class Tutorial extends Component {
  _pressReturn(navigator) {
    navigator.push({title: 'TopPage', index: 1});
  }

  componentWillMount() {
    AsyncStorage.setItem('@isTutorialEnded', 'hoge');
  }

  render () {
    const { navigator } = this.props;
    return (
        <View style={styles.containerView}>
            <Header title='錯視の世界' buttonText='開始' hasButton='true' onReturn={() => this._pressReturn(navigator)} />
            <View style={styles.body}>
              <TutorialMuller />
            </View>
        </View>
    );
  }
}

const AnimatedLine = Animated.createAnimatedComponent(Line);

class TutorialMuller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rectTop: new Animated.Value(0),
      linesOpacity: new Animated.Value(0),
      illusionPhase: 0,
      descPhase: 0,
    };
    this._nextPhase = this._nextPhase.bind(this);
  }
  _nextPhase() {
    const { illusionPhase, descPhase } = this.state;
    switch (illusionPhase) {
      case 0:
        this.setState({illusionPhase: 1, descPhase: 1})
        break;
      case 1:
        this.setState({illusionPhase: 2, descPhase: 2})
        break;
      case 2:
        Animated.sequence([
          Animated.timing(
            this.state.linesOpacity,
            {toValue: 1, duration: 2000},
          ),
          Animated.timing(
            this.state.rectTop,
            {toValue: 1, duration: 2000},
          ),
        ]).start(() => this.setState({illusionPhase: 3, descPhase: 3}));
        break;
      case 3:
        Animated.sequence([
          Animated.timing(
            this.state.rectTop,
            {toValue: 0, duration: 1000},
          ),
          Animated.timing(
            this.state.linesOpacity,
            {toValue: 0, duration: 1000},
          ),
        ]).start(() => this.setState({illusionPhase: 4, descPhase: 4}));
        break;
      default:
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
        <Description descPhase={descPhase} texts={texts} flex={5}/>
        <Footer
          illusionPhase={illusionPhase}
          maxPhase={4}
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
    "まず錯視の世界に招待する前に、注意点があります。",
    "車酔いなどに弱い方が見ると、気分が悪くなる場合がありますので、閲覧の際には注意してください。",
    "また、見え方には個人差がありますので、ご了承ください",
    "それでは、錯視の世界にご招待いたしましょう。",
    "「次へ」というボタンをタッチしてみてください。",
    "それが、錯視の世界の入口になります。",
  ],
  [
    "最初ということもあり、多くの人が目にしたことがある錯視を用意しました。",
    "初めてみた人のためにも説明をすると、上に書かれている2本の線の長さは、同じ長さなのです。",
  ],
  [
    "検証のために、線の先に書かれた矢印の部分を消して、長さを確認してみましょう。",
  ],
  [
    "検証のために、線の先に書かれた矢印の部分を消して、長さを確認してみましょう。",
    "重ねて見ると、同じ長さであることがはっきりと分かります。",
    "これをミュラー・リヤー錯視といいます。",
  ],
  [
    "初めての錯視は、理解していただけたと思います。",
    "しかし、まだここは錯視の世界のほんの入口にすぎません。",
    "この錯視を見て頭が痛くなりそう、ちょっと気持ち悪くなりそうと思った方は、このアプリをこのまま続けることはオススメしません。",
    "この文を読んでもこのアプリを進めてくれる方は、どうぞ上のボタンから最後まで楽しんでください。",
  ],
];

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  body: {
    flex: 8,
  },
  figureView: {
    flex: 5,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  outerSvg: {
    position:'absolute',
  },
});
