const initialState = {
  username: '',
  password: '',
};
export function userData(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    default:
      return state;
  }
}
