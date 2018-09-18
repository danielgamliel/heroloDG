
import React, { Component } from 'react';
import {FlatList, StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import Row from '../components/Row';
import { SW, SH } from '../config/styles';
import AddBookModal from '../modals/AddBookModal';
import { connect } from "react-redux";
import * as action from "../redux/action";
import { MKSpinner } from 'react-native-material-kit';

// console.disableYellowBox = true;


class MainApp extends Component {
    
      async componentDidMount() {
           
        let counter = -1;
        let tempArray = [];
        await fetch('https://www.googleapis.com/books/v1/volumes?q=*')
            .then(response => response.json())
            .then(data => {
                data.items.forEach(element => {
                    counter++;
                    let obj = {
                        id: counter,
                        title: element.volumeInfo.title,
                        authors: element.volumeInfo.authors,
                        publishedDate: element.volumeInfo.publishedDate
                    }
                    tempArray.push(obj)
                });
                this.props.setBooks(tempArray)
            })
    }


    renderItem = ({ item, index }) => {
        return (
            <Row
                item={item}
                index={index}
                title={item.title}
                authors={item.authors}
                publishedDate={item.publishedDate}
            />
        )
    }


    render() {
        return (
            <View style={styles.container}>
                {!this.props.books.length<1 ?
                    <View style={styles.container}>
                        <View style={styles.titleView}>
                            <Text style={styles.titleStyle}>Welcome to the library!</Text>
                        </View>
                        <FlatList
                            data={this.props.books}
                            renderItem={this.renderItem}
                            keyExtractor={(item) => item.toString()} />
                        <View style={styles.addNewBookView}>
                            <Text style={styles.addNewStyle} > Add new book </Text>
                            <View style={ styles.addBookBt}>
                                <TouchableWithoutFeedback >
                                    <AddBookModal />
                                </TouchableWithoutFeedback>

                            </View>
                        </View>
                    </View>
                    :  <View style={styles.loadingStyle}>
                        <Text style={styles.textLoader}>Loading books..</Text>
                         <MKSpinner style={styles.spinnerStyle} />
                         </View> }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.2)',

    },
    titleView: {
        borderBottomWidth: 0.5,
        backgroundColor: 'white',
        borderBottomColor: 'gray'
    },
    titleStyle: {
        marginTop: SH * 0.02,
        fontSize: 40,
        alignSelf: 'center',
        paddingBottom: 3,
        fontFamily: "MarketSaturday",

    },
    addNewStyle: {
        fontSize: 30,
        alignSelf: 'flex-end',
        paddingBottom: 3,
        fontFamily: "MarketSaturday",
    },
    addNewBookView: {
        height: SH * 0.07,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: SW * 0.2,
        backgroundColor: 'white'
    },
    loadingStyle: {
        flex: 1,
        height: SH,
        width: SW,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinnerStyle: {
        height: SH * 0.2,
        width: SW * 0.4
    },
    textLoader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
        fontFamily: "MarketSaturday",
        marginBottom: SH * 0.01
    },
    addBookBt:{
        height: SH * 0.05,
         width: SW * 0.1
    }

});


const mapStateToProps = (state) => {
    return {
         books: state.books
        }
    }

const mapDispatchToProps = (dispatch) => {
    return {setBooks: (books) => dispatch(action.setBooks(books)),};};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);