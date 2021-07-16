import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const DoctorList = ({ navigation, data }) => {

  const goToChatRoom = (item) => {
    navigation.navigate('ChatScreen', {
      data: {
        _id: item._id,
        name: item.name,
        phone_no: item.phone_no,
        profile: "Null"
      }
    })
  }
  const goToDoctorProfile = (item) => {
    navigation.navigate('DoctorAppointmentScreen', {
      doctorData: item
    });
  };
  return (
    <View  style={styles.box}>
      <TouchableOpacity style={styles.left} activeOpacity={0.8} onPress={() => goToDoctorProfile(data)}>
        <View style={styles.imgBox}>
          <Image source={require('../../../assets/Images/doctor.png')} style={styles.img} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>{data.name}</Text>
          <Text style={styles.para}>{data.designation}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.right}>
        <TouchableOpacity style={styles.iconTop} activeOpacity={0.8}>
          <Image source={require('../../../assets/Images/icon-save.png')}  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => goToChatRoom(data)} activeOpacity={0.8}>
          <Image source={require('../../../assets/Images/bluemessage.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default DoctorList;
const styles = StyleSheet.create({
  box: {
    borderRadius: 20,
    padding: 7,
    height: 120,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    // elevation: 7,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: fonts.fonts.PoppinsRegular,
    fontSize: 16,
    marginTop: 10,
    marginLeft: 5
  },
  para: {
    fontFamily: fonts.fonts.PoppinsRegular,
    fontSize: 14,
    marginLeft: 5,
    color: colors.Colors.Gray
  },
  imgBox: {
    height: 100,
    width: 100,
    padding: 5
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 10
  },
  right: {
    flexDirection:'column',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  iconTop:{
    paddingHorizontal: 15,
    top: -10, 
    paddingBottom: 20
  },
  icon:{
    paddingHorizontal: 15, 
    paddingTop: 20
  }
})

