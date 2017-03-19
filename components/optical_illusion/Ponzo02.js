import React, { Component } from 'react';
import { View, Button, Animated, Text } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

export default class Ponzo01 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacityAnim: new Animated.Value(0),
            leftAnim: new Animated.Value(0),
        };
    }

    _handleStartAnimation() {
        Animated.sequence([
            Animated.timing(
                this.state.opacityAnim,
                {toValue: 1, duration: 2000},
            ),
            Animated.timing(
                this.state.leftAnim,
                {toValue: 1, duration: 2000},
            ),
        ]).start();
    }

    render() {
        const opacity1to0 = this.state.opacityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        });
        const left120to25 = this.state.leftAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [120, 25]
        });

        return (
          <View style={{
            width: 200,
            height: 200,
            margin: 20,
            position:'absolute',
          }}>
            <View>
              <Svg
                height="200"
                width="200"
              >
                {/* 外側の < */}
                <AnimatedLine
                  x1="0"
                  y1="100"
                  x2="200"
                  y2="0"
                  stroke="black"
                  strokeWidth="2"
                  opacity={opacity1to0}
                />
                <AnimatedLine
                  x1="0"
                  y1="100"
                  x2="200"
                  y2="200"
                  stroke="black"
                  strokeWidth="2"
                  opacity={opacity1to0}
                />
              </Svg>
            </View>
            <View style={{
              position:'absolute',
              top: 50,
              left: 25,
            }}>
              <Svg
                height="100"
                width="100"
              >
                {/* 左の || */}
                <Circle
                  cx="50"
                  cy="50"
                  r="30"
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                />
              </Svg>
            </View>
            <Animated.View style={{
              position:'absolute',
              top: 50,
              left: left120to25,
            }}>
              <Svg
                height="100"
                width="100"
              >
                {/* 右の | */}
              <Circle
                cx="50"
                cy="50"
                r="30"
                stroke="black"
                strokeWidth="2"
                fill="none"
              />
              </Svg>
            </Animated.View>
            <Button
                onPress={() => this._handleStartAnimation()}
                title="結果を見る"
            />
          </View>
        );
    }
}

