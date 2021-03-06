import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Image,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsMaterial from 'react-native-vector-icons/MaterialIcons';
import RNSystemSounds from '@dashdoc/react-native-system-sounds';
import {useDispatch, useSelector} from 'react-redux';
import {
  verifyQrCodePayment,
  verifyQrCodePaymentPassword,
} from './../redux/actions/';
import {urlConfig, generatePublicUrl} from './../helpers/urlConfig';
import {
  ActivityIndicator,
  Colors,
  TextInput,
  Headline,
  Caption,
  Title,
  Button,
  Paragraph,
  Avatar,
  Card,
} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import randomNumber from 'random-number';
import DirectSms from 'react-native-direct-sms';
const AddProduct = props => {
  const dispatch = useDispatch();
  const {adminConnection_id} = useSelector(state => state.buildConnection);
  const {socket} = useSelector(state => state.socket);
  const [cameraView, setCameraView] = useState(true);
  const [isSuccess, setSuccess] = useState(null);
  const [isSendingSms, setIsSendingSms] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [password, setPassword] = useState('');
  const [verifySms, setVerifySms] = useState('');
  const NewSetup = () => {
    setIsloading(false);
    setSuccess(null);
    setPassword('');
    setIsSendingSms(null);
    setVerifySms('');
  };
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        NewSetup();
      };
    }, []),
  );
  const ifScanneed = e => {
    setIsloading(true);
    let val = e.data;
    RNSystemSounds.beep();
    dispatch(verifyQrCodePayment(val))
      .then(e => {
        if (e.result) {
          Alert.alert(
            'REGISTERED',
            `Welcome ${e.data.firstname} ${e.data.lastname}`,
          );
          setSuccess({
            _id: e.data._id,
            name: `${e.data.firstname} ${e.data.lastname}`,
            phone: e.data.phone,
            email: e.data.email,
            address: e.data.address,
            profile: e.data.profile,
          });
          setIsloading(false);
        } else {
          Alert.alert(
            'NOT REGISTERED',
            'QR CODE INFORMATION IS NOT REGISTERED',
          );
          setIsloading(false);
        }
        setIsloading(false);
      })
      .catch(e => {
        Alert.alert('NOT REGISTERED', 'QR CODE INFORMATION IS NOT REGISTERED');
        setIsloading(false);
      });
    console.log('MyCustmerId', val);
  };
  const verifyPassword = () => {
    if (isSuccess) {
      dispatch(
        verifyQrCodePaymentPassword({_id: isSuccess._id, password: password}),
      )
        .then(e => {
          if (e.result) {
            Alert.alert('Verified', `Successfully Veried`);
            var gen = randomNumber.generator({
              min: -1000,
              max: 10000,
              integer: true,
            });
            console.log('random Number', gen(1000));
            const verificationNumber = gen(1000);
            setIsSendingSms(verificationNumber);
            sendDirectSms(isSuccess.phone, verificationNumber);
          } else {
            Alert.alert('Password Incorrect', 'Password Does not Match');
          }
        })
        .catch(e => {
          Alert.alert('Error', 'SOMETHING WENT WRONG');
        });
    }
  };
  const sendDirectSms = async (phone, generatedNumber) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'App Sms Permission',
          message:
            'App needs access to your inbox         ' +
            'so you can send messages in background.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const MessageInfo = `Your Verification Number: ${generatedNumber}`;
        DirectSms.sendDirectSms(phone, MessageInfo);
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const VerifyIsValidSms = () => {
    console.log(isSendingSms, verifySms);
    if (verifySms == isSendingSms) {
      Alert.alert('Verified', `Successfully Veried`);
      socket.emit(
        'VerificationSuccess',
        {
          toAdmin: adminConnection_id,
          CustomerId: isSuccess._id,
          vericationId: isSendingSms,
        },
        () => {},
      );
      NewSetup();
    } else {
      Alert.alert('Invalid', 'Verification Number Does not match');
    }
  };
  const showAddress = address => {
    const Information = JSON.parse(address);
    const addressInfo =
      Information.houseNum + ' ' + Information.street + ' ' + Information.brgy;
    return addressInfo;
  };
  return (
    <View style={{height: '100%', margin: 0, padding: 0}}>
      {isSuccess ? (
        <View style={styles.container}>
          <Card style={{margin: 5, backgroundColor: '#e8c15f'}}>
            <Card.Content>
              <View style={styles.header}>
                <View style={welcomeStyleScreen.welcomeContainer}>
                  <View style={welcomeStyleScreen.containerInformation}>
                    <View style={welcomeStyleScreen.containerInformationImage}>
                      <Avatar.Image
                        source={{
                          uri: isSuccess
                            ? isSuccess.profile
                              ? generatePublicUrl(isSuccess.profile, urlConfig)
                              : 'https://cdn3.vectorstock.com/i/1000x1000/98/22/logo-for-grocery-store-vector-21609822.jpg'
                            : 'https://cdn3.vectorstock.com/i/1000x1000/98/22/logo-for-grocery-store-vector-21609822.jpg',
                        }}
                        size={100}
                      />
                    </View>
                    <View
                      style={welcomeStyleScreen.containerInformationCustomer}>
                      <Headline
                        style={{
                          marginTop: 10,
                          display: 'flex',
                          justifyContent: 'center',
                          textAlign: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}>
                        Welcome{' '}
                      </Headline>
                      <Title style={{marginTop: 5, marginLeft: 5}}>
                        {isSuccess ? isSuccess.name : ''}
                      </Title>
                      <Paragraph style={{marginTop: 5, marginLeft: 5}}>
                        {isSuccess ? isSuccess.email : ''}
                      </Paragraph>
                    </View>
                  </View>
                  <View
                    style={welcomeStyleScreen.containerInformationPhoneAddress}>
                    <Title style={{marginTop: 5, marginLeft: 5}}>
                      Phone # : {isSuccess ? isSuccess.phone : ''}
                    </Title>
                    <Paragraph style={{marginTop: 5, marginLeft: 5}}>
                      address :{' '}
                      {isSuccess ? showAddress(isSuccess.address) : ''}
                    </Paragraph>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
          <View style={styles.footer}>
            {isSendingSms ? (
              <View style={{width: '100%'}}>
                <Title
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                  SMS VERIFICATION
                </Title>
                <Caption>
                  <IconsMaterial name="sms" />
                  SMS VERIFICATION
                </Caption>
                <TextInput
                  style={{
                    height: 70,
                    width: '95%',
                    margin: 5,
                    backgroundColor: '#cfe0f0',
                  }}
                  mode={'outlined'}
                  label="SMS VERIFICATION"
                  value={verifySms}
                  onChangeText={text => setVerifySms(text)}
                />

                <Button mode="contained" onPress={() => VerifyIsValidSms()}>
                  Verify
                </Button>
                <Button
                  style={{
                    backgroundColor: '#fc3003',
                    marginTop: 10,
                  }}
                  mode="contained"
                  onPress={() => {
                    setSuccess(null);
                    setIsSendingSms(null);
                  }}>
                  Cancel Transaction
                </Button>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <Image
                    style={{width: '100%', margin: 5}}
                    source={require('./../assets/printinfo.png')}
                  />
                </View>
              </View>
            ) : (
              <View style={{width: '100%'}}>
                <Title
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                  Password Verification
                </Title>
                <Caption>
                  <MaterialIcon name="onepassword" />
                  Account Password
                </Caption>
                <TextInput
                  style={{
                    height: 70,
                    width: '95%',
                    margin: 5,
                    backgroundColor: '#cfe0f0',
                  }}
                  mode={'outlined'}
                  secureTextEntry={true}
                  label="Enter Your Password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                />

                <Button mode="contained" onPress={() => verifyPassword()}>
                  Verify Password
                </Button>
                <Button
                  style={{
                    backgroundColor: '#fc3003',
                    marginTop: 10,
                  }}
                  mode="contained"
                  onPress={() => {
                    setSuccess(null);
                    setIsSendingSms(null);
                  }}>
                  Cancel Transaction
                </Button>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <Image
                    style={{width: '100%', margin: 5}}
                    source={require('./../assets/printinfo.png')}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      ) : isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            animating={true}
            color={Colors.red800}
            size={'large'}
          />
          <Text style={{marginTop: 3}}>Verifying QRCODE INFORMATION</Text>
          <Text style={{marginTop: 3}}>Wait For Result</Text>
        </View>
      ) : (
        <View
          style={{
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View
            style={{
              margin: 0,
              padding: 0,
              width: '100%',
              height: '73%',
            }}>
            <QRCodeScanner
              containerStyle={{
                position: 'absolute',
                top: 0,
                backgroundColor: '#ffffff',
                height: '100%',
                marginTop: 0,
                padding: 0,
              }}
              cameraStyle={{
                width: '100%',
              }}
              onRead={ifScanneed}
              permissionDialogMessage="Need Permission To Access Camera"
              reactivate={true}
              showMarker={true}
              reactivateTimeout={1500}
              fadeIn={true}
              cameraType={cameraView ? 'front' : 'back'}
              markerStyle={{borderColor: '#fff', borderRadius: 10}}
              bottomContent={
                <TouchableOpacity onPress={() => setCameraView(!cameraView)}>
                  <Text
                    style={{
                      fontSize: 21,
                      color: 'white',
                      marginBottom: -10,
                    }}>
                    <Ionicons name="camera-reverse-outline" size={30} />
                  </Text>
                </TouchableOpacity>
              }
            />
          </View>
          <Title
            style={{
              marginTop: 20,
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: '#e5b849',
            }}>
            Customer QRCODE
          </Title>
          <View
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: '100%', margin: 5}}
              source={require('./../assets/printinfo.png')}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AddProduct;

const welcomeStyleScreen = StyleSheet.create({
  welcomeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  containerInformation: {
    width: 370,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  containerInformationImage: {
    width: 100,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
  },
  containerInformationCustomer: {
    width: 270,
    display: 'flex',
    flexDirection: 'column',
  },
  containerInformationPhoneAddress: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    margin: 0,
    padding: 0,
    width: '100%',
  },
  footer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#cfe0f0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
});
