import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import {api, headers} from '../Config/env';
import {useSelector} from 'react-redux';

const DoctorProfile = ({navigation}) => {
  const [errortext, seterrortext] = useState('');
  const user = useSelector((state) => state.user.user);
  const DoctorData = navigation.getParam('doctorData');

  const HandleAppointment = () => {
    console.log(DoctorData);
  };
  const goToChatRoom = () => {
    const data = DoctorData;
    navigation.navigate('ChatScreen', {data});
  };
  return (
    <View style={styles.container}>
      <View style={styles.uppercontainer}>
        <TouchableOpacity
          style={[styles.HamburgerView, {marginLeft: 20}]}
          onPress={() => navigation.toggleDrawer()}>
          <Image
            source={require('../../../assets/Images/Hamburger.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.uppertext}>Profile</Text>
        <TouchableOpacity
          style={[styles.HamburgerView, {marginRight: 20}]}
          onPress={() => goToChatRoom()}>
          <Image
            source={require('../../../assets/Images/bluemessage.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.lowercontainer}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <KeyboardAvoidingView enabled>
            <View style={styles.innerView}>
              <View style={styles.upperview}>
                <View style={styles.imgBox}>
                  <Image
                    source={require('../../../assets/Images/doctor.png')}
                    style={styles.img}
                  />
                </View>
                <View style={styles.textviewbox}>
                  <View style={styles.textbox}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text style={styles.text1}>{DoctorData.name}</Text>
                      <Text style={styles.text2}>{DoctorData.designation}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <Image
                          source={require('../../../assets/Images/patients.png')}
                          resizeMode="contain"
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={[
                            styles.text1,
                            {fontFamily: fonts.fonts.PoppinsMedium},
                          ]}>
                          200
                        </Text>
                        <Text
                          style={[styles.text2, {color: colors.Colors.Orange}]}>
                          Patients
                        </Text>
                      </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <Image
                          source={require('../../../assets/Images/experience.png')}
                          resizeMode="contain"
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={[
                            styles.text1,
                            {fontFamily: fonts.fonts.PoppinsMedium},
                          ]}>
                          {DoctorData.experience} Years
                        </Text>
                        <Text style={styles.text2}>Experience</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.lowerview}>
                <Text style={styles.detailsText}>
                  Details
                </Text>
                <View style={{width:'100%',height:60,flexDirection:'row',marginTop:20}}>
                      <View style={{flex: 1, alignItems: 'center',justifyContent:'center',backgroundColor:'green'}}>
                        <Image
                          source={require('../../../assets/Images/patients.png')}
                          resizeMode="contain"
                        />
                      </View>
                      <View
                        style={{
                          flex: 5,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={[
                            styles.text1,
                            {fontFamily: fonts.fonts.PoppinsMedium},
                          ]}>
                          200
                        </Text>
                        <Text
                          style={[styles.text2, {color: colors.Colors.Orange}]}>
                          Patients
                        </Text>
                      </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <TouchableOpacity
          onPress={() => HandleAppointment()}
          style={styles.Btndesign}>
          <Text style={styles.Btntext}>Make Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFBFB',
    flex: 1,
  },
  uppercontainer: {
    height: '8%',
    backgroundColor: colors.Colors.ScreenBackground,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lowercontainer: {
    height: '92%',
    width: '100%',
    backgroundColor: colors.Colors.ScreenBackground,
  },
  HamburgerView: {
    height: '100%',
    justifyContent: 'center',
  },
  uppertext: {
    color: colors.Colors.Blue,
    fontFamily: fonts.fonts.PoppinsBold,
    fontSize: 16,
  },
  innerView: {
    height: '100%',
    width: '100%',
  },
  Btndesign: {
    backgroundColor: colors.Colors.Blue,
    width: '90%',
    height: 62,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
  },
  Btntext: {
    fontFamily: fonts.fonts.PoppinsMedium,
    fontSize: 20,
    color: colors.Colors.White,
  },
  txtstyle: {
    color: 'red',
    fontFamily: fonts.fonts.PoppinsMedium,
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  imgBox: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  img: {
    height: '80%',
    width: '100%',
    borderRadius: 10,
  },
  textviewbox: {
    flex: 2,
    justifyContent: 'center',
  },
  textbox: {
    width: '100%',
    height: '75%',
  },
  text1: {
    fontFamily: fonts.fonts.PoppinsBold,
    fontSize: 16,
  },
  text2: {
    fontFamily: fonts.fonts.PoppinsMedium,
    fontSize: 12,
    color: colors.Colors.Blue,
  },
  upperview: {
    width: '100%',
    height: 250,
    flexDirection: 'row',
    backgroundColor: 'pink',
  },
  lowerview: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
  },
  detailsText: {
    marginTop: 20,
    color: colors.Colors.Blue,
    fontFamily: fonts.fonts.PoppinsBold,
    fontSize: 16,
  },
});
