import moment from 'moment';
import { Alert } from 'react-native';


export function ifFieldsEmpty(title, authors, date) {
    let empty: flase
    if (title.length ==0 || authors.length ==0 || date.length ==0) {
        empty = true
        Alert.alert(
            'Fields can not be empty',
            'Please fill all the fields',
            [{ text: 'OK' }],
            { cancelable: true }
        )
    }
    return empty
}

export function fixTitle(title) {
    let newTitle = title.trim()
    newTitle = newTitle.replace(/[^0-9a-zA-Z ]/gi, '')

    let arr = newTitle.split(" ")
    arr = arr.map((word) => {
        word = word.toLowerCase()
        word = word.charAt(0).toUpperCase() + word.slice(1)
        return word
    })
    return arr.join(" ")

}


export function dateValidation (date){
    let valid = moment(date, 'YYYY-MM-DD',true).isValid()
    if( !moment(date, 'YYYY-MM-DD',true).isValid())
    {
        Alert.alert(
            'Date is not valid',
            'Please change the date to this format : YYYY-MM-DD',
            [{ text: 'OK' }],
            { cancelable: true }
        )
    }
    
    return valid 
}

export function ifTitleExsist (title, bookList, currentTitle){
    if(title===currentTitle){
        return false
    }
    let result = bookList.filter((book)=>(book.title)===title)
    if(result.length!==0){
        Alert.alert(
            'Name already exsist',
            'Please change the name of the book',
            [{ text: 'OK' }],
            { cancelable: true }
        )
    }
    return (result.length!==0)
}
