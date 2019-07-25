import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View, processColor
} from 'react-native';
import update from 'immutability-helper';

import {LineChart} from 'react-native-charts-wrapper';
import {getPrettyDate} from './Utils.js';


export default class LineChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      data: {},
      startLabel: "2019-07-01",
      endLabel: "2019-07-31",

      marker: {
        enabled: true,
        digits: 2,
        backgroundTint: processColor('teal'),
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
      },
      xAxis: {
        granularityEnabled: true,
        granularity: 1,
      },
      // visibleRange: {x: {min: 1, max: 2}}
    };
  }

  componentDidMount() {

    // this.setState(
    //   update(this.state, {
    //     data: {
    //       $set: {
            // dataSets: [{
            //   values: [{x: 4, y: 135, label: 'hello label'}, {label: 'hello label',x: 5, y: 0.88}, {x: 6, y: 0.77}, {x: 7, y: 105}], label: 'A',
            // }, {
            //   values: [{x: 4, y: 105, label: 'hello label'}, {label: 'hello label',x: 5, y: 90}, {x: 6, y: 130}, {x: 7, y: 100}], label: 'B',
            // }, {
            //   values: [{x: 4, y: 110, label: 'hello label'}, {label: 'hello label',x: 5, y: 110}, {x: 6, y: 105}, {x: 7, y: 115}], label: 'C',
            // }],
    //       }
    //     }
    //   })
    // );

    this.setGraphData();
  }


  setGraphData = () =>{
    this.setGraphDataParams();
  }

  setGraphDataParams = () => {
    let startMill = new Date(this.state.startLabel);
    let endMill = new Date(this.state.endLabel);

    let totalLabels = Math.abs(endMill.getUTCDate() - startMill.getUTCDate() +1);
    // alert(startMill +" "+endMill + " " +totalLabels);
    
    let dataSets = [];

    this.props.logBook.logs.map((log, index) => {


    
      // let newW = totalLabels*100;
      let graphLogValues = [];
      let currentLabel = this.state.startLabel;

      let floatTime = //new Date(
        this.state.startLabel;
        //)
      for(let x = 1; x <= totalLabels; x++){
        let mLabel = getPrettyDate(floatTime);
        
        let yValue = 0;
        // this.getGraphEntryY(log,mLabel)
        // alert(JSON.stringify(log.values) + " <"+mLabel+">")
        if(log.values[mLabel] != undefined){

          alert('this date exists: '+JSON.stringify(log.values[mLabel]))
          yValue = parseInt(log.values[mLabel].value)
        }

        let graphObject = {x: x, y: yValue, label: mLabel}

        graphLogValues.push(graphObject)

        floatTime = //new Date(
          startMill.getTime() + (x)*1000*60*60*24;
          //);
        
      }

      dataSets.push({values: graphLogValues, label: 'label'})

    });
      // alert(JSON.stringify(dataSets))

    let dataSetsZ = [{
              values: [{x: 4, y: 135, label: 'hello label'}, {label: 'hello label',x: 5, y: 0.88}, {x: 6, y: 0.77}, {x: 7, y: 105}], label: 'A',
            }, {
              values: [{x: 4, y: 105, label: 'hello label'}, {label: 'hello label',x: 5, y: 90}, {x: 6, y: 130}, {x: 7, y: 100}], label: 'B',
            }, {
              values: [{x: 4, y: 110, label: 'hello label'}, {label: 'hello label',x: 5, y: 110}, {x: 6, y: 105}, {x: 7, y: 115}], label: 'C',
            }];

    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: dataSets,
          }
        }
      })
    );

    // this.setState({
    //   labels: paramLabels
    // },
    // ()=>this.compileGraphLogs()
    // );
  }

  getGraphEntryY = (label) => {
    // this.props.
  }

  compileGraphLogs = () => {
    
    this.props.logBook.logs.map((log, index) => {
      let logValues = [];
      // Object.keys(logs.values).map((value, index) =>{

      this.state.labels.map((label, index) => {

        let newLabel = label;
        newLabel.

        if(label.label)

        logValues.push({newLabel})
      })

    })
  }
  // compileGraphLogs = () => {
  //   this.restrictLogsToDates

  //   let dataSets = [];
  //   let values = [];
    
  //   this.props.logBook.logs.map((log, logIndex) =>{
          

  //   })
  //   let graphObject = {x: , y: };
    
  //   values.push({graphObject})

  //   dataSets.push({values});



  //   this.setState({
  //     graphLogs:{
  //           data: {
  //               $set: {
  //                 dataSets: [{
  //                   values: [{x: 4, y: 135}, {x: 5, y: 0.88}, {x: 6, y: 0.77}, {x: 7, y: 105}], label: 'A',
  //                 }, {
  //                   values: [{x: 4, y: 105}, {x: 5, y: 90}, {x: 6, y: 130}, {x: 7, y: 100}], label: 'B',
  //                 }, {
  //                   values: [{x: 4, y: 110}, {x: 5, y: 110}, {x: 6, y: 105}, {x: 7, y: 115}], label: 'C',
  //                 }],
  //               }
  //             }}
  //   })
  // }


  onPressLearnMore() {

    this.refs.chart.setDataAndLockIndex({
      dataSets: [{
        values: [
          {x: 1, y: 0.88},
          {x: 2, y: 0.77},
          {x: 3, y: 105},
          {x: 4, y: 135},
          {x: 5, y: 0.88},
          {x: 6, y: 0.77},
          {x: 7, y: 105},
          {x: 8, y: 135}
        ],
        label: 'A',
      }, {
        values: [
          {x: 1, y: 90},
          {x: 2, y: 130},
          {x: 3, y: 100},
          {x: 4, y: 105},
          {x: 5, y: 90},
          {x: 6, y: 130},
          {x: 7, y: 100},
          {x: 8, y: 105}
        ],
        label: 'B',
      }, {
        values: [
          {x: 1, y: 110},
          {x: 2, y: 105},
          {x: 3, y: 115},
          {x: 4, y: 110},
          {x: 5, y: 110},
          {x: 6, y: 105},
          {x: 7, y: 115},
          {x: 8, y: 110}],
        label: 'C',
      }],
    })
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    console.log(event.nativeEvent)
  }

  render() {
    return (
      <View style={{flex: 1}}>

        <Button onPress={this.onPressLearnMore.bind(this)} title="Press to load more"/>

        <View style={{height: 80}}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            legend={this.state.legend}
            marker={this.state.marker}
            xAxis={this.state.xAxis}            
            drawGridBackground={false}
            borderColor={processColor('teal')}
            borderWidth={1}
            drawBorders={true}
            autoScaleMinMaxEnabled={false}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={true}
            pinchZoom={true}
            doubleTapToZoomEnabled={true}
            highlightPerTapEnabled={true}
            highlightPerDragEnabled={false}
            // visibleRange={this.state.visibleRange}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            ref="chart"
            keepPositionOnRotation={false}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    height: 500,
  },
  chart: {
    flex: 1
  }
});
