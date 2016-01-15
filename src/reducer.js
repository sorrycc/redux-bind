
export default function(state = {}, action) {
  const { type, id, payload } = action;
  switch (type) {
    case 'redux-bind':
      const newProps = {...(state[id] || {}), ...payload};
      return {...state, [id]: newProps};
    default:
      return state;
  }
}
