import mapValues from './utils/mapValues';
import getAttribute from './utils/getAttribute';

function normalizeAction(action, getState) {
  const { id, payload } = action;
  return {
    ...action,
    payload: mapValues(payload, (item, key) => {
      if (typeof item === 'function') {
        return item(getAttribute(getState()['redux-bind'], id, key));
      } else {
        return item;
      }
    }),
  };
}

function bindMiddleware({ getState }) {
  return next => action => {
    let actionModified;
    if (action && action.type === 'redux-bind') {
      actionModified = normalizeAction(action, getState);
    }
    next(actionModified || action);
  }
}

export default bindMiddleware;
