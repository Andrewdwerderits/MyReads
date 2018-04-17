import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BooksApp from './Components/BooksApp';
import './index.css';

ReactDOM.render(
  <BrowserRouter><BooksApp /></BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
