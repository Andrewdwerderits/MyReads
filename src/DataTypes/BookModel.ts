import EBookshelf from './EBookshelf';

class BookModel {
    constructor(
        public bookId: number,
        public bookTitle: string,
        public bookAuthors: string[],
        public bookImageUrl: string,
        public shelf: EBookshelf,
        ) {
    }
}

export default BookModel;