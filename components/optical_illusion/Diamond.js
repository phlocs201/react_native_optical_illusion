import React, { Component } from 'react';
import { View, Button, Animated, Text } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

export default class Diamond extends Component {
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
        const rotate45to0 = this.state.opacityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['45deg', '0deg']
        });
        const left120to0 = this.state.leftAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [120, 0]
        });

        return (
          <View style={{
            width: 200,
            height: 200,
            margin: 20,
            position:'absolute',
          }}>
            <View style={{
              width: 300,
              height: 300,
            }}>
              <View style={{
                position:'absolute',
                top: 50,
                left: 0,
              }}>
                <Svg
                  height="200"
                  width="200"
                >
                {/* 右の □ */}
                <Rect
                    x="25"
                    y="5"
                    width="100"
                    height="100"
                    fill="none"
                    strokeWidth="3"
                    stroke="black"
                />
                </Svg>
              </View>
              <Animated.View style={{
                position:'absolute',
                top: 50,
                left: left120to0,
                transform: [{ rotate: rotate45to0}]
              }}>
                <Svg
                  height="200"
                  width="200"
                >
                {/* 右の □ */}
                <Rect
                    x="25"
                    y="5"
                    width="100"
                    height="100"
                    fill="none"
                    strokeWidth="3"
                    stroke="black"
                />
                </Svg>
              </Animated.View>
            </View>
            <Button
                onPress={() => this._handleStartAnimation()}
                title="結果を見る"
            />
          </View>
        );
    }
}