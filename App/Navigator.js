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

  initDeleteAlert = (books, removeIndex, parentIndex = -1) => {
    Alert.alert(
      'Delete Item',
      'Deleting this means you will lose all the data you stored for it, are you sure you want to do this (this is irreversible).',
      [
        {
          text: 'Oh Snap!',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        { text: 'Confirmed!', onPress: () => {
          let newBooks = [];
          if( parentIndex < 0) {
            this.goBack();
            newBooks = deleteBook(books, removeIndex) 
          } else{
            newBooks = deleteLog(books, parentIndex, removeIndex)

          }
          this.setState({ books: newBooks }, () => storeData(newBooks));
        } },
      { cancelable: false },
      ],
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
    //normally this should be in navigator
    //but this is a really small app
    let viewPort;

    if (this.state.showLogBook) {
      viewPort = (
        <Logs
          goBack={this.goBack}
          storeData={() =>  storeData(this.state.books)}
          deleteLog={(index) => this.initDeleteAlert(this.state.books,  index, this.state.selectedBook)}
          deleteBook={() => this.initDeleteAlert(this.state.books,this.state.selectedBook)}
          logBook={this.state.books[this.state.selectedBook]}
        />
      );
    }else{
      viewPort = (
      <Books
        storeData={() => storeData(this.state.books)}
        books={this.state.books}
        selectBook={this.selectBook}
      />
    );

    }

    return <View>{viewPort}</View>;
  }
}
