import React, { Component } from 'react';
import {newBook} from './Book'

export const deleteLog = (books, bookIndex, logIndex) => {
    let newBooks = [];
    let newLogs = [];

    books.map((book, index) => {
      if (index != bookIndex) {
        newBooks.push(book);
      } else {
        newLogs = newBook(book.name);
        book.logs.map((log, i) => {
          if (i != logIndex) {
            newLogs.logs.push(log);
          }
        });
        newBooks.push(newLogs);
      }
    });
    return newBooks;
    
  };
