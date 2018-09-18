import React, { Component } from 'react';
import {
  Modal, Text, TouchableWithoutFeedback, View, StyleSheet, Image, TextInput,
  ScrollView, TouchableOpacity
} from 'react-native';
import { SW, SH } from '../config/styles';
import { connect } from "react-redux";
import * as action from "../redux/action";
import { ifFieldsEmpty, fixTitle, ifTitleExsist, dateValidation } from '../validation/index';



class EditModal extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalVisible: false,
    title: this.props.books[this.props.index].title,
    authors: '',
    publishedDate: this.props.books[this.props.index].publishedDate, newBook: ''
  };

   fixAuthors(){
    let tmpFixAuthors = JSON.stringify(this.props.books[this.props.index].authors)
     if(tmpFixAuthors){
      let find = '"';
      var re = new RegExp(find, 'g');
      tmpFixAuthors = tmpFixAuthors.replace('[', '')
      tmpFixAuthors = tmpFixAuthors.replace(']', '')
      tmpFixAuthors = tmpFixAuthors.replace(re, '')
      this.setState({ authors: tmpFixAuthors })

     }
   
  }

  componentDidMount() {this.fixAuthors()}

  setModalVisible(visible) { this.setState({ modalVisible: visible }); }

  saveEdit(index) {
    let currentTitle = this.props.books[this.props.index].title
    let tmpTitle = this.state.title
    let tmpAuthors = this.state.authors
    let tmpDate = this.state.publishedDate
    if (!ifFieldsEmpty(tmpTitle, tmpAuthors, tmpDate)) {
      let fixedTitle = fixTitle(tmpTitle)
      if (ifTitleExsist(fixedTitle, this.props.books, currentTitle)) { return; }
      if (!dateValidation(tmpDate)) { return; }
      editedBook = {
        id: index,
        title: fixedTitle,
        authors: tmpAuthors,
        publishedDate: tmpDate,
      }
      this.props.editBook(editedBook)
      this.setModalVisible(false);
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
              <Image style={styles.imageOfBook}
                resizeMode="contain" source={require('../assets/book.jpeg')} />
              <Text>Edit the book!</Text>
              <View style={styles.allTheInputs}>

                <TextInput
                  placeholder={this.props.title}
                  style={styles.textInputStyle}
                  onSubmitEditing={() => this._authorsInput.focus()}
                  editable={true}
                  maxLength={40}
                  onChangeText={(title) => this.setState({ title })}
                  value={this.state.title} />

                <TextInput
                  ref={component => this._authorsInput = component}
                  onSubmitEditing={() => this._dateInput.focus()}
                  placeholder={this.props.authors}
                  style={styles.textInputStyle}
                  editable={true}
                  maxLength={30}
                  onChangeText={(text) => this.setState({ authors: text })}
                  value={this.state.authors} />

                <TextInput
                  ref={component => this._dateInput = component}
                  placeholder={this.props.publishedDate}
                  style={styles.textInputStyle}
                  maxLength={10}
                  editable={true}
                  onChangeText={(text) => this.setState({ publishedDate: text })}
                  value={this.state.publishedDate} />
              </View>
              <View style={styles.viewOfButtons}>
                <TouchableOpacity style={styles.cancel}
                  onPress={() => { this.setModalVisible(false); }}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.save}
                  onPress={() => this.saveEdit(this.props.index)}>
                  <Text>save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>

        <TouchableWithoutFeedback
          onPress={() => { this.setModalVisible(true); }}>
          <Image style={styles.imageOfEdit}
            resizeMode="contain" source={require('../assets/edit.png')} />
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
  save: {
    backgroundColor: 'rgba(87, 119, 207, 0.2)',
    width: SW * 0.3,
    height: SH * 0.05,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 5
  },
  imageOfBook: {
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
  },
  imageOfEdit: {
    flex: 1,
    height: undefined,
    width: undefined,
  }


});

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editBook: (book) => dispatch(action.editBook(book))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);