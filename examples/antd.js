import 'antd/lib/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createBind, reducer, middleware } from '../index';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';

// app.js

const FileUploadModal = createBind({
  id: 'modal.fileUpload',
  fields: ['visible'],
})(Modal);

const App = connect()(React.createClass({
  toggleModal() {
    this.props.dispatch({
      type: 'redux-bind',
      id: 'modal.fileUpload',
      payload: { visible: (v) => !v },
    });
  },
  render() {
    return (<div style={{padding:20}}>
      <Button type="primary" onClick={this.toggleModal}>Upload File</Button>
      <FileUploadModal title="File Upload" onOk={this.toggleModal} onCancel={this.toggleModal}>
        1111
      </FileUploadModal>
    </div>);
  },
}));

// entry.js

const store = applyMiddleware(middleware)(createStore)(combineReducers({
  'redux-bind': reducer,
}));

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('__react-content'));
