import {socketConstant} from './../constants/'

export const getSocketConnection = (socket) => {
    return async(dispatch) => {
        try{
          dispatch({type:socketConstant.CONNECTING_TO_SOCKET});
          dispatch({type: socketConstant.CONNECTING_SUCCESS, socket})
        }catch(e){
  
        }
    }
  }