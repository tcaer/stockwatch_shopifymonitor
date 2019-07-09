import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { 
  FETCH_USER,
  RECEIVE_USER,
  LOGOUT_USER,
  SET_JWT
} from './actions';

function user(state = {
  isFetching: false,
  jwt: null,
  info: null
}, action) {
  switch (action.type) {
    case FETCH_USER:
      return Object.assign({}, state, {
        isFetching: true 
      });
    case RECEIVE_USER:
      return Object.assign({}, state, {
        info: action.user,
        isFetching: false
      });
    case LOGOUT_USER:
      return {
        isFetching: false,
        jwt: null,
        info: null
      };
    case SET_JWT:
      return Object.assign({}, state, {
        jwt: action.jwt
      });
    default:
      return state;
  }
}

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  user
});

export default rootReducer;