export const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, isAuthenticated: true, user: action.user };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.user.token);
      return {
        ...state,
        user: action.user,
        isAuthenticated: true
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'LOGOUT_SUCCESS':
    case 'REGISTER_FAIL':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
//
export default reducer;
