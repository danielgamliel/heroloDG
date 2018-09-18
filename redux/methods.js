import * as lodash from "lodash";

export function setBooks(state, action){
    let arr = action.payload.books
    return {
        ...state,
        books: arr,
    };
}

export function editBook(state, action){
    let arr = lodash.concat(state.books,[])
    let book = action.payload.book
    const index = action.payload.book.id
    if(index===-1){return {...state}}
    arr[index] = {...book}
    return {
        ...state,
        books: arr,
        editBookMode: null
    };
}

export function addBook(state, action){
    let arr = lodash.concat(state.books,[])
    let book = action.payload.book
    let id = state.bookId
    book.id = id
    arr.push(book)
    return {
        ...state,
        books: arr,
        bookId: ++id,
        editBookMode: null
    };
}

    export function deleteBook(state, action) {
        let index =action.payload.index
        if(index===-1){return state}
        let arr = lodash.concat(state.books,[])
        arr.splice(0,1)
        return {
            ...state,
            books: arr,
        };
}


