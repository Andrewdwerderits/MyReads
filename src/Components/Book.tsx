import * as React from 'react';
import './App.css';
import BookModel from '../DataTypes/BookModel';
import EBookshelf from '../DataTypes/EBookshelf';
import BookLanguage from '../Utils/BookLanguage';

class BookProps {
    constructor(
        public addToBookList: (book: BookModel, bookshelf: EBookshelf) => void,
        public removeFromBookList: (book: BookModel) => void,
        public bookModel: BookModel) {
    }
}

/* tslint:disable */
class Book extends React.Component<BookProps, any> {
    /* tslint:enable */

    constructor (props: BookProps) {
        super(props);
    }

    render() {
        const bookTitle = this.props.bookModel.bookTitle;
        const bookAuthors = this.props.bookModel.bookAuthors || [];
        const bookImageUrl = this.props.bookModel.bookImageUrl;

        return (
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128, height: 193,
                            backgroundImage: `url(${bookImageUrl})`
                        }}
                    >
                    </div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => this.handleShelfChange(event)}>
                            <option value="none">Move to...</option>
                            {this.getSelectListOption(EBookshelf.currentlyReading)}
                            {this.getSelectListOption(EBookshelf.wantToRead)}
                            {this.getSelectListOption(EBookshelf.read)}
                            <option value="remove">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bookTitle}</div>
                {bookAuthors.map((value: string) => (
                    <div className="book-authors">{value}</div>
                ))}
            </div>
        );
    }

    private static getSelectOptionValue(bookshelf: EBookshelf): string {
        switch (bookshelf) {
            case EBookshelf.currentlyReading:
                return 'currentlyReading';
            case EBookshelf.wantToRead:
                return 'wantToRead';
            case EBookshelf.read:
                return 'read';
            case EBookshelf.none:
                return 'none';
            default:
                return '';
        }
    }

    private static getEBookshelfFromSelectValue(value: string): EBookshelf {
        switch (value) {
            case 'currentlyReading':
                return EBookshelf.currentlyReading;
            case 'wantToRead':
                return EBookshelf.wantToRead;
            case 'read':
                return EBookshelf.read;
            case 'remove':
            default:
                return EBookshelf.none;
        }
    }

    private handleShelfChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        let value = event.target.value;
        let newShelf = Book.getEBookshelfFromSelectValue(value);
        switch (newShelf) {
            case EBookshelf.currentlyReading:
            case EBookshelf.wantToRead:
            case EBookshelf.read:
                this.props.addToBookList(this.props.bookModel, newShelf);
                break;
            case EBookshelf.none:
                this.props.removeFromBookList(this.props.bookModel);
                break;
            default:
                break;
        }
    }

    private getSelectListOption(bookshelf: EBookshelf): JSX.Element {
        let selectValue = Book.getSelectOptionValue(bookshelf);

        let text = BookLanguage.getPhraseForBookshelf(bookshelf);
        if (this.props.bookModel.shelf === bookshelf) {
            return (
                <option value={selectValue} selected>{'\u2714 ' + text}</option>
            );
        }
        return (
            <option value={selectValue}>{text}</option>
        );
    }
}

export default Book;