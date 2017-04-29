import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Animated,
  StyleSheet,
} from 'react-native';
import Header from './common/Header';

import Svg, { Line } from 'react-native-svg';

export default class Tutorial extends Component {
  _pressReturn(navigator) {
    navigator.push({title: 'TopPage', index: 1});
  }

  render () {
    const { navigator } = this.props;
    return (
        <View style={styles.containerView}>
            <Header title='錯視' hasButton='true' onReturn={() => this._pressReturn(navigator)} />
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
        <Description descPhase={descPhase}/>
        <Footer
          illusionPhase={illusionPhase}
          descPhase={descPhase}
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

class Description extends Component {
  render() {
    const { descPhase } = this.props;
    let descArray = [];
    switch (descPhase) {
      case 0:
        descArray = [
          "まず錯視の世界に招待する前に、注意点があります。",
          "車酔いなどに弱い方が見ると、気分が悪くなる場合がありますので、閲覧の際には注意してください。",
          "また、見え方には個人差がありますので、ご了承ください",
          "それでは、錯視の世界にご招待いたしましょう。",
          "「次へ」というボタンをタッチしてみてください。",
          "それが、錯視の世界の入口になります。",
        ]
        break;
      case 1:
        descArray = [
          "最初ということもあり、多くの人が目にしたことがある錯視を用意しました。",
          "初めてみた人のためにも説明をすると、上に書かれている2本の線の長さは、同じ長さなのです。",
        ]
        break;
      case 2:
        descArray = [
          "検証のために、線の先に書かれた矢印の部分を消して、長さを確認してみましょう。",
        ]
        break;
      case 3:
        descArray = [
          "検証のために、線の先に書かれた矢印の部分を消して、長さを確認してみましょう。",
          "重ねて見ると、同じ長さであることがはっきりと分かります。",
          "これをミュラー・リヤー錯視といいます。",
        ]
        break;
      case 4:
        descArray = [
          "初めての錯視は、理解していただけたと思います。",
          "しかし、まだここは錯視の世界のほんの入口にすぎません。",
          "この錯視を見て頭が痛くなりそう、ちょっと気持ち悪くなりそうと思った方は、このアプリをこのまま続けることはオススメしません。",
          "この文を読んでもこのアプリを進めてくれる方は、どうぞ上のボタンから最後まで楽しんでください。",
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
        <View style={styles.nextButtonsLeft} />
        <View style={styles.nextButton}>
          {illusionPhase === 4 ? <View /> :
              <Button
              onPress={this.props._nextPhase}
              style={styles.button}
              color='#2F387A'
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
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },

  body: {
    flex: 8,
  },
  footer: {
    flex: 1,
    backgroundColor: '#2980B9',
  },
  figureView: {
    flex: 5,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  descriptionView: {
    flex: 5,
    margin: 20,
  },
  descText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'left',
  },
  footerView: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  nextButtonsLeft: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
  button: {
    justifyContent: 'flex-start',
  },
  outerSvg: {
    position:'absolute',
  },
});
