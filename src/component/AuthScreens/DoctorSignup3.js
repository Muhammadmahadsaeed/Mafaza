import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import color from '../../constants/colors';
import font from '../../constants/fonts';
import PhoneInput from 'react-native-phone-number-input';

const DoctorSignup3 = ({navigation}) => {
  const [wrongcity, setwrongcity] = useState(false);
  const [correctcity, setcorrectcity] = useState(false);
  const [city, setcity] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [wrongnum, setwrongnum] = useState(false);
  const [correctnum, setcorrectnum] = useState(false);
  const [num, setnum] = useState('');
  const phoneInput = useRef('');
  const [errortext, seterrortext] = useState('');
  const [wronghospital, setwronghospital] = useState(false);
  const [correcthospital, setcorrecthospital] = useState(false);
  const [wrongdesignation, setwrongdesignation] = useState(false);
  const [correctdesignation, setcorrectdesignation] = useState(false);
  const [designation, setdesignation] = useState('');
  const [hospital, sethospital] = useState('');
  const [wrongassistantname, setwrongassistantname] = useState(false);
  const [correctassistantname, setcorrectassistantname] = useState(false);
  const [assistantname, setassistantname] = useState('');
  const [reviewaddress, setreviewaddress] = useState('');
  const DoctorData = navigation.getParam('DoctorData');

  const validatecity = (text) => {
    const city = text.toLowerCase();
    let reg = /^[a-z ,.'-]+$/i;
    if (reg.test(city) === false) {
      setcorrectcity(false);
      setwrongcity(true);
      return false;
    } else {
      setcorrectcity(true);
      setwrongcity(false);
      setcity(city);
    }
  };
  const validatedesignation = (text) => {
    const designation = text.toLowerCase();
    let reg = /^[a-z ,.'-]+$/i;
    if (reg.test(designation) === false) {
      setcorrectdesignation(false);
      setwrongdesignation(true);
      return false;
    } else {
      setcorrectdesignation(true);
      setwrongdesignation(false);
      setdesignation(designation);
    }
  };
  const validatehospital = (text) => {
    const Hospital = text.toLowerCase();
    let reg = /^[a-z ,.'-]+$/i;
    if (reg.test(Hospital) === false) {
      setcorrecthospital(false);
      setwronghospital(true);
      return false;
    } else {
      setcorrecthospital(true);
      setwronghospital(false);
      sethospital(Hospital);
    }
  };
  const checkNumber = (text) => {
    const checkValid = phoneInput.current?.isValidNumber(text);
    if (checkValid) {
      setcorrectnum(true);
      setwrongnum(false);
      setnum(text);
    } else {
      setwrongnum(true);
      setcorrectnum(false);
      setnum(text);
    }
  };
  const validateassistantname = (text) => {
    const assistantname = text.toLowerCase();
    let reg = /^[a-z ,.'-]+$/i;
    if (reg.test(assistantname) === false) {
      setcorrectassistantname(false);
      setwrongassistantname(true);
      return false;
    } else {
      setcorrectassistantname(true);
      setwrongassistantname(false);
      setassistantname(assistantname);
    }
  };
  const HandleContinue = () => {
    if (designation != '' && correctdesignation == true) {
      if (city != '' && correctcity == true) {
        if (hospital != '' && correcthospital == true) {
          if (reviewaddress != '') {
            if (assistantname != '' && correctassistantname == true) {
              if (num != '' && correctnum == true) {
                DoctorData.DoctorDesignation = designation;
                DoctorData.DoctorCity = city;
                DoctorData.DoctorHospital = hospital;
                DoctorData.reviewaddress = reviewaddress;
                DoctorData.assistantname = assistantname;
                DoctorData.assistantnumber = formattedValue;
                navigation.navigate('DoctorSignUp4Screen', {DoctorData});
                seterrortext('');
              } else {
                seterrortext('Enter correct number');
              }
            } else {
              seterrortext('Enter correct assistant name');
            }
          } else {
            seterrortext('Enter correct address');
          }
        } else {
          seterrortext('Enter correct Hospital');
        }
      } else {
        seterrortext('Enter correct city');
      }
    } else {
      seterrortext('Enter correct designation');
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <KeyboardAvoidingView enabled>
          <View style={styles.innerView}>
           
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Designation"
                autoCapitalize="none"
                keyboardType="ascii-capable"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onChangeText={(text) => validatedesignation(text)}
              />
              <View style={styles.iconRight} activeOpacity={0.8}>
                {wrongdesignation && (
                  <Image
                    source={require('../../../assets/Images/wrong.png')}
                    style={styles.iconRightImage}
                  />
                )}
                {correctdesignation && (
                  <Image
                    source={require('../../../assets/Images/correct.png')}
                    style={styles.iconRightImage}
                  />
                )}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter City"
                autoCapitalize="none"
                keyboardType="ascii-capable"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onChangeText={(text) => validatecity(text)}
              />
              <View style={styles.iconRight} activeOpacity={0.8}>
                {wrongcity && (
                  <Image
                    source={require('../../../assets/Images/wrong.png')}
                    style={styles.iconRightImage}
                  />
                )}
                {correctcity && (
                  <Image
                    source={require('../../../assets/Images/correct.png')}
                    style={styles.iconRightImage}
                  />
                )}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Hospital"
                autoCapitalize="none"
                keyboardType="ascii-capable"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onChangeText={(text) => validatehospital(text)}
              />
              <View style={styles.iconRight} activeOpacity={0.8}>
                {wronghospital && (
                  <Image
                    source={require('../../../assets/Images/wrong.png')}
                    style={styles.iconRightImage}
                  />
                )}
                {correcthospital && (
                  <Image
                    source={require('../../../assets/Images/correct.png')}
                    style={styles.iconRightImage}
                  />
                )}
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.reviewaddressheadertext}>Review Address</Text>
              <TextInput
                style={styles.reviewaddresstext}
                placeholder={'Review Address'}
                textAlignVertical="top"
                multiline
                autoCapitalize="none"
                keyboardType="ascii-capable"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onChangeText={(text) => setreviewaddress(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Assitant Name"
                autoCapitalize="none"
                keyboardType="ascii-capable"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onChangeText={(text) => validateassistantname(text)}
              />
              <View style={styles.iconRight} activeOpacity={0.8}>
                {wrongassistantname && (
                  <Image
                    source={require('../../../assets/Images/wrong.png')}
                    style={styles.iconRightImage}
                  />
                )}
                {correctassistantname && (
                  <Image
                    source={require('../../../assets/Images/correct.png')}
                    style={styles.iconRightImage}
                  />
                )}
              </View>
            </View>
            <View style={styles.SectionStyle}>
              <PhoneInput
                ref={phoneInput}
                containerStyle={styles.phonecontainer}
                textInputStyle={styles.phonetext}
                codeTextStyle={styles.phonecodetext}
                textContainerStyle={styles.phonetextcontainer}
                defaultValue={num}
                defaultCode="PK"
                layout="second"
                onChangeText={(text) => {
                  checkNumber(text);
                }}
                onChangeFormattedText={(text) => {
                  setFormattedValue(text);
                }}
              />
              <View style={styles.iconRight} activeOpacity={0.8}>
                {wrongnum && (
                  <Image
                    source={require('../../../assets/Images/wrong.png')}
                    style={styles.iconRightImage}
                  />
                )}
                {correctnum && (
                  <Image
                    source={require('../../../assets/Images/correct.png')}
                    style={styles.iconRightImage}
                  />
                )}
              </View>
            </View>
            <View>
              <Text style={styles.txtstyle}>{errortext}</Text>
            </View>
            <TouchableOpacity
              onPress={() => HandleContinue()}
              style={styles.Btndesign}>
              <Text style={styles.Btntext}>Continue to Step 4</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default DoctorSignup3;
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
    width: 350,
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
  inputContainer: {
    width: '100%',
    marginTop: 20,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.Colors.Blue,
  },
  inputStyle: {
    width: '90%',
    fontFamily: font.fonts.PoppinsRegular,
    fontSize: 16,
  },
  iconRight: {
    position: 'absolute',
    right: 3,
    height: 56,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRightImage: {
    resizeMode: 'contain',
    height: '65%',
    width: '65%',
  },
  phonecontainer: {
    height: '98%',
    width: '80%',
    backgroundColor: color.Colors.White,
  },
  phonetext: {
    fontFamily: font.fonts.PoppinsMedium,
    height: 56,
    fontSize: 16,
    color: 'black',
    backgroundColor: color.Colors.White,
  },
  phonecodetext: {
    fontFamily: font.fonts.PoppinsMedium,
    fontSize: 20,
    color: 'black',
    backgroundColor: color.Colors.White,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 56,
    width: '100%',
    borderBottomColor: color.Colors.Blue,
    borderBottomWidth: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  phonetextcontainer: {
    backgroundColor: color.Colors.White,
    height: '98%',
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
  reviewaddresstext: {
    width: '100%',
    marginTop: 5,
    height: 150,
    borderWidth: 1,
    borderColor: color.Colors.Blue,
  },
  reviewaddressheadertext: {
    color: 'black',
    fontFamily: font.fonts.PoppinsRegular,
    fontSize: 14,
  },
});
