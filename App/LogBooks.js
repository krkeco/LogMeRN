import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Button,
  TextInput,
  StatusBar,
} from 'react-native';

import DialogInput from 'react-native-dialog-input';
import AButton from './AButton.js';
import {faPlus } from '@fortawesome/free-solid-svg-icons'


export default class LogBooks extends Component<Props> {
 constructor(props) {
    super(props);
    this.state = {
      newLogBook: false,
      newLogBookText: 'logbook',
    }
  }

  addLogBook = (title) => {
    this.setState({newLogBook: false},this.props.saveData)
    this.props.books.push(this.props.newBook(title))
    
  }
  
  render() {
    let bookView = null;

    if(this.props.books != null){
        booksView = this.props.books.map((book,index) => {
          return <TouchableOpacity 
            style={{width: 300, height: 80,marginTop:20, alignItems: 'center',backgroundColor: '#90caf9', borderRadius: 10}}
            key={index}
            onPress={() => this.props.selectBook(index)} >
            <Text style={{fontSize: 36, marginTop:10}}>{book.name}</Text>
            {book.logs.map((log, index) => {
              return <Text key={index} style={{marginLeft: 10}}>{log.name}</Text>
            })}
          </TouchableOpacity>
        })
    }
    let addButton = <AButton
    onPress={()=>this.setState({newLogBook: true})} 
    icon={faPlus}
    />

    let newLogModal =
    <DialogInput isDialogVisible={this.state.newLogBook}
      title={"New LogBook"}
      message={"LogBook Title:"}
      hintInput ={"Your Logbook title"}
      submitInput={ (inputText) => {this.addLogBook(inputText)} }
      closeDialog={ () => {this.setState({newLogBook: false})}}>
    </DialogInput>

    return (
      <View style={{alignItems:'center'}}>

        {booksView}

        {addButton}

        {newLogModal}

      </View>
    );

  }
}