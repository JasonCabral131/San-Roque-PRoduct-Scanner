import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RNCamera} from 'react-native-camera';
import RNSystemSounds from '@dashdoc/react-native-system-sounds';
import {useDispatch, useSelector} from 'react-redux';
const buyProductScan = props => {
  const {adminConnection_id} = useSelector(state => state.buildConnection);
  const {socket} = useSelector(state => state.socket);
  const dispatch = useDispatch();
  const [reactivate, setReactivate] = useState(true);
  const ifScanneed = e => {
    let val = e;
    console.log(val);
    RNSystemSounds.beep();
    if (val.data) {
      socket.emit(
        'purchase',
        {toAdmin: adminConnection_id, productId: val.data},
        () => {},
      );
    }
  };

  return (
    <View style={{height: '100%'}}>
      <View style={{height: '100%', margin: 0, padding: 0}}>
        <QRCodeScanner
          containerStyle={{
            backgroundColor: '#009387',
            height: '100%',
          }}
          onRead={ifScanneed}
          permissionDialogMessage="Need Permission To Access Camera"
          flashMode={RNCamera.Constants.FlashMode.on}
          reactivate={true}
          reactivateTimeout={1500}
          showMarker={true}
          fadeIn={true}
          cameraStyle={{
            width: '100%',
            height: '100%',
          }}
          markerStyle={{borderColor: '#fff', borderRadius: 10}}
          topContent={
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 21,
                  color: 'white',
                  marginBottom: 65,
                }}>
                <AntDesign name="qrcode" color={'black'} size={30} /> Scan
                Product
              </Text>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
};

export default buyProductScan;
const styles = StyleSheet.create({});
