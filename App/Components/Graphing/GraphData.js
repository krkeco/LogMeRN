import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { LineChart } from 'react-native-charts-wrapper';

import { getPrettyDate } from '../../Utils/Utils.js';

import Button from '../UI/Button.js';
import DatePicker from '../UI/DatePicker.js';


export default class GraphData extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      startLabel: '2019-07-01',
      endLabel: '2019-07-07',
      totalLabels: 7,

      width: 3100,

      logSets: [{ name: 'set1', data: [], color: '#000' }],

      masterLogBook: [],
      filters: [],

      labels: [1],
      logBook: [
        //15s x6  10sx2
        {
          data: [1],
          name: 'name',
          color: (opacity = 1) => `rgba(50, 250, 50, ${opacity})`, // optional
        },
      ],
    };
  }

  componentDidMount() {
    this.setLabelData()
  }

  setLabelData = () => {
    let startMill = new Date(this.state.startLabel);
    let endMill = new Date(this.state.endLabel);

    let totalLabels = Math.abs(
      endMill.getUTCDate() - startMill.getUTCDate() + 1,
    );
    // alert(startMill +" "+endMill + " " +totalLabels);

    let newW = totalLabels * 100;
    let paramLabels = [];
    let currentLabel = this.state.startLabel;

    let floatTime = new Date(this.state.startLabel);
    for (let x = 1; x <= totalLabels; x++) {
      let mLabel = '';
      if (x == 1 || x % 365 == 0) {
        mLabel += floatTime.getUTCFullYear();
        mLabel += '-';
      }
      mLabel += floatTime.getUTCMonth() + 1;
      mLabel += '-';
      mLabel += floatTime.getUTCDate();

      paramLabels.push(mLabel);

      floatTime = new Date(startMill.getTime() + x * 1000 * 60 * 60 * 24);
    }
    this.setState(
      {
        labels: paramLabels,
        width: newW,
        totalLabels: totalLabels,
      },
      () => this.compileGraphData(),
    );
  };

  compileGraphData = () => {
    let graphData = [];

    if (this.props.logBook.logs != undefined) {
      this.props.logBook.logs.map((log, index) => {
        let dataInRange = [];
        let startMills = new Date(this.state.startLabel).getTime();
        // alert(startMills)
        let endMills = new Date(this.state.endLabel).getTime();
        log.values.map((data, i) => {
          if (data.date >= startMills && data.date <= endMills) {
            // alert("add time")
            dataInRange.push(data);
          }
        });

        let logDataArray = [];

        this.state.labels.map((label, index) => {
          floatTime = new Date(startMills + index * 1000 * 60 * 60 * 24);

          let labelData = 0;
          // let milLabel = new Date(label)
          dataInRange.map((logData, dI) => {
            // alert(logData.date + " vs "+ floatTime)
            let logDate = new Date(logData.date);

            if (
              logDate.getFullYear() == floatTime.getFullYear() &&
              logDate.getMonth() == floatTime.getMonth() &&
              logDate.getDate() == floatTime.getDate()
            ) {
              labelData = logData.value;
            }
          });

          logDataArray.push(labelData);
        });

        if (logDataArray.length > 0) {
          let dataObject = {
            name: log.name,
            data: logDataArray,
            colorCode: log.color,
            color: () => log.color,
          };
          graphData.push(dataObject);
        }
      });
      this.setState({
        logBook: graphData,
        masterLogBook: graphData,
      });
      // alert(JSON.stringify(graphData));
    }
  };

  onLayout = (e) => {
    // this.setState({width: Dimensions.get('window').width})
    // console.log(width, height)
  }

  filter = (index) => {
    let newFilters = [];
    this.state.filters.map((filter, index) => {
      newFilters.push(filter);
    });

    if (newFilters.indexOf(index) > -1) {
      newFilters.splice(this.state.filters.indexOf(index), 1);
    } else {
      newFilters.push(index);
    }

    this.setState({ filters: newFilters });

    let floatArray = [];
    this.state.masterLogBook.map((log, index) => {
      if (newFilters.indexOf(index) == -1) {
        floatArray.push(log);
      }
    });

    if (floatArray.length != 0) {
      this.setState({ logBook: floatArray });
    } else {
      alert('You must have at least 1 log to graph!');
    }
  };

  setStartDate = (date) => {
    let d = new Date(date);
    let ed = new Date(this.state.endLabel);
    let newDate = getPrettyDate(date);

    if (d.getDate() + 7 > ed.getDate()) {
      let endD = d.getTime() + 7 * 24 * 60 * 60 * 1000;
      this.setState(
        { endLabel: getPrettyDate(endD), startLabel: getPrettyDate(date) },
        this.setLabelData,
      );
    } else {
      this.setState({ startLabel: getPrettyDate(date) }, this.setLabelData);
    }
  };
  setEndDate = (date) => {
    let d = new Date(date);
    let sd = new Date(this.state.startLabel);
    let newDate = getPrettyDate(date);

    if (d.getDate() - 7 < sd.getDate()) {
      let startD = d.getTime() - 7 * 24 * 60 * 60 * 1000;
      this.setState(
        { endLabel: getPrettyDate(date), startLabel: getPrettyDate(startD) },
        this.setLabelData,
      );
    } else {
      this.setState({ endLabel: getPrettyDate(date) }, this.setLabelData);
    }
  };

  render() {
    return (<View>
          <ScrollView>
            <View style={{ flexDirection: 'row' }}>
              <DatePicker text="Select Start Date" returnDate={this.setStartDate} />
              <DatePicker text="Select End Date" returnDate={this.setEndDate} />
              <Button
                onPress={() => this.props.goBack()}
                text="Hide"
                icon={faChartBar}
              />
            </View>
            <Text>
              Graphing from: {this.state.startLabel} to {this.state.endLabel}
            </Text>
    
            <ScrollView horizontal={true} onLayout={this.onLayout}>
              <View style={{ flex: 1, width: 1000, height: 500 }}>
                <View style={{ flex: 1 }}>
                  <LineChart
                    style={{ flex: 1 }}
                    data={{
                      dataSets: [
                        {
                          label: 'demo',
                          values: [
                            { x: 0, y: 0, marker: 'hello there' },
                            { y: 1, x: 0 },
                            { y: 1, x: 3, marker: 'hello there' },
                            { y: 2, x: 4 },
                            { y: 5, x: 6 },
                            { y: 1, x: 7 },
                          ],
                        },
                      ],
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </ScrollView>
        </View>);
  }
}
