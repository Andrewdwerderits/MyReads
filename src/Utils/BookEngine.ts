import BookModel from '../DataTypes/BookModel';
import * as BooksAPI from './BooksAPI';
import EBookshelf from '../DataTypes/EBookshelf';

class BookEntity {
    /* tslint:disable */
    static toBookModel(book: any): BookModel {
        /* tslint:enable */

        let bookImageUrl = book.imageLinks == null ?
            null :
            book.imageLinks.thumbnail;

        let bookShelf = book.shelf == null  || book.shelf === '' ?
            EBookshelf.none :
            EBookshelf[<string> (book.shelf)];

        return new BookModel(
            book.id,
            book.title,
            book.authors,
            bookImageUrl,
            bookShelf,
        );
    }

    /* tslint:disable */
    static fromBookModel(book: BookModel):any {
        /* tslint: enable */
        return {
            id: book.bookId,
            title: book.bookTitle,
            authors: book.bookAuthors,
            imageLinks: {
                thumbnail: book.bookImageUrl,
            },
            shelf: EBookshelf[book.shelf]
        };
    }
}

class BookEngine {

    public static get(bookId: string): Promise<BookModel> {

        return BooksAPI.get(bookId)
        /* tslint:disable */
            .then((book: any) => {
                /* tslint:enable */
                const bookModel = BookEntity.toBookModel(book);
                return Promise.resolve(bookModel);
            }).catch(() => {
                return Promise.reject('get failed');
            });
    }

    public static getAll(): Promise<BookModel[]> {

        return BooksAPI.getAll()
        /* tslint:disable */
            .then((books: any[]) => {
                const bookModels = books.map((book: any) => {
                    /* tslint:enable */

                    return BookEntity.toBookModel(book);
                });
                return Promise.resolve(bookModels);
            }).catch(() => {
                return Promise.reject('getAll failed');
            });
    }

    public static update(book: BookModel, shelf: EBookshelf): Promise<BookModel> {
        const bookEntity = BookEntity.fromBookModel(book);

        return BooksAPI.update(bookEntity, EBookshelf[shelf])
            .then(() => {
                return BooksAPI.get(book.bookId);
            /* tslint:disable */
            }).then((updatedBook: any) => {
            /* tsLint:enable */
                const bookModel = BookEntity.toBookModel(updatedBook);
                return Promise.resolve(bookModel);
            })
            .catch(() => {
                return Promise.reject('update failed');
            });
    }

    public static changeShelf(book: BookModel, shelf: EBookshelf): Promise<BookModel> {
        return BookEngine.update(book, shelf);
    }

    public static search(query: string): Promise<BookModel[]> {
        return BooksAPI.search(query)
        /* tslint:disable */
            .then((books: any[]) => {
                const bookModels = books.map((book: any) => {
                    /* tslint:enable */

                    return BookEntity.toBookModel(book);
                });
                return Promise.resolve(bookModels);
            }).catch(() => {
                return Promise.reject('search failed');
            });
    }
}

export default BookEngine;