import React,{useEffect} from 'react';

import {Alert, Text, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {setbuildConnectionAdmin, getActiveAdmin} from './../redux/actions/';

const Connection = props => {
  const dispatch = useDispatch();
  const {activeAdmin} = useSelector(state => state.buildConnection);
  const {socket} = useSelector(state => state.socket);
  const BuildConnection = (connectId) => {
    dispatch(setbuildConnectionAdmin(connectId))
  };

 
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          zIndex: 2,
          top: 20,
          marginBottom: 5,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Icon name="transit-connection" color={'black'} size={40} />
        <Text style={{color: 'black', fontWeight: 'bold', padding: 3}}>
          Build Connection
        </Text>
        <Icon name="transit-connection-variant" color={'black'} size={40} />
      </View>
      {activeAdmin && activeAdmin.length > 0 ? (
        activeAdmin.map((admin, key) => (
          <View style={styles.AdminContainer} key={key}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                {admin.name}
              </Text>
            </View>

            <Button
              icon="hand"
              mode="contained"
              onPress={() => BuildConnection(admin.adminId)}>
              Connect
            </Button>
          </View>
        ))
      ) : (
        <View style={styles.AdminContainer}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Text style={{color: 'red', fontWeight: 'bold'}}>
             No Active Admin Found
            </Text>
          </View>

        </View>
      )}
    </View>
  );
};

export default Connection;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  AdminContainer: {
    display: 'flex',
    margin: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});
