import React from 'react';
import {
    StyleSheet, Image, View, Text, LayoutAnimation,ImageBackground,
    Animated, TouchableOpacity, TouchableWithoutFeedback, Alert, 
} from 'react-native';
import EditModal from '../modals/EditModal';
import { connect } from "react-redux";
import * as action from "../redux/action";
import { SH, SW } from '../config/styles';

class ExpandRow extends React.Component {

    _onDeletePressed(index) {
        Alert.alert(
            'Are you sure?',
            'This will permanently delete the item',
            [{ text: 'Cancel' }, { text: 'OK', onPress: () => { this.props.deleteBook(index) } },],
            { cancelable: true }
        )
    }

    componentWillUpdate() {LayoutAnimation.spring();}

    render() {
        return (
            <Animated.View style={styles.container}>
                <ImageBackground source={require('../assets/openBook.jpg')}
                    style={styles.bacgroundImageStyle}>
                     <View style={styles.pageBookStyle}>
                        <Text>Title :</Text>
                        <Text>Authors :</Text>
                        <Text style={{ fontSize: 12 }}>Published date :</Text>
                        <TouchableWithoutFeedback onPress={() => this._onDeletePressed(this.props.index)}>
                            <Image style={styles.deleteBt}
                                source={require('../assets/delete.png')} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.pageBookStyle}>
                        <Text style={styles.centerText}>{this.props.title}</Text>
                        {this.props.authors ?
                            Array.isArray(this.props.authors) ?
                                this.props.authors.length > 1 ? <Text style={styles.centerText}>
                                    {`${this.props.authors[0]}\n${this.props.authors[1]}`}</Text>
                                    : <Text style={styles.centerText}>{this.props.authors[0]}</Text>
                                : <Text style={styles.centerText}>{this.props.authors}</Text>
                            : <Text></Text>}
                        <Text style={{ fontSize: 12 }}>{this.props.publishedDate}</Text>
                        <TouchableWithoutFeedback >
                            <View style={styles.viewOfEditModal}>
                                <EditModal
                                    index={this.props.index}
                                    updateBook={this.props.updateBook}
                                    title={this.props.title}
                                    authors={JSON.stringify(this.props.authors)}
                                    publishedDate={this.props.publishedDate} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                   
                </ImageBackground>
            </Animated.View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: SH * 0.25,
        flexDirection: 'column',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 0.5,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
    },
    titleStyle: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 15

    },
    authorsStyle: {
        alignSelf: 'center',
        fontSize: 20

    },
    publishedDateStyle: {
        alignSelf: 'center',
        fontSize: 40,
        fontFamily: "MarketSaturday"
    },
    bacgroundImageStyle: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        width: SW * 0.8,
        height: undefined,

    },
    buttonsStyle: {
        flex: 1,
        height: SH * 0.1,
        flexDirection: 'row',
        marginBottom: SH * 0.05
    },
    pageBookStyle: {
        flex: 1,
        padding: SH * 0.02,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    centerText: {
        textAlign: 'center'
    },
    viewOfEditModal: {
        height: SH * 0.05,
        width: SW * 0.05
    },
    deleteBt: {
        height: SH * 0.05,
        width: SW * 0.05,
        resizeMode: "contain"
    }
});

const mapStateToProps = (state) => {
    return {
        books:state.books
    }
}

const mapDispatchToProps = (dispatch) => {
    return {deleteBook: (index) => dispatch(action.deleteBook(index)),};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpandRow);
