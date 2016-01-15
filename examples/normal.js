import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createBind, reducer, middleware } from '../src/index';

const Box = React.createClass({
  render() {
    const { borderColor } = this.props;
    return <div style={{
        border:`3px solid ${borderColor || 'gray'}`,
        marginBottom:6,
      }}>box</div>;
  },
});

const GreenBox = createBind({
  id: 'box.green',
  fields: ['borderColor'],
})(Box);

const RedBox = createBind({
  id: 'box.red',
  fields: ['borderColor'],
})(Box);

const App = connect()(React.createClass({
  addColor(id, borderColor) {
    this.props.dispatch({
      type: 'redux-bind',
      id,
      payload: { borderColor },
    });
  },
  render() {
    return (<div style={{padding:20}}>
      <GreenBox />
      <RedBox />
      green box : <button onClick={this.addColor.bind(this, 'box.green', 'green')}>add color</button>
      <br />
      red box : <button onClick={this.addColor.bind(this, 'box.red', 'red')}>add color</button>
      <button onClick={this.addColor.bind(this, 'box.red', color => color === 'blue' ? 'yellow' : 'blue' )}>toggle color between yellow and blue</button>
    </div>);
  },
}));

const store = applyMiddleware(middleware)(createStore)(combineReducers({
  'redux-bind': reducer,
}));

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('__react-content'));
