import {buildConstants} from './../constants/';

const initialState = {
  activeAdmin: [],
  adminConnection_id: null,
};

const buildConnection = (state = initialState, action) => {
  switch (action.type) {
    case buildConstants.GET_ALL_ACTIVE_ADMIN_SUCCESS:
      return state = {
        ...state,
        activeAdmin: action.payload,
      };
    case buildConstants.BUILD_CONNECTION_SUCCESS:
      return state = {
        ...state,
        adminConnection_id: action.payload
      }
    case buildConstants.NEW_CONNECTION_SUCCESS:
        return state = {
          ...state,
          adminConnection_id: null
        }
    default:
      return state;
  }
};
export default buildConnection;