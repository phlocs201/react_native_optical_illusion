import { Text } from 'react-native';
import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    const { name } = this.props;
    return (
      <Text>{ name }</Text>
    );
  }
}