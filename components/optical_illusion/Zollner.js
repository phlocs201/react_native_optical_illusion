import React, { Component } from 'react';
import { View, Button, Animated, Text, StyleSheet} from 'react-native';
import Svg, { Line } from 'react-native-svg';

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
class Lines extends Component {
  render() {
    const { y, isNorthWest } = this.props;
    const num = isNorthWest === "1" ? 20 : -20;
    let viewArray = [];
    for(let i = 0; i <= 255; i += 15 ) {
      viewArray.push(
        <Line x1={i - num}  y1={Number(y) - 5} x2={i + num}  y2={Number(y) + 5} stroke="black" strokeWidth="1"/>
      );
    }
    return (
      <Svg height="255" width="255">{viewArray}</Svg>
    )
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
          "直線Aは、下に傾いて見えますか？",
          "それとも、上に傾いて見えますか？",
        ]
        break;
      case 1:
        descArray = [
          "【答え】 傾いていない",
          "平行の水平線が交互に傾いて見えることを「ツェルナー錯視」といいます。",
        ]
        break;
      case 2:
        descArray = [
          "【解説】",
          "短い斜線と直線がつくる角度を鋭角過大視する方向に起こる、角度錯視になります。",
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
    marginVertical: 70,
    marginHorizontal: 50,
  },
  descriptionView: {
    flex: 4,
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
