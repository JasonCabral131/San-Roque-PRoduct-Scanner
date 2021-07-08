import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
  } from 'react-native-paper';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import Fa from 'react-native-vector-icons/FontAwesome5';
  import Fontisto from 'react-native-vector-icons/Fontisto';
  import {useDispatch} from 'react-redux';
  import {newBuildConnection} from './../redux/actions/'
const DrawerContent = (props) => {
  const dispatch = useDispatch();
  const DisConnection = () => {
    dispatch(newBuildConnection());
  }
    return (
        <View style={{flex: 1}}>
          <DrawerContentScrollView {...props}>
            <View style={styles.DrawerContent}>
              <View style={styles.userInfoSection}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Avatar.Image
                    source={{
                      uri:
                        'https://cdn3.vectorstock.com/i/1000x1000/98/22/logo-for-grocery-store-vector-21609822.jpg',
                    }}
                    size={100}
                  />
                  <View style={{justifyContent: 'center', alignContent: 'center'}}>
                    <Title>San Roque Grocery</Title>
                    <Caption style={{marginLeft: 40}}>@Tanauan,Leyte</Caption>
                  </View>
                </View>
                <View style={styles.row}></View>
              </View>
              <Drawer.Section style={styles.drawerSection}>
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon name="home-outline" color={color} size={size} />
                  )}
                  label="Home"
                  onPress={() => {
                    props.navigation.navigate('Home');
                  }}
                />
                 <DrawerItem
                  icon={({color, size}) => (
                    <Fa name="hand-holding-usd" color={color} size={size} />
                  )}
                  label="Buy Product"
                  onPress={() => {
                    props.navigation.navigate('BuyProduct');
                  }}
                />
                 {/* <DrawerItem
                  icon={({color, size}) => (
                    <Fontisto name="shopping-basket-add" color={color} size={size} />
                  )}
                  label="Add Product"
                  onPress={() => {
                    props.navigation.navigate('addProduct');
                  }}
                /> */}
                <DrawerItem
                  icon={({color, size}) => (
                    <Fa name="user-astronaut" color={color} size={size} />
                  )}
                  label="Q-Payment"
                  onPress={() => {
                    props.navigation.navigate('addProduct');
                  }}
                />
              
              </Drawer.Section>
            </View>
          </DrawerContentScrollView>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="exit-to-app" color={color} size={size} />
              )}
              label="New Connection"
              onPress={() => DisConnection() }
            />
          </Drawer.Section>
        </View>
      );

}
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      borderTopWidth: 1,
      marginHorizontal: 20,
    },
    bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
  
export default DrawerContent;