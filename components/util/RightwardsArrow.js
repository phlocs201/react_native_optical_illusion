import React, { Component } from 'react';
import Svg,{
  Line,
} from 'react-native-svg';

export default class RightwardsArrow extends Component {
  render () {
    return (
      <Svg
        height="15"
        width="10"
      >
        <Line
          x1="0"
          y1="0"
          x2="7.5"
          y2="7.5"
          stroke="gray"
          strokeWidth="2"
        />
        <Line
          x1="0"
          y1="14.5"
          x2="7.5"
          y2="7"
          stroke="gray"
          strokeWidth="2"
        />
      </Svg>
    );
  }
}
