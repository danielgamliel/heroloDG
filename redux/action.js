

export function setBooks(books) {
    return {
        type: 'set_books',
        payload: {
            books
        }
    }
}

export function addBook(book,books) {
    return {
        type: 'add_book',
        payload: {
            book: book,
        }
    }
}

export function editBook(book) {

    return {
        type:'edit_book',
        payload: {
            book: book,
        }
    }
}

export function deleteBook(index) {
    return {
        type: 'delete_book',
        payload: {
            index: index
        }
    }
}