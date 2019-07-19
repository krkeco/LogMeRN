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
          key={index}
          onPress={() => this.props.selectBook(index)} >
            <Text style={{fontSize: 18, marginTop:10}}>book {book.name}</Text>
            {book.logs.map((log, index) => {
              return <Text key={index} style={{marginLeft: 10}}>{log.name}</Text>
            })}
          </TouchableOpacity>
        })
    }
    let addButton = <AButton
    onPress={()=>this.setState({newLogBook: true})} 
    text="Add a LogBook"
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
      <View>
        <Text style={{fontSize: 20}}>LogBooks:</Text>

        {booksView}

        {addButton}

        {newLogModal}

      </View>
    );

  }
}