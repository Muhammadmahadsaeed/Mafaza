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
  ActivityIndicator
} from 'react-native';
import color from '../../constants/colors';
import font from '../../constants/fonts';
import PhoneInput from 'react-native-phone-number-input';
import {api, headers} from '../Config/env';

const DoctorSignup1 = ({navigation}) => {
  const [wrongname, setwrongname] = useState(false);
  const [correctname, setcorrectname] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');
  const [wrongnum, setwrongnum] = useState(false);
  const [correctnum, setcorrectnum] = useState(false);
  const [wrongexperience, setwrongexperience] = useState(false);
  const [correctexperience, setcorrectexperience] = useState(false);
  const [wrongmedicalnumber, setwrongmedicalnumber] = useState(false);
  const [correctmedicalnumer, setcorrectmedicalnumer] = useState(false);
  const [wrongemail, setwrongemail] = useState(false);
  const [correctemail, setcorrectemail] = useState(false);
  const [email, setemail] = useState('');
  const [num, setnum] = useState('');
  const [name, setname] = useState('');
  const [experience, setexperience] = useState('');
  const [mdeicalnumber, setmdeicalnumber] = useState('');
  const phoneInput = useRef('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [showpassword, setshowpassword] = useState(true);
  const [showconfirmpassword, setshowconfirmpassword] = useState(true);
  const [errortext, seterrortext] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkpass, setcheckpass] = useState(false);
  const [Country,setCountry] = useState('Pakistan')

  const validatename = (text) => {
    const username = text.toLowerCase();
    let reg = /^[a-z ,.'-]+$/i;
    if (reg.test(username) === false) {
      setcorrectname(false);
      setwrongname(true);
      return false;
    } else {
      setcorrectname(true);
      setwrongname(false);
      setname(username);
    }
  };
  const checkNumber = (text) => {
    var reg = new RegExp('^[0-9]+$');
    if (reg.test(text) === true) {
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
    } else {
      setwrongnum(true);
      setcorrectnum(false);
    }
  };
  const validatemail = (text) => {
    let email = text.toLowerCase();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setcorrectemail(false);
      setwrongemail(true);
      return false;
    } else {
      setcorrectemail(true);
      setwrongemail(false);
      setemail(email);
    }
  };
  const displayonoffpassword = () => {
    setshowpassword(!showpassword);
  };
  const displayonoffconfirmpassword = () => {
    setshowconfirmpassword(!showconfirmpassword);
  };
  const validateexperience = (text) => {
    let reg = /^[0-9]*$/i;
    if (reg.test(text) === false) {
      setcorrectexperience(false);
      setwrongexperience(true);
      return false;
    } else {
      setcorrectexperience(true);
      setwrongexperience(false);
      setexperience(text);
    }
  };
  // const validatemedicalnumber = (text) => {
  //   let reg = /^[0-9]*$/i;
  //   if (reg.test(text) === false) {
  //     setcorrectmedicalnumer(false);
  //     setwrongmedicalnumber(true);
  //     return false;
  //   } else {
  //     setcorrectmedicalnumer(true);
  //     setwrongmedicalnumber(false);
  //     setmdeicalnumber(text);
  //   }
  // };
  const validatepass = (text) => {
    const pass = text;
    let reg = /^\S*$/;
    if (reg.test(pass) === false) {
      setcheckpass(false);
      return false;
    } else {
      setcheckpass(true);
      setpassword(pass);
    }
  };
  const HandleContinue = () => {
    seterrortext('')
    if (name != '' && correctname == true) {
      if (email != '' && correctemail == true) {
        if (num != '' && correctnum == true) {
          if (experience != '' && correctexperience == true) {
            if (mdeicalnumber != '') {
              if (password.length >= 6) {
                if (checkpass == true) {
                  if (password == confirmpassword) {
                    setLoading(true)
                    fetch(`${api}doctor/exist`, {
                      method: 'POST',
                      headers: headers,
                      body: JSON.stringify({
                        phone_no: formattedValue,
                      }),
                    })
                      .then((response) => response.json())
                      .then((responseJson) => {
                        if (responseJson.status == 0) {
                          setLoading(false)
                          seterrortext('User already exsist!');
                        } else {
                          setLoading(false)
                          const DoctorData = {
                            DoctorName: name,
                            DoctorEmail: email,
                            DoctorNumber: formattedValue,
                            DoctorExperience: experience,
                            DoctorMedicalNumber: mdeicalnumber,
                            DoctorPassword: password,
                            DoctorCountry: Country
                          };
                          navigation.navigate('DoctorSignUp2Screen',{DoctorData})
                        }
                      })
                      .catch((error) => {
                        setLoading(false)
                        seterrortext('Check your internet connection')
                      });
                  } else {
                    seterrortext("Password does'nt match");
                  }
                } else {
                  seterrortext('Password cannot have spaces');
                }
              } else {
                seterrortext('password cannot be less then 6 digits');
              }
            } else {
              seterrortext('Enter correct medical number');
            }
          } else {
            seterrortext('Enter correct number of experience');
          }
        } else {
          seterrortext('Enter correct number');
        }
      } else {
        seterrortext('Enter correct email');
      }
    } else {
      seterrortext('Enter correct name');
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
            <TouchableOpacity
              style={styles.BackandTextView}
              onPress={() => navigation.navigate('SelectOptionScreen')}>
              <Image
                source={require('../../../assets/Images/Back.png')}
                style={styles.BTVImage}
              />
              <Text style={styles.BTVtext}>Step 1 of 6 - Create Profile</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter your name"
                autoCapitalize="none"
                keyboardType="ascii-capable"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onChangeText={(text) => validatename(text)}
              />
              <View style={styles.iconRight} activeOpacity={0.8}>
                {wrongname && (
                  <Image
                    source={require('../../../assets/Images/wrong.png')}
                    style={styles.iconRightImage}
                  />
                )}
                {correctname && (
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
                placeholder="Enter email address"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onChangeText={(text) => validatemail(text)}
              />
              <View style={styles.iconRight} activeOpacity={0.8}>
                {wrongemail && (
                  <Image
                    source={require('../../../assets/Images/wrong.png')}
                    style={styles.iconRightImage}
                  />
                )}
                {correctemail && (
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
                onChangeCountry={(value)=>setCountry(value.name)}
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
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Years of Experience"
                autoCapitalize="none"
                keyboardType="phone-pad"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                value={experience}
                onChangeText={(text) => validateexperience(text)}
              />
              <View style={styles.iconRight} activeOpacity={0.8}>
                {wrongexperience && (
                  <Image
                    source={require('../../../assets/Images/wrong.png')}
                    style={styles.iconRightImage}
                  />
                )}
                {correctexperience && (
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
                placeholder="Your medical number"
                autoCapitalize="none"
                keyboardType="phone-pad"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                value={mdeicalnumber}
                onChangeText={(text) => setmdeicalnumber(text)}
              />
              {/* <View style={styles.iconRight} activeOpacity={0.8}>
                {wrongmedicalnumber && (
                  <Image
                    source={require('../../../assets/Images/wrong.png')}
                    style={styles.iconRightImage}
                  />
                )}
                {correctmedicalnumer && (
                  <Image
                    source={require('../../../assets/Images/correct.png')}
                    style={styles.iconRightImage}
                  />
                )}
              </View> */}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Password"
                autoCapitalize="none"
                keyboardType="ascii-capable"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                secureTextEntry={showpassword}
                onChangeText={(text) => validatepass(text)}
              />
              <TouchableOpacity
                style={styles.iconRight}
                onPress={() => displayonoffpassword()}>
                <Image
                  source={
                    showpassword
                      ? require('../../../assets/Images/eyeoff.png')
                      : require('../../../assets/Images/eyeon.png')
                  }
                  style={styles.iconRightImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Confirm Password"
                autoCapitalize="none"
                keyboardType="ascii-capable"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                secureTextEntry={showconfirmpassword}
                onChangeText={(text) => setconfirmpassword(text)}
              />
              <TouchableOpacity
                style={styles.iconRight}
                onPress={() => displayonoffconfirmpassword()}>
                <Image
                  source={
                    showconfirmpassword
                      ? require('../../../assets/Images/eyeoff.png')
                      : require('../../../assets/Images/eyeon.png')
                  }
                  style={styles.iconRightImage}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.txtstyle}>{errortext}</Text>
            </View>
            <TouchableOpacity
              onPress={() => HandleContinue()}
              style={styles.Btndesign}>
                 {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.Btntext}>Continue to Step 2</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default DoctorSignup1;
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
});
