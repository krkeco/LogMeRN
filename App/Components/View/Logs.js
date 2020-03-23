import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import DialogInput from 'react-native-dialog-input';

import DatePicker from '../UI/DatePicker.js';
import Button from '../UI/Button.js';

import LogItem from '../Log/LogItem.js';

import GraphData from '../Graphing/GraphData.js';
import SampleLine from '../Graphing/SampleLine.js';

import { getPrettyDate } from '../../Utils.js';

import {
  faAngleLeft,
  faBars,
  faChartBar,
  faCalendar,
  faSave,
  faWindowClose,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

export default class Logs extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      newLog: false,
      deleteLog: false,
      deleteBook: false,
      showGraph: false,
      newLogText: 'log',
      prettyDate: '2019-07-07',
    };
  }

  componentDidMount() {
    let d = new Date().getTime();
    this.setState({ prettyDate: getPrettyDate(d) });
  }

  addLog = (title) => {
    this.props.logBook.logs.push(this.newLog(title));

    this.setState({ newLog: false }, this.props.saveData);
  };

  newLog = (title) => {
    let r = 125 + Math.floor(Math.random() * 130);
    let g = 125 + Math.floor(Math.random() * 130);
    let b = 125 + Math.floor(Math.random() * 130);
    let o = 1;
    let colour = `rgba(${r}, ${g}, ${b}, ${o})`;

    let newLog = {
      color: colour,
      label: title,
      values: {},
    };
    return newLog;
  };

  logData = () => {
    alert('going to do something!');
  };

  saveLogData = (date, value, note, log) => {
    let key = date;
    log.values[key] = this.newLogObject(value, note);

    this.props.saveData();
  };
  newLogObject = (value, note) => {
    let newEntry = {
      value: value,
      note: note,
    };
    return newEntry;
  };

  returnDate = (date) => {
    this.setState({
      date: date,
      prettyDate: getPrettyDate(date),
    });
  };

  setColor = (color, log) => {
    log.color = color;
    this.props.saveData();
  };

  render() {
    let logs = null;
    if (this.props.logBook.logs != null) {
      logs = (
        <View>
          {this.props.logBook.logs.map((log, index) => {
            return (
              <LogItem
                setColor={(color) => this.setColor(color, log)}
                setDate={(date) => {
                  this.returnDate(date);
                }}
                prettyDate={this.state.prettyDate}
                saveLogData={(date, value, note, log) => {
                  this.saveLogData(date, value, note, log);
                }}
                deleteLog={(logIndex) => this.props.deleteLog(logIndex)}
                key={index}
                log={log}
                index={index}
              />
            );
          })}
        </View>
      );
    }

    let deleteButton = (
      <Button onPress={() => this.props.deleteBook()} icon={faWindowClose} />
    );

    let addButton = (
      <Button onPress={() => this.setState({ newLog: true })} icon={faPlus} />
    );

    let dateButton = <DatePicker returnDate={this.returnDate} />;

    let newLogModal = (
      <DialogInput
        isDialogVisible={this.state.newLog}
        title={'New Log'}
        message={'Log:'}
        hintInput={'Your Log'}
        submitInput={(inputText) => {
          this.addLog(inputText);
        }}
        closeDialog={() => {
          this.setState({ newLog: false });
        }}
      ></DialogInput>
    );

    let viewGraphButton = (
      <Button
        onPress={() => this.setState({ showGraph: true })}
        icon={faChartBar}
      />
    );

    let logBookMenu = (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {addButton}

          {newLogModal}

          {dateButton}
        </View>

        {viewGraphButton}
      </View>
    );

    if (this.props.logBook.logs.length < 1) {
      logBookMenu = (
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {addButton}

          {newLogModal}
        </View>
      );
    }
    if (this.state.showGraph) {
      logBookMenu = null;

      logs = (
        <SampleLine
          goBack={() => this.setState({ showGraph: false })}
          logBook={this.props.logBook}
        />
      );
    }

    return (
    <View style={{height: '100%'}} >
        <View style={{ flexDirection: 'row' }}>
          <Button icon={faAngleLeft} onPress={this.props.goBack} />

          <Text style={{ fontSize: 32, flex: 1, marginLeft: 5 }}>
            {this.props.logBook.name}
          </Text>
          {deleteButton}
        </View>
        <View style={{flexDirection:'row'}}>
        {logBookMenu}
        </View>
      <ScrollView>
        {logs}
      </ScrollView>
      </View>
    );
  }
}
