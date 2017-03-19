import React, { Component } from 'react';
import Svg,{
    Line,
} from 'react-native-svg';

export default class Ponzo01 extends Component {
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
        {/* 内側の || */}
        <Line
          x1="60"
          y1="30"
          x2="60"
          y2="70"
          stroke="black"
          strokeWidth="2"
        />
        <Line
          x1="105"
          y1="30"
          x2="105"
          y2="70"
          stroke="black"
          strokeWidth="2"
        />
      </Svg>
    );
  }
}