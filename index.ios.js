/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry, ListView, Text, View, TextInput } from 'react-native';
import React, { Component } from 'react';
import Header from './components/Header';

import { optical_illusion_set } from './data/optical_illusion_set';

export default class react_native_optical_illusion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_list: optical_illusion_set,
      name: 'ikegami',
    };
    this._handleChangeName = this._handleChangeName.bind(this);
  }

  _handleChangeName(name) {
    this.setState({name: name});
  }

  render() {
    const { name, data_list } = this.state;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const data = ds.cloneWithRows(data_list);
    return (
      <View style={{
        flex: 1,
        paddingTop: 22
      }}>
        <Header 
          name={name}
        />
        <TextInput2
         _handleChangeName={this._handleChangeName}
         name={name}
         />
        <ListView
          dataSource={data}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}



class TextInput2 extends Component {
   render () {
     return (<TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(name) => this.props._handleChangeName(name)}
          value={this.props.name}
        />);
   }    
}

AppRegistry.registerComponent('react_native_optical_illusion', () => react_native_optical_illusion);
