import * as React from 'react';
import { Route, } from 'react-router-dom';
import './App.css';
import BookGallery from '../Components/BookGallery';
import BookModel from '../DataTypes/BookModel';
import EBookshelf from '../DataTypes/EBookshelf';
import BookSearch from '../Components/BookSearch';
import BookEngine from '../Utils/BookEngine';
import { BaseRoute, SearchRoute } from '../Utils/Routes';

class BooksAppState {
    constructor (
        public books: Array<BookModel>) {
    }
}

class BooksApp extends React.Component {
    state: BooksAppState = new BooksAppState([]);

    public componentDidMount(): void {
        BookEngine.getAll()
            .then((books: BookModel[]) => {
                this.setState(() => {
                    return new BooksAppState(books);
                });
            }).catch(() => {
                throw new Error('Fatal error: getAll failed');
        })
    }

    public addToBooks = (newBook: BookModel, bookshelf: EBookshelf): void => {
        BookEngine.changeShelf(newBook, bookshelf)
            .then((updatedBook: BookModel) => {

                this.setState((previousState: BooksAppState) => {

                    const books = previousState.books.filter((book: BookModel): boolean => {
                        return book.bookId !== updatedBook.bookId;
                    }).concat([updatedBook]);

                    return new BooksAppState(books);
                });
            });
    };

    public removeFromBooks = (toRemove: BookModel): void => {
        BookEngine.changeShelf(toRemove, EBookshelf.none)
            .then(() => {

                this.setState((previousState: BooksAppState) => {

                    const books = previousState.books.filter((book: BookModel): boolean => {
                            return toRemove.bookId !== book.bookId;
                    });

                    return new BooksAppState(books);
                });
            });
    };

    public render() {
        return (
            <div className="app">
                <Route exact path={SearchRoute} render={() => (
                  <BookSearch
                      booksInGallery={this.state.books}
                      addToBooks={(book: BookModel, bookshelf: EBookshelf) => this.addToBooks(book, bookshelf)}
                      removeFromBooks={(book: BookModel) => this.removeFromBooks(book)}>
                  </BookSearch>
                )}>
                </Route>
                <Route exact path={BaseRoute} render={() => (
                      <BookGallery
                          books={this.state.books}
                          addToBooks={(book: BookModel, bookshelf: EBookshelf) => this.addToBooks(book, bookshelf)}
                          removeFromBooks={(book: BookModel) => this.removeFromBooks(book)}>
                      </BookGallery>
                  )}>
                </Route>
            </div>
        );
    }
}

export default BooksApp;
