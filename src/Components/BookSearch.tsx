import * as React from 'react';
import { Link, } from 'react-router-dom';
import BookModel from '../DataTypes/BookModel';
import Book from '../Components/Book';
import EBookshelf from '../DataTypes/EBookshelf';
import BookEngine from '../Utils/BookEngine';

class BookSearchProps {
    constructor(
        public booksInGallery: BookModel[],
        public addToBooks: (book: BookModel, bookshelf: EBookshelf) => void,
        public removeFromBooks: (book: BookModel) => void) {
    }
}

class BookSearchState {
    constructor(
        public mostRecentlyQueriedBooks: Array<BookModel>) {
    }
}

/* tslint:disable */
class BookSearch extends React.Component<BookSearchProps, any> {
/* tslint:enable */

    state: BookSearchState = new BookSearchState([]);

    constructor(props: BookSearchProps) {
        super(props);
    }

    render() {
        let booksToDisplay = this.state.mostRecentlyQueriedBooks.map((book: BookModel) => {
            let matchingBookInGallery = this.props.booksInGallery.find((galleryBook: BookModel) => {
                return book.bookId === galleryBook.bookId;
            });

            return matchingBookInGallery == null ? book : matchingBookInGallery;
        });
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                        <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                            <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchChange(event)}/>

                        </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {booksToDisplay.map((book: BookModel) => (
                            <Book
                                addToBookList={this.props.addToBooks}
                                removeFromBookList={this.props.removeFromBooks}
                                bookModel={book}>
                            </Book>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }

    public searchChange = (event: React.ChangeEvent<HTMLInputElement>): Promise<void>  => {
        let query = event.target.value;

        if (query == null || query === '') {
            this.setState( {mostRecentlyQueriedBooks: []});
            return Promise.resolve();
        }

        return BookEngine.search(query)
            /* tslint:disable */
            .then((books: BookModel[]) => {
                this.setState( { mostRecentlyQueriedBooks: books } );
            }).catch(() => {
                this.setState( {mostRecentlyQueriedBooks: []});
            });
    };
}

export default BookSearch;