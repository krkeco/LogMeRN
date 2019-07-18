import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Button,
  Picker,
  TextInput,
  Text,
  StatusBar,
} from 'react-native';

// import Storage from 'react-native-storage';
// import AsyncStorage from '@react-native-community/async-storage';

import DialogInput from 'react-native-dialog-input';
import AButton from './AButton.js';
import LogItem from './LogItem.js';
import GraphData from './GraphData.js';

 
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
 
export default class Logs extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
      newLog: false,
      showGraph: false,
      newLogText: 'log',
    }
  }

  selectLog = (log) => {
    alert(log);
  }

  addLog = (log) => {
    this.props.logBook.logs.push(log);
    this.setState({newLog: false});
  }

  logData = () => {
    alert('going to do something!')
  }

  viewGraph = () => {
    this.setState({showGraph: true});
  }

  render() {
    let logs = <View >
    {this.props.logBook.logs.map((log,index) => {
          return <LogItem
            key={index}
            selectLog={() => this.selectLog(index)}
            log={log}
            index={index}/>
    })}
    </View>

    if(this.state.showGraph){
      logs = <GraphData/>
    }


    let addButton = <AButton
      onPress={() => this.setState({newLog: true})} 
      text="Add a Log"
      />

    let logButton = <AButton
      onPress={() => this.logData()}
      text="Log this data"/>

    let viewGraphButton = <AButton
      onPress={() => this.viewGraph()}
      text="View Graph Data"/>


    let newLogModal =
    <DialogInput isDialogVisible={this.state.newLog}
      title={"New Log"}
      message={"Log:"}
      hintInput ={"Your Log"}
      submitInput={ (inputText) => {this.addLog(inputText)} }
      closeDialog={ () => {this.setState({newLog: false})}}>
    </DialogInput>

    return (
      <View>
        <Text>{this.props.logBook.name} logs:</Text>
        
        {logs}
      
        {addButton}

        {newLogModal}

        {logButton}

        {viewGraphButton}
      
      </View>
    );

  }
}