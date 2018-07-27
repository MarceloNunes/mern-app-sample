import { LIST_USERS } from '../actions/users.action';

export default function(state = [], action) {
  switch (action.type) {
    case LIST_USERS:
    console.log(action)
      return [ action.payload.data, ...state ]
    }
   return state;
  }