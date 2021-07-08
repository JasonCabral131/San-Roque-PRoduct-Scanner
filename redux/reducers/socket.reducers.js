import {socketConstant} from './../constants/';


const initialState = {
  socket: null,
  loading: false,
};


const socketReducer = (state = initialState, action) => {
  switch (action.type) {
      case socketConstant.CONNECTING_TO_SOCKET:
        return state = {
          ...state,
          loading: false,
        }
      case socketConstant.CONNECTING_SUCCESS:
        return state ={
          ...state,
          socket: action.socket
        }

    default:
    return state;
  }
}

export default socketReducer;