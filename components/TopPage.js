import React, { Component } from 'react';
import {
  View,
  ListView,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Text,
} from 'react-native';
import Svg,{
  Line,
} from 'react-native-svg';

import Header from './Header';
import { optical_illusion_set } from '../data/optical_illusion_set';

export default class TopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_list: optical_illusion_set,
      name: 'name',
    };
  }
  _handleChangeName(name) {
    this.setState({name: name});
  }
  _renderRow(rowData, rowId, navigator) {
    return (
      <TouchableHighlight onPress={() => {
        this._pressRow(rowId, navigator);
      }}>
        <View style={styles.listRow}>
          <View style={styles.listText}>
            <Text>{rowData}</Text>
          </View>
          <View style={styles.listArrow}>
            <RightwardsArrow />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowId, navigator) {
    this.setState({name: rowId});
    navigator.push({title: 'SecondPage', index: 1});
  }

  render () {
    const navigator = this.props.navigator;
    const { name, data_list } = this.state;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const data = ds.cloneWithRows(data_list);
    return (
      <View style={styles.containerView}>
        <Header 
          name={name}
        />
        <TextInput2
          _handleChangeName={(name) => this._handleChangeName(name)}
          name={name}
        />
        <ListView
          dataSource={data}
          renderRow={(rowData, sectionId, rowId, highlightRow) =>
            this._renderRow(rowData, rowId, navigator)}
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

class RightwardsArrow extends Component {
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

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 22,
  },
  listRow: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    padding: 20,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  listText: {
    justifyContent: 'center',
    flex: 15,
  },
  listArrow: {
    justifyContent: 'center',
    flex: 1,
  },
});
