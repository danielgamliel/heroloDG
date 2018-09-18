import {types} from 'mobx-state-tree';

const Book = types.model('Book',{
    title: types.string,
    authorse: types.string,
    read :false
})

const BookStore = types.model('Book',{
    books: types.array(book)
})
.create({
    books:[]
})

export default BookStore