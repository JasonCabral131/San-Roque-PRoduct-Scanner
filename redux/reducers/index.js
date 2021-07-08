import {combineReducers} from 'redux';
import buildConnection from './activeAdmin.reducers';
import socketReducer from './socket.reducers';
export const rootReducer =  combineReducers({
    socket: socketReducer,
    buildConnection: buildConnection
});
