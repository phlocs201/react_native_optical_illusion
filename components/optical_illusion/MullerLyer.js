import React, { Component } from 'react';
import { View, Button, Animated, Text } from 'react-native';
import Svg, { Line } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);


export default class MullerLyer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: new Animated.Value(0),
        };
    }

    _handleStartAnimation() {
        Animated.sequence([
            Animated.timing(
                this.state.value,
                {toValue: 1, duration: 2000},
            ),
        ]).start();
    }

    render() {
        // const value = this.state.value.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [50, 0]
        // });

        const value = 50;
        const arrowOpacity = this.state.value.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        });

        const finalY = 110;
        const allowLength = 40;
        return (
        <View>
            <Svg
                height="350"
                width="350"
            >
                <AnimatedLine
                    x1="20"
                    y1={finalY - value - allowLength}
                    x2="60"
                    y2={finalY - value}
                    stroke="black"
                    strokeWidth="2"
                    opacity={arrowOpacity}
                />
                <AnimatedLine
                    x1="20"
                    y1={finalY - value + allowLength}
                    x2="60"
                    y2={finalY - value}
                    stroke="black"
                    strokeWidth="2"
                    opacity={arrowOpacity}
                />
                <AnimatedLine
                    x1="60"
                    y1={finalY - value}
                    x2="250"
                    y2={finalY - value}
                    stroke="black"
                    strokeWidth="2"
                />
                <AnimatedLine
                    x1="290"
                    y1={finalY - value - allowLength}
                    x2="250"
                    y2={finalY - value}
                    stroke="black"
                    strokeWidth="2"
                    opacity={arrowOpacity}
                />
                <AnimatedLine
                    x1="290"
                    y1={finalY - value + allowLength}
                    x2="250"
                    y2={finalY - value}
                    stroke="black"
                    strokeWidth="2"
                    opacity={arrowOpacity}
                />

                <AnimatedLine
                    x1="20"
                    y1={finalY + value - allowLength}
                    x2="60"
                    y2={finalY + value}
                    stroke="black"
                    strokeWidth="2"
                    opacity={arrowOpacity}
                />
                <AnimatedLine
                    x1="20"
                    y1={finalY + value + allowLength}
                    x2="60"
                    y2={finalY + value}
                    stroke="black"
                    strokeWidth="2"
                    opacity={arrowOpacity}
                />
                <AnimatedLine
                    x1="60"
                    y1={finalY + value}
                    x2="250"
                    y2={finalY + value}
                    stroke="black"
                    strokeWidth="2"
                />
                <AnimatedLine
                    x1="290"
                    y1={finalY + value - allowLength}
                    x2="250"
                    y2={finalY + value}
                    stroke="black"
                    strokeWidth="2"
                    opacity={arrowOpacity}
                />
                <AnimatedLine
                    x1="290"
                    y1={finalY + value + allowLength}
                    x2="250"
                    y2={finalY + value}
                    stroke="black"
                    strokeWidth="2"
                    opacity={arrowOpacity}
                />
            </Svg>
            <Button
                onPress={() => this._handleStartAnimation()}
                title="結果を見る"
            />
            </View>
        );
    }
}