
export default function getAttribute(state, id, property) {
  if (state && state[id]) return state[id][property];
}
