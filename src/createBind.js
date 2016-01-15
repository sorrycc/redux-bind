import React, { Component } from 'react';
import { connect } from 'react-redux';
import deepEqual from 'deep-equal';
import getAttribute from './utils/getAttribute';

const cache = {};
let guid = 1;

export default function createBind(config = {}) {
  const { fields } = config;
  if (!fields || !fields.length) {
    throw new Error('fields not found');
  }

  // id must be unique
  const id = config.id || guid++;

  return Component => {
    function mapStateToProps(state) {
      return {
        'redux-bind': state['redux-bind'],
      };
    }
    const WrappedComponent = connect(mapStateToProps)(React.createClass({
      displayName: `ReduxBind(${id})`,
      componentWillMount() {
        if (cache[id]) {
          throw new Error('id exists');
        }
        cache[id] = true;
      },
      shouldComponentUpdate(nextProps) {
        function filterProps(props) {
          return {
            ...props,
            'redux-bind': {
              [id]: props['redux-bind'][id],
            },
          }
        }
        return !deepEqual(filterProps(nextProps), filterProps(this.props));
      },
      componentWillUnmount() {
        delete cache[id];
      },
      render() {
        const fieldProps = fields.reduce((memo, field) => {
          memo[field] = getAttribute(this.props['redux-bind'], id, field);
          return memo;
        }, {});
        return <Component {...fieldProps} {...this.props}>
          {this.props.children}
        </Component>;
      },
    }));
    WrappedComponent.id = id;
    return WrappedComponent;
  };
}
