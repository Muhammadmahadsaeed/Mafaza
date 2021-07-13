import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import color from '../../constants/colors';
import font from '../../constants/fonts';
import OTPTextView from 'react-native-otp-textinput';
import {api, headers} from '../Config/env';
import {useDispatch} from 'react-redux';

const DoctorOTP = ({navigation}) => {
  const dispatch = useDispatch();
  const mapDispatchToProps = (value) => {
    dispatch({type: 'SET_USER', payload: value});
  };

  let otpInput = useRef(null);
  const [code, setCode] = useState('');
  const [errortext, seterrortext] = useState('');
  const DoctorData = navigation.getParam('DoctorData');
  const [confirm, setConfirm] = useState(navigation.getParam('Confirmation'));
  const [loading, setLoading] = useState(false);

  const storeData = (users) => {
    setLoading(false);
    mapDispatchToProps(users);
    navigation.navigate('DoctorHomeScreen');
  };

  const HandleDoctor = () => {
    DoctorData.Role = 'DOCTOR';
    console.log(DoctorData,']]]]]]]]')
    fetch(`${api}doctor/register`, {
      method: 'POST',
      headers: headers,
      body: {
        experience: DoctorData.DoctorExperience,
        medical_no: DoctorData.DoctorMedicalNumber,
        name: DoctorData.DoctorName,
        phone_no: DoctorData.DoctorNumber,
        email: DoctorData.DoctorEmail,
        password: DoctorData.DoctorPassword,
        about: DoctorData.DoctorSpeacility,
        qualification: DoctorData.DoctorQualification,
        past_experience: DoctorData.DoctorExperience,
        country: DoctorData.DoctorCountry,
        city: DoctorData.DoctorCity,
        hospital: DoctorData.DoctorHospital,
        address: DoctorData.reviewaddress,
        designation: DoctorData.DoctorDesignation,
        assistant: DoctorData.assistantname,
        assistant_no: DoctorData.assistantnumber,
        consultation_fee: DoctorData.DoctorFees,
        my_patients: DoctorData.PatientType,
        patient_consult_online: DoctorData.consultonline,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson,'============')
        if(responseJson.status == 1)
        {storeData(DoctorData)}
        else {
          seterrortext('Ckeck your Internet connection');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  async function confirmCode() {
    setLoading(true);
    if (code.length == 6) {
      seterrortext('');
      try {
        await confirm.confirm(code);
        HandleDoctor();
      } catch (error) {
        setLoading(false);
        seterrortext('Invalid Code');
      }
    } else {
      setLoading(false);
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
              onPress={() => navigation.navigate('DoctorSignUp5Screen')}>
              <Image
                source={require('../../../assets/Images/Back.png')}
                style={styles.BTVImage}
              />
              <Text style={styles.BTVtext}>Step 6 of 6 - Confirm OTP</Text>
            </TouchableOpacity>
            <Text style={styles.Infotext}>
              Please enter 6 digits verification code received on sms on your
              number to move to dashboard
            </Text>
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
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.Btntext}>Continue to the Dashboard</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default DoctorOTP;

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
    width: 300,
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
    textAlign: 'justify',
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
