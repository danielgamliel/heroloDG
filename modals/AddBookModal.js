import React, { Component } from 'react';
import {
  Modal, Text, TouchableWithoutFeedback, View, StyleSheet,
   Image, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import { SW, SH } from '../config/styles';
import { connect } from "react-redux";
import * as action from "../redux/action";
import { ifFieldsEmpty, fixTitle, ifTitleExsist, dateValidation } from '../validation/index';


class AddBookModal extends Component {
  constructor(props) {
    super(props);
  }
  state = { modalVisible: false, title: '', authors: '', publishedDate: '' };

  setModalVisible(visible) { this.setState({ modalVisible: visible }) }

  validInputs(title, authors, publishedDate) {
    if (!title) {
      alert('Title field can not be empty')
      return;
    }
    if (!authors) {
      alert('Authors field can not be empty')
      return false;
    }
    if (publishedDate.length < 4) {
      alert('Date field can not be empty')
      return false;
    }
    return true;
  }

  _addNewBook() {
    let currentTitle = ''
    let tmpTitle = this.state.title
    let tmpAuthors = this.state.authors
    let tmpDate = this.state.publishedDate
    if (!ifFieldsEmpty(tmpTitle, tmpAuthors, tmpDate)) {
      let fixedTitle = fixTitle(tmpTitle)
      if (ifTitleExsist(fixedTitle, this.props.books, currentTitle)) { return; }
      if (!dateValidation(tmpDate)) { return; }
      let newBook = {
        title: fixedTitle,
        authors: tmpAuthors,
        publishedDate: tmpDate,
      }
      this.props.addBook(newBook);
      this.setModalVisible(false);
      this.setState({
        title: '',
        authors: '',
        publishedDate: ''
      })
    }
  }

  render() {
    return (

      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert('Modal has been closed.'); }}>
          <ScrollView>
            <View style={styles.theModal}>
              <Image style={styles.openBook}
                resizeMode="contain" source={require('../assets/book.jpeg')} />
              <Text>Add new book!</Text>
              <View style={styles.allTheInputs}>

                <TextInput
                  placeholder={"The name of the book.."}
                  style={styles.textInputStyle}
                  onSubmitEditing={() => this._authorsInput.focus()}
                  editable={true}
                  maxLength={40}
                  onChangeText={(title) => this.setState({ title })}
                  value={this.state.title} />

                <TextInput
                  ref={component => this._authorsInput = component}
                  onSubmitEditing={() => this._dateInput.focus()}
                  placeholder={"Authors.."}
                  style={styles.textInputStyle}
                  editable={true}
                  maxLength={30}
                  onChangeText={(text) => this.setState({ authors: text })}
                  value={this.state.authors} />
                  
                <TextInput
                  ref={component => this._dateInput = component}
                  placeholder={"Published Date.."}
                  style={styles.textInputStyle}
                  maxLength={10}
                  editable={true}
                  onChangeText={(text) => this.setState({ publishedDate: text })}
                  value={this.state.publishedDate} />
              </View>
              <View style={styles.viewOfButtons}>
                <TouchableOpacity style={styles.cancel}
                  onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addBookStyle}
                  onPress={() => this._addNewBook()}>
                  <Text>Add book</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>


        <TouchableWithoutFeedback
          onPress={() => { this.setModalVisible(true); }}>
          <Image style={{ flex: 1, height: undefined, width: undefined, padding: 5 }}
            resizeMode="contain" source={require('../assets/add.png')} />
        </TouchableWithoutFeedback>
      </View >

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  theModal: {
    height: SH * 0.7,
    width: SW * 0.8,
    marginTop: SH * 0.1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.5
  },
  textInputStyle: {
    height: 40,
    width: SW * 0.7,
    borderColor: 'gray',
    borderWidth: 1,
    maxWidth: SW * 0.7,
    borderRadius: 10,
    marginBottom: SH * 0.05

  },
  allTheInputs: {
    flex: 3,
    marginTop: SH * 0.01,
    width: SW * 0.8,
    justifyContent: 'flex-end',
    alignItems: 'center',


  },
  cancel: {
    width: SW * 0.3,
    height: SH * 0.05,
    backgroundColor: 'rgba(194, 182, 182, 0.2)',
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 5
  },
  addBookStyle: {
    width: SW * 0.3,
    height: SH * 0.05,
    backgroundColor: 'rgba(117, 51, 20, 0.2)',
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 5
  },
  openBook: {
    flex: 1,
    height: SH * 0.2,
    width: SW * 0.4,
    marginTop: SH * 0.05
  },
  viewOfButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: SW * 0.8
  }
});

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (book) => dispatch(action.addBook(book)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);

