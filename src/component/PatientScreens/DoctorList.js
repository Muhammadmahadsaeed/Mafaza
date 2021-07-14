import React, {useState} from 'react';
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

<<<<<<< HEAD
const DoctorList = ({ navigation, data }) => {

    const goToChatRoom = (item) => {
        navigation.navigate('ChatScreen', { data })

    }
    return (
        <TouchableOpacity
            style={styles.box}>
            <View style={styles.imgBox}>
                <Image source={require('../../../assets/Images/doctor.png')} style={styles.img} />
            </View>
            <View style={{ flex: 3 }}>
                <Text style={styles.heading}>{data.name}</Text>
                <Text style={styles.para}>{data.designation}</Text>
            </View>
            <View
                style={{
                    flex: 0.6,
                    alignItems: 'center',
                    backgroundColor: 'blue'
                }}>
                <Image
                    source={require('../../../assets/Images/cross.png')}
                    resizeMode="contain"
                    style={{ position: 'absolute', top: -20 }}
                />
                <TouchableOpacity style={{ bottom: 7, position: 'absolute', backgroundColor: 'red' }} onPress={() => goToChatRoom(data)}>
                    <Image
                        source={require('../../../assets/Images/bluemessage.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
=======
const DoctorList = ({navigation, data}) => {
  const goToChatRoom = (item) => {
    navigation.navigate('ChatScreen');
  };
  const goToDoctorProfile = (item) => {
    navigation.navigate('DoctorAppointmentScreen',{
        doctorData:item
    });
  };
  return (
    <TouchableOpacity
      style={styles.box}
      onPress={() => goToDoctorProfile(data)}>
      <View style={styles.imgBox}>
        <Image
          source={require('../../../assets/Images/doctor.png')}
          style={styles.img}
        />
      </View>
      <View style={{flex: 3}}>
        <Text style={styles.heading}>{data.name}</Text>
        <Text style={styles.para}>{data.designation}</Text>
      </View>
      <View
        style={{
          flex: 0.6,
          alignItems: 'center',
        }}>
        <Image
          source={require('../../../assets/Images/cross.png')}
          resizeMode="contain"
          style={{position: 'absolute', top: -20}}
        />
        <TouchableOpacity style={{bottom: 7, position: 'absolute'}}>
          <Image
            source={require('../../../assets/Images/bluemessage.png')}
            resizeMode="contain"
          />
>>>>>>> b76d675a4a394544df5a65cd66bc8204ac3d59b0
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorList;

const styles = StyleSheet.create({
<<<<<<< HEAD
    box: {
        borderRadius: 20,
        padding: 7,
        height: 120,
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        // elevation: 7,
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
        flex: 1,
        padding: 10
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 10
    }
})
=======
  box: {
    borderRadius: 20,
    padding: 7,
    height: 120,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    // elevation: 7,
  },
  heading: {
    fontFamily: fonts.fonts.PoppinsRegular,
    fontSize: 16,
    marginTop: 10,
    marginLeft: 5,
  },
  para: {
    fontFamily: fonts.fonts.PoppinsRegular,
    fontSize: 14,
    marginLeft: 5,
    color: colors.Colors.Gray,
  },
  imgBox: {
    flex: 1,
    padding: 10,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
});
>>>>>>> b76d675a4a394544df5a65cd66bc8204ac3d59b0
