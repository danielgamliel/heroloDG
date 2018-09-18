import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableWithoutFeedback, Alert, ImageBackground } from 'react-native';
import { MKButton, MKColor, MKIconToggle, getTheme } from 'react-native-material-kit';
import { SH, SW } from '../config/styles';
import EditModal from '../modals/EditModal';
import * as action from "../redux/action";
import { connect } from "react-redux";
import ExpandRow from './ExpandRow';


const theme = getTheme();
class Row extends Component {
    constructor(props) {
        super(props);
        this.state = { itemPressed: false, fixedTitle: '' }
    }

    

    componentDidMount() {
        let tmptitle =this.props.books[this.props.index].title.trim()
        tmptitle = tmptitle.replace('/', '')
        tmptitle = tmptitle.replace('-', '')
        this.setState({ fixedTitle: tmptitle })
    }

    onItemPressed(index) {
         this.setState({ itemPressed: !this.state.itemPressed }) 
        }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.onItemPressed(this.props.index)}>
                <View style={theme.cardStyle}>
                    <Image source={require('../assets/closedBook.jpg')} style={styles.imageStyle} />
                    {this.props.title.length > 27 ? <Text style={styles.cardSmallTitleStyle}>
                    {this.props.books[this.props.index].title}</Text> :
                        <Text style={styles.cardTitleStyle}>{this.props.books[this.props.index].title}</Text>}
                    <Text style={theme.cardContentStyle}>
                        Description: here will be the discription of the book , just for
                        filling area for better design, i will use text like lorem ipsum to reach
                        3 rows...
                    </Text>
                    <View style={theme.cardMenuStyle}></View>
                    <Text style={theme.cardActionStyle}>Details..</Text>
                    {this.state.itemPressed ? <ExpandRow
                        index={this.props.index}
                        title={this.props.books[this.props.index].title}
                        authors={this.props.authors}
                        publishedDate={this.props.publishedDate} /> :
                        <View></View>}
                </View>
            </TouchableWithoutFeedback >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
    },
    cardSmallTitleStyle: {
        fontFamily: "MarketSaturday",
        fontSize: 15,
        height: SH * 0.25,
        width: SW * 0.32,
        marginTop: SH * 0.05,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        position: 'absolute',
        textAlign: 'center',
        right: SW * 0.33
    },
    cardTitleStyle: {
        fontFamily: "MarketSaturday",
        fontSize: 18,
        height: SH * 0.25,
        width: SW * 0.32,
        marginTop: SH * 0.05,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        position: 'absolute',
        textAlign: 'center',
        right: SW * 0.33
    },
    imageStyle: {
        resizeMode: 'contain',
        width: null,
        height: SH * 0.3,
        margin: 10,
    }

});


const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}
const mapDispatchToProps = (dispatch) => {

    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);