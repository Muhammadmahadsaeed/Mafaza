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

const ForgetPassNumber = ({navigation}) => {
  const [formattedValue, setFormattedValue] = useState('');
  const [wrongnum, setwrongnum] = useState(false);
  const [correctnum, setcorrectnum] = useState(false);
  const [num, setnum] = useState('');
  const phoneInput = useRef('');
  const [errortext, seterrortext] = useState('');


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
              onPress={() => navigation.navigate('SignInScreen')}>
              <Image
                source={require('../../../assets/Images/Back.png')}
                style={styles.BTVImage}
              />
              <Text style={styles.BTVtext}>Recover Password</Text>
            </TouchableOpacity>
            <Text style={styles.Infotext}>
              Enter the values to Sign Up and got your problem solved with
              Mafaza certified Doctors
            </Text>
            
            <View style={styles.SectionStyle}>
              <Image
                source={require('../../../assets/Images/phone.png')}
                resizeMode="contain"
                style={styles.textinputlogo}
              />
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
              onPress={()=>navigation.navigate('ForgetPassOTPScreen')}
              style={styles.Btndesign}>
              <Text style={styles.Btntext}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default ForgetPassNumber;
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
    width: 200,
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
    marginTop: 70,
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
    textAlign: 'center',
    marginTop:10
  }
});
