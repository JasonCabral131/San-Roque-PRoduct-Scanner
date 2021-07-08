import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './../Screen/DrawerContent';

import io from 'socket.io-client';
import ConnectionScreen from './../components/ConnectionScreen';
import {useDispatch, useSelector} from 'react-redux';

import {getSocketConnection} from './../redux/actions/';

import {urlConfig} from './../helpers/urlConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './../Screen/HomeScreen';
import BuyProductScanScreen from './../Screen/BuyProductScan';
import AddProductScreen from './../Screen/AddProduct';
import {getActiveAdmin} from './../redux/actions/';
import {useFocusEffect} from '@react-navigation/native';
const Drawer = createDrawerNavigator();
const HomeScreenStack = createStackNavigator();
const BuyProductStack = createStackNavigator();
const AddProductStack = createStackNavigator();

const MainHomeScreen = ({navigation}) => {
  return (
    <HomeScreenStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'sans-serif-light',
        },
      }}>
      <HomeScreenStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'SAN ROQUE GROCERY',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={30}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </HomeScreenStack.Navigator>
  );
};

const BuyProductScreen = ({navigation}) => {
  return (
    <BuyProductStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'sans-serif-light',
        },
      }}>
      <BuyProductStack.Screen
        name="BuyProductScreen"
        component={BuyProductScanScreen}
        options={{
          title: 'SCAN PRODUCT BARCODE',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={30}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </BuyProductStack.Navigator>
  );
};

const AddProduct = ({navigation}) => {
  return (
    <AddProductStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'sans-serif-light',
        },
      }}>
      <AddProductStack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{
          title: 'Q-PAYMENT',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={30}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </AddProductStack.Navigator>
  );
};

const Main = props => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const {adminConnection_id} = useSelector(state => state.buildConnection);
  const setupSocket = () => {
    const newsocket = io(
      `https://san-roque-backend2-application.herokuapp.com`,
      {
        secure: true,
        transports: ['websocket'],
      },
    );
    newsocket.on('disconnect', () => {
      setTimeout(setupSocket, 3000);
      console.log('disconnect');
    });
    newsocket.on('connect', () => {
      console.log('connect');
    });
    setSocket(newsocket);
    dispatch(getSocketConnection(newsocket));
  };

  useEffect(() => {
    setupSocket();
    if (socket) {
      socket.emit('getAdmin', {getActiveAdmins: 'getActiveAdmin'}, data => {
        dispatch(getActiveAdmin(data.Admins));
      });
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('getAdmin', {getActiveAdmins: 'getActiveAdmin'}, data => {
        dispatch(getActiveAdmin(data.Admins));
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on('getActiveAdmin', function (data) {
        console.log(data.Admins);
        dispatch(getActiveAdmin(data.Admins));
      });
    }
  }, [socket]);

  //
  return (
    <NavigationContainer options={{title: 'San Roque Grocery'}}>
      {adminConnection_id ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={MainHomeScreen} />
          <Drawer.Screen name="BuyProduct" component={BuyProductScreen} />
          <Drawer.Screen name="addProduct" component={AddProduct} />
        </Drawer.Navigator>
      ) : (
        <ConnectionScreen />
      )}
    </NavigationContainer>
  );
};

export default Main;
