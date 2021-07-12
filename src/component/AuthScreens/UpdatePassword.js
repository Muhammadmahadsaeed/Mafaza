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

const UpdatePassword = ({navigation}) => {
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [showpassword, setshowpassword] = useState(true);
  const [showconfirmpassword, setshowconfirmpassword] = useState(true);
  const [errortext, seterrortext] = useState('');


  const displayonoffpassword = () => {
    setshowpassword(!showpassword);
  };
  const displayonoffconfirmpassword = () => {
    setshowconfirmpassword(!showconfirmpassword);
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
              onPress={() => navigation.navigate('ForgetPassOTPScreen')}>
              <Image
                source={require('../../../assets/Images/Back.png')}
                style={styles.BTVImage}
              />
              <Text style={styles.BTVtext}>Reset Password</Text>
            </TouchableOpacity>
            <Text style={styles.Infotext}>
              Enter the values to Sign Up and got your problem solved with
              Mafaza ceryified Doctors
            </Text>
         
       
            <View style={styles.inputContainer}>
              <Image
                source={require('../../../assets/Images/password.png')}
                resizeMode="contain"
                style={styles.textinputlogo}
              />
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Password"
                autoCapitalize="none"
                keyboardType="ascii-capable"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                secureTextEntry={showpassword}
                onChangeText={(text) => setpassword(text)}
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
              <Image
                source={require('../../../assets/Images/password.png')}
                resizeMode="contain"
                style={styles.textinputlogo}
              />
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
              onPress={() => navigation.navigate('SignInScreen')}
              style={styles.Btndesign}>
              <Text style={styles.Btntext}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default UpdatePassword;
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
  processImageView: {
    width: '100%',
    marginTop: 20,
  },
  ProcesImage: {
    width: '100%',
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
  textinputlogo: {
    width: '10%',
    height: '50%',
  },
  inputStyle: {
    width: '80%',
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
