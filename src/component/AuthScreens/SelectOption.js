import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import color from '../../constants/colors';
import font from '../../constants/fonts';

const SelectOption = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Images/logo.png')}
        style={{width: '50%', height: 200, resizeMode: 'contain'}}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('DoctorSignUp1Screen')}
        style={styles.Btndesign}>
        <Text style={styles.Btntext}>Sign Up as a Doctor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('PatientSignUpScreen')}
        style={[
          styles.Btndesign,
          {marginTop: 10, backgroundColor: color.Colors.Orange},
        ]}>
        <Text style={styles.Btntext}>Sign Up as a Patient</Text>
      </TouchableOpacity>
      <View style={styles.SignINtextView}>
        <Text
          style={{
            color: color.Colors.Blue,
            fontSize: 16,
            fontFamily: font.fonts.PoppinsRegular,
            marginRight: 5,
          }}>
          -
        </Text>
        <Text
          style={styles.Ortext}
          onPress={() => navigation.navigate('SignInScreen')}>
          or
        </Text>
        <Text
          style={{
            color: color.Colors.Blue,
            fontSize: 16,
            fontFamily: font.fonts.PoppinsRegular,
            marginLeft: 5,
          }}>
          -
        </Text>
      </View>
      <View style={styles.SignINtextView}>
        <Text style={[styles.Alreadytext, {color: color.Colors.Orange}]}>
          Already have an account?
        </Text>
        <Text
          onPress={() => navigation.navigate('SignInScreen')}
          style={[
            styles.Alreadytext,
            {
              color: color.Colors.Blue,
              marginLeft: 5,
              textDecorationLine: 'underline',
            },
          ]}>
          Sign In
        </Text>
      </View>
    </View>
  );
};

export default SelectOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.Colors.White,
    justifyContent: 'center',
  },
  Btndesign: {
    backgroundColor: color.Colors.Blue,
    width: '90%',
    height: 62,
    marginTop: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Btntext: {
    fontFamily: font.fonts.PoppinsMedium,
    fontSize: 16,
    color: color.Colors.White,
  },
  Ortext: {
    fontSize: 16,
    fontFamily: font.fonts.PoppinsRegular,
    color: color.Colors.Orange,
  },
  SignINtextView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  Alreadytext: {
    fontFamily: font.fonts.PoppinsRegular,
    fontSize: 14,
  }
});
