import React, { Component } from 'react';
import { View, Button, Animated, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

export default class Ponzo02 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacityAnim: new Animated.Value(0),
            leftAnim: new Animated.Value(0),
            isAnimationFinished: false,
            isPressed: false,
        };
    }

    _handleStartAnimation() {
      if (!this.state.isPressed) {
            this.setState({ isPressed: true });
            Animated.sequence([
                Animated.timing(
                    this.state.opacityAnim,
                    {toValue: 1, duration: 2000},
                ),
                Animated.timing(
                    this.state.leftAnim,
                    {toValue: 1, duration: 2000},
                ),
            ]).start(() => this.setState({
              isAnimationFinished: true,
            }));
        }
    }

    render() {
      const {isAnimationFinished} = this.state;
        const opacity1to0 = this.state.opacityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        });
        const left120to25 = this.state.leftAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [120, 25]
        });

        return (
          <View style={styles.containerView}>
          <View style={styles.figureView}>
          <TouchableWithoutFeedback
            onPress={() => this._handleStartAnimation()}
          >
          <View style={styles.outerSvg}>
            <View>
              <Svg height="200" width="200">
                {/* 外側の < */}
                <AnimatedLine x1="0" y1="100" x2="200" y2="0" stroke="black" strokeWidth="2" opacity={opacity1to0} />
                <AnimatedLine x1="0" y1="100" x2="200" y2="200" stroke="black" strokeWidth="2" opacity={opacity1to0} />
              </Svg>
            </View>
            <View style={styles.circleSvg}>
              <Svg height="100" width="100">
                {/* 左の ◯　*/}
                <Circle cx="50" cy="50" r="30" stroke="black" strokeWidth="2" fill="none" />
              </Svg>
            </View>
            <Animated.View style={[styles.circleSvg, {left: left120to25 }]}>
              <Svg height="100" width="100">
                {/* 右の ◯ */}
              <Circle cx="50" cy="50" r="30" stroke="black" strokeWidth="2" fill="none" />
              </Svg>
            </Animated.View>
          </View>
          </TouchableWithoutFeedback>
          </View>
          <View style={styles.descriptionView}>
              { !isAnimationFinished ?
                 <Text style={{color: 'red'}}>画面をタッチして結果を確認してみよう！！！</Text> :
                  <Text>説明文を入れる説明文を入れる説明文を入れる</Text>}
              <Text>説明文を入れる説明文を入れる説明文を入れる</Text>
              <Text>説明文を入れる説明文を入れる説明文を入れる</Text>
              <Text>説明文を入れる説明文を入れる説明文を入れる</Text>
              <Text>説明文を入れる説明文を入れる説明文を入れる</Text>
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
    flex: 2
  },
  descriptionView: {
    flex: 1,
    alignItems: 'center'
  },
  outerSvg: {
    margin: 70,
    position:'absolute',
  },
  circleSvg: {
    position:'absolute',
    top: 50,
    left: 25,
  }
});