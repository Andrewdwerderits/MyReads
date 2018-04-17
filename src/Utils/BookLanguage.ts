import EBookshelf from '../DataTypes/EBookshelf';

class BookLanguage {

    public static wantToRead(languageOverride?: string): string {
        switch (languageOverride) {
            // Can add other languages or call out to a language service or library
            default:
                return 'Want to Read';
        }
    }

    public static read(languageOverride?: string): string {
        switch (languageOverride) {
            // Can add other languages or call out to a language service or library
            default:
                return 'Read';
        }
    }

    public static currentlyReading(languageOverride?: string): string {
        switch (languageOverride) {
            // Can add other languages or call out to a language service or library
            default:
                return 'Currently Reading';
        }
    }

    public static none(languageOverride?: string): string {
        switch (languageOverride) {
            // Can add other languages or call out to a language service or library
            default:
                return 'None';
        }
    }

    public static getPhraseForBookshelf(bookshelf: EBookshelf): string {
        switch (bookshelf) {
            case EBookshelf.currentlyReading:
                return BookLanguage.currentlyReading();
            case EBookshelf.wantToRead:
                return BookLanguage.wantToRead();
            case EBookshelf.read:
                return BookLanguage.read();
            case EBookshelf.none:
                return BookLanguage.none();
            default:
                return '';
        }
    }
}

export default BookLanguage;