import * as React from 'react';
import { Link , } from 'react-router-dom';
import './App.css';
import Book from '../Components/Book';
import BookModel from '../DataTypes/BookModel';
import EBookshelf from '../DataTypes/EBookshelf';
import BookLanguage from '../Utils/BookLanguage';

class BookGalleryProps {
    constructor(
        public books: Array<BookModel>,
        public addToBooks: (book: BookModel, bookshelf: EBookshelf) => void,
        public removeFromBooks: (book: BookModel) => void) {
    }
}

/* tslint:disable */
class BookGallery extends React.Component<BookGalleryProps, any> {
    /* tslint:enable */
    constructor(props: BookGalleryProps) {
        super(props);
    }

    public render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.getBooksByBookshelfType(this.props.books, EBookshelf.currentlyReading)}
                        {this.getBooksByBookshelfType(this.props.books, EBookshelf.wantToRead)}
                        {this.getBooksByBookshelfType(this.props.books, EBookshelf.read)}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }

    private getBooksByBookshelfType(books: Array<BookModel>, bookshelf: EBookshelf): JSX.Element {
        let booksForBookshelf = books.filter((book: BookModel): boolean => {
            return book.shelf === bookshelf;
        });

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{BookLanguage.getPhraseForBookshelf(bookshelf)}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksForBookshelf.map((book: BookModel) => (
                                <Book
                                    addToBookList={this.props.addToBooks}
                                    removeFromBookList={this.props.removeFromBooks}
                                    bookModel={book}
                                >
                                </Book>
                            ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookGallery;
