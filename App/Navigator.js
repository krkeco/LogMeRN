import React, { Component } from 'react';
import {View, Alert} from 'react-native';

import Books from './Components/View/Books.js';
import Logs from './Components/View/Logs.js';
import Menu from './Components/UI/Menu.js';

import {storeData, getData} from './Utils/Async'
import {deleteBook, newBook} from './Utils/Book'
import {deleteLog} from './Utils/Log'

export default class Navigator extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showLogBook: false,
      selectedBook: 0,
      books: [],
    };
  }

  componentDidMount =  async() => {
    let books = await getData();
    this.setState({ books: JSON.parse(books) });
  }

  deleteLogAlert = (books, bookIndex, logIndex) => {
    Alert.alert(
      'Delete Log',
      'Deleting this log means you will lose all the data you stored for it, are you sure you want to do this (this is irreversible).',
      [
        {
          text: 'Oh Snap!',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        { text: 'Confirmed!', onPress: () => {
          let newBooks = [];
          newBooks = deleteLog(books, bookIndex, logIndex)
          this.setState({ books: newBooks }, () => storeData(newBooks));
        } },
      { cancelable: false },
      ],
    );
  };

  deleteBookAlert = (books, removeIndex) => {
    Alert.alert(
      'Delete LogBook',
      'Deleting this logbook means you will lose all the data you stored for it, are you sure you want to do this (this is irreversible and super cereal).',
      [
        {
          text: 'Oh Snap!',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        { text: 'Confirmed!', onPress: () => {
          this.goBack();
          let updatedBooks = [];
          updatedBooks = deleteBook(books, removeIndex) 
          
          this.setState({ books: updatedBooks }, ()=>storeData(updatedBooks));
        }},
      ],
      { cancelable: true },
    );
  };

  selectBook = (bookIndex) => {
    this.setState({
      showLogBook: true,
      selectedBook: bookIndex,
    });
  };

  goBack = () => {
    this.setState({ showLogBook: false });
  };

  render() {
    let viewPort = (
      <Books
        saveData={() => storeData(this.state.books)}
        books={this.state.books}
        addBook={this.addBook}
        selectBook={this.selectBook}
      />
    );

    if (this.state.showLogBook) {
      viewPort = (
        <Logs
          goBack={this.goBack}
          saveData={() =>  storeData(this.state.books)}
          deleteLog={(index) => this.deleteLogAlert(this.state.books, this.state.selectedBook, index)}
          deleteBook={() => this.deleteBookAlert(this.state.books,this.state.selectedBook)}
          logBook={this.state.books[this.state.selectedBook]}
        />
      );
    }

    return <View>{viewPort}</View>;
  }
}
