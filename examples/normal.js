webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(235);


/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(160);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRedux = __webpack_require__(161);
	
	var _redux = __webpack_require__(168);
	
	var _srcIndex = __webpack_require__(179);
	
	var Box = _react2['default'].createClass({
	  displayName: 'Box',
	
	  render: function render() {
	    var borderColor = this.props.borderColor;
	
	    return _react2['default'].createElement(
	      'div',
	      { style: {
	          border: '3px solid ' + (borderColor || 'gray'),
	          marginBottom: 6
	        } },
	      'box'
	    );
	  }
	});
	
	var GreenBox = (0, _srcIndex.createBind)({
	  id: 'box.green',
	  fields: ['borderColor']
	})(Box);
	
	var RedBox = (0, _srcIndex.createBind)({
	  id: 'box.red',
	  fields: ['borderColor']
	})(Box);
	
	var App = (0, _reactRedux.connect)()(_react2['default'].createClass({
	  addColor: function addColor(id, borderColor) {
	    this.props.dispatch({
	      type: 'redux-bind',
	      id: id,
	      payload: { borderColor: borderColor }
	    });
	  },
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      { style: { padding: 20 } },
	      _react2['default'].createElement(GreenBox, null),
	      _react2['default'].createElement(RedBox, null),
	      'green box : ',
	      _react2['default'].createElement(
	        'button',
	        { onClick: this.addColor.bind(this, 'box.green', 'green') },
	        'add color'
	      ),
	      _react2['default'].createElement('br', null),
	      'red box : ',
	      _react2['default'].createElement(
	        'button',
	        { onClick: this.addColor.bind(this, 'box.red', 'red') },
	        'add color'
	      ),
	      _react2['default'].createElement(
	        'button',
	        { onClick: this.addColor.bind(this, 'box.red', function (color) {
	            return color === 'blue' ? 'yellow' : 'blue';
	          }) },
	        'toggle color between yellow and blue'
	      )
	    );
	  }
	}));
	
	var store = (0, _redux.applyMiddleware)(_srcIndex.middleware)(_redux.createStore)((0, _redux.combineReducers)({
	  'redux-bind': _srcIndex.reducer
	}));
	
	_reactDom2['default'].render(_react2['default'].createElement(
	  _reactRedux.Provider,
	  { store: store },
	  _react2['default'].createElement(App, null)
	), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=normal.js.map