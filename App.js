import React from 'react';
import { Provider } from "react-redux";
import Main from './Main/main';
import {Store} from './redux/store';



const App = () => {
  
  
    return (
      <Provider store={Store}>
        <Main />
      </Provider>
    )
   
}

export default App;

//"@react-native-community/async-storage": "^1.12.0",