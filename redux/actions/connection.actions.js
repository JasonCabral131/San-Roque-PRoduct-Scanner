import {buildConstants} from './../constants/';

export const getActiveAdmin = (Admin) => {
    return async(dispatch) => {
        try{
                console.log("active Admin", Admin);
                dispatch({type: buildConstants.GET_ALL_ACTIVE_ADMIN_SUCCESS, payload: Admin})
        }catch(e){

        }
    }
}
  
export const setbuildConnectionAdmin = (adminId) => {
    return async(dispatch) => {
        try{
                dispatch({type: buildConstants.BUILD_CONNECTION_SUCCESS, payload: adminId})
        }catch(e){

        }
    }
}
export const newBuildConnection = () => {
    return async(dispatch) => {
        try{
            dispatch({type: buildConstants.NEW_CONNECTION_SUCCESS})
        }catch(e){

        }
    }
}
