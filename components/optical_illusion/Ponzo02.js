import React, { Component } from 'react';
import Svg,{
    Line,
    Circle,
} from 'react-native-svg';

export default class Ponzo02 extends Component {
  render() {
    return (
      <Svg
        height="100"
        width="110"
      >
        {/* 外側の < */}
        <Line
          x1="10"
          y1="50"
          x2="110"
          y2="0"
          stroke="black"
          strokeWidth="2"
        />
        <Line
          x1="10"
          y1="50"
          x2="110"
          y2="100"
          stroke="black"
          strokeWidth="2"
        />
        {/* 内側の ○ ○ */}
        <Circle
          cx="50"
          cy="50"
          r="13"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
        <Circle
          cx="95"
          cy="50"
          r="13"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
      </Svg>
    );
  }
}