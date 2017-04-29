import React, { Component } from 'react';
import {
  View,
  ListView,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Text,
} from 'react-native';

import RightwardsArrow from './util/RightwardsArrow';
import { optical_illusion_set } from '../data/optical_illusion_set';

export default class TopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_list: optical_illusion_set,
    };
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
    const { data_list } = this.state;
    navigator.push({title: data_list[rowId].name, index: 2, illusion: data_list[rowId].component});
  }

  render () {
    const { navigator } = this.props;
    const { data_list } = this.state;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const data = ds.cloneWithRows(data_list.map(v => v.name));
    return (
      <View style={styles.containerView}>
        <ListView
          dataSource={data}
          renderRow={(rowData, sectionId, rowId, highlightRow) =>
            this._renderRow(rowData, rowId, navigator)}
        />
      </View>
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
