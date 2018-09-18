import {createStore} from "redux";
import BookReducer from './reducers/BooksReducer'

const initialState = { books : []}

const Store = createStore( BookReducer, initialState);
export default Store;

