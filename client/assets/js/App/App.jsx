import React, { Component } from 'react';
import { connect } from 'react-redux';

import PDFJS from 'pdfjs-dist';
import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

import fromPDF from 'Utility/fromPDF';
import Form from 'Form/Form.jsx';

const uuid = require('uuid/v4');


class App extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    PDFJS.getDocument('//localhost:3000/pdf/SC-100')
      .then((pdf) => {
        fromPDF(pdf);
      })
      .catch((error) => {
        console.error('ERROR: PDFJS.getDocument() -', error);
      });
  }

  render () {
    return (
      <div className='main-app'>
        {this.props.forms.length <= 0 ? '' : <Form pageIndex={1} key={uuid()} />}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    forms: state.forms
  };
};


export default connect(mapStateToProps)(App);
