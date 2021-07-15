import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text, StyleSheet, PermissionsAndroid, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';
import fonts from '../../constants/fonts';
import { api } from '../Config/env';


const RecentChats = ({ navigation }) => {

  const [data, setData] = useState([])
  const user = useSelector((state) => state.user.user.data.user);
  const flatListRef = useRef(null)

  const goToChatRoom = (item) => {

    navigation.navigate('ChatRoomScreen', { data: item.chatUser })
  }

  useEffect(() => {
    getRecentChats()
  }, [])

  const getRecentChats = async () => {
    await fetch(`${api}doctor_chat/conservation/${user._id}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then((responseJson) => {

        setData(responseJson.data)
      })
      .catch(err => {
        console.log(err);
      })

  }
  const renderItemComponent = ({ item }) => {


    return (
      <TouchableOpacity style={styles.row} activeOpacity={0.9} onPress={() => goToChatRoom(item)}>
        <View style={styles.left}>
          <View style={styles.profileIcon}>
            <Image source={require('../../../assets/Images/doctor.png')} style={styles.profileIconImg} />
          </View>
          <View style={styles.userDetail}>
            <Text style={styles.name} numberOfLines={1}>{item.chatUser.name}</Text>
            <Text style={styles.num} numberOfLines={1}>{item.chatUser.phone_no}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Image source={require('../../../assets/Images/forward-icon.png')} />
        </View>
      </TouchableOpacity>
    );
  }
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchView}>
        <View style={styles.touchableButtonLeft}>
          <Image
            source={require('../../../assets/Images/search-icon.png')}
            style={styles.buttonImage}
          />
        </View>
        <TextInput
          style={styles.inputStyle}
          placeholder="Search"
          keyboardType="default"
          returnKeyType="next"
        // onChangeText={(e) => searchUser(e)}
        />
      </View>
      {data.length ?
        <FlatList style={{ flex: 1, paddingHorizontal: 10 }}
          ref={flatListRef}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(i, index) => renderItemComponent(i)}
          ItemSeparatorComponent={() => renderSeparator()}
        />
        :
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="black" size="large" />
        </View>
      }

    </View>
  );
};

export default RecentChats;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  //input fields
  searchView: {
    flexDirection: 'row',
    height: 50,
    marginHorizontal: 10,
    marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#c4c5c6',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButtonLeft: {
    position: 'absolute',
    left: 3,
    height: 35,
    width: 35,
    justifyContent: 'center',
    padding: 4,
    alignItems: 'center',
  },
  buttonImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    marginLeft: 40,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    fontFamily: fonts.fonts.PoppinsMedium
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FBFBFB',

  },
  left: {
    flex: 1,
    flexDirection: 'row',
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#136EE3',
    backgroundColor: 'white'
  },
  profileIconImg: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  userDetail: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: fonts.fonts.PoppinsMedium,
    fontSize: 14
  },
  num: {
    fontFamily: fonts.fonts.PoppinsMedium,
    color: '#2020635C',
    fontSize: 13
  },
  right: {
    marginHorizontal: 20
  },
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  
  }
})