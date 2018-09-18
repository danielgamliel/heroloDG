import * as Methods from '../methods';

export default function BooksReducer(state, action) {
    switch (action.type) {
        case "set_books":
        return Methods.setBooks(state, action)
        case "add_book":
        return Methods.addBook(state, action)
        case "delete_book":
        return Methods.deleteBook(state, action)
        case "edit_book":
        return Methods.editBook(state, action)
        default:
            return state


    }

}