import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import color from '../../constants/colors';
import font from '../../constants/fonts';
import OTPTextView from 'react-native-otp-textinput';
import { api,headers } from '../Config/env';

const PatientOtp = ({navigation}) => {
  let otpInput = useRef(null);
  const [code, setCode] = useState('');
  const [errortext, seterrortext] = useState('');
  const [confirm, setConfirm] = useState(navigation.getParam('Confirmation'));
  const PatientData = navigation.getParam('PatientData');

  const HandlePatient = () => {
    fetch(`${api}patient/register`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        name: PatientData.PatientName,
        password: PatientData.PatientPassword,
        phone_no: PatientData.PatientNumber,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  async function confirmCode() {
    if (code.length == 6) {
      seterrortext("")
      try {
        await confirm.confirm(code);
        HandlePatient();

      } catch (error) {
        seterrortext('Invalid Code');
      }
    } else {
      seterrortext('code less then 6');
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <KeyboardAvoidingView enabled>
          <View style={styles.innerView}>
            <TouchableOpacity
              style={styles.BackandTextView}
              onPress={() => navigation.navigate('PatientSignUpScreen')}>
              <Image
                source={require('../../../assets/Images/Back.png')}
                style={styles.BTVImage}
              />
              <Text style={styles.BTVtext}>OTP</Text>
            </TouchableOpacity>
            <Text style={styles.Infotext}>
              Please enter 6 digits verification code received on sms on your
              number
            </Text>
            <View style={styles.processImageView}>
              <Image
                source={require('../../../assets/Images/processing2.png')}
                resizeMode="contain"
                style={styles.ProcesImage}
              />
            </View>
            <OTPTextView
              ref={(e) => (otpInput = e)}
              handleTextChange={(e) => {
                setCode(e);
              }}
              containerStyle={styles.textInputContainer}
              inputCount={6}
              tintColor={color.Colors.Orange}
              offTintColor={color.Colors.Blue}
              inputCellLength={1}
            />
            <View>
              <Text style={styles.txtstyle}>{errortext}</Text>
            </View>
            <TouchableOpacity
              style={styles.Btndesign}
              onPress={() => confirmCode()}>
              <Text style={styles.Btntext}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default PatientOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Colors.White,
  },
  innerView: {
    height: '100%',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  BackandTextView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: 110,
  },
  BTVtext: {
    color: color.Colors.Blue,
    fontFamily: font.fonts.PoppinsMedium,
    fontSize: 22,
    marginLeft: 6,
  },
  BTVImage: {
    resizeMode: 'contain',
    marginTop: 4,
  },
  Infotext: {
    fontFamily: font.fonts.PoppinsRegular,
    fontSize: 16,
    marginTop: 20,
  },
  processImageView: {
    width: '100%',
    marginTop: 20,
  },
  ProcesImage: {
    width: '100%',
  },
  textInputContainer: {
    marginTop: 20,
    justifyContent: 'space-evenly',
  },
  Btndesign: {
    backgroundColor: color.Colors.Orange,
    width: '100%',
    height: 62,
    marginTop: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Btntext: {
    fontFamily: font.fonts.PoppinsMedium,
    fontSize: 20,
    color: color.Colors.White,
  },
  txtstyle: {
    color: 'red',
    fontFamily: font.fonts.PoppinsMedium,
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});
