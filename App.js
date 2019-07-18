import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
 
import Navigator from './App/Navigator.js';

type Props = {};
export default class App extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <SafeAreaView>
        <Navigator/>
      </SafeAreaView>
    );
  }
}