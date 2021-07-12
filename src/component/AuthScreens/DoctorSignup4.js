import React, {useState} from 'react';
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
import ToggleSwitch from 'toggle-switch-react-native';

const DoctorSignup3 = ({navigation}) => {
  const [wrongfees, setwrongfees] = useState(false);
  const [correctfees, setcorrectfees] = useState(false);
  const [fees, setfees] = useState('');
  const [errortext, seterrortext] = useState('');
  const [mafazapatient, setmafazapatient] = useState(false);
  const [personalpatient, setpersonalpatient] = useState(false);
  const [both, setboth] = useState(false);
  const [consultonline, setconsultonline] = useState(false);
  const DoctorData = navigation.getParam('DoctorData');

  const validadefees = (text) => {
    let reg = /^[0-9\b]+$/i;
    if (reg.test(text) === false) {
      setcorrectfees(false);
      setwrongfees(true);
      return false;
    } else {
      setcorrectfees(true);
      setwrongfees(false);
      setfees(text);
    }
  };
  const HandleContinue = () => {
    if (fees != '' && correctfees == true) {
      DoctorData.DoctorFees = fees;
      DoctorData.mafazapatient = mafazapatient;
      DoctorData.personalpatient = personalpatient;
      DoctorData.Both = both;
      DoctorData.consultonline = consultonline;
      seterrortext('')
      navigation.navigate('DoctorSignUp5Screen', {DoctorData});
    } else {
      seterrortext('Enter correct fees');
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
              onPress={() => navigation.navigate('DoctorSignUp3Screen')}>
              <Image
                source={require('../../../assets/Images/Back.png')}
                style={styles.BTVImage}
              />
              <Text style={styles.BTVtext}>Step 4 of 6 - Online Details</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Online Consultation Fees"
                autoCapitalize="none"
                keyboardType="phone-pad"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onChangeText={(text) => validadefees(text)}
              />
              <View style={styles.iconRight} activeOpacity={0.8}>
                {wrongfees && (
                  <Image
                    source={require('../../../assets/Images/wrong.png')}
                    style={styles.iconRightImage}
                  />
                )}
                {correctfees && (
                  <Image
                    source={require('../../../assets/Images/correct.png')}
                    style={styles.iconRightImage}
                  />
                )}
              </View>
            </View>
            <View>
              <Text style={styles.text}>
                Which patient you want to see in Clinic?
              </Text>
            </View>
            <View style={[styles.toggleView, {marginTop: 20}]}>
              <Text style={[styles.toggletext, {color: 'gray'}]}>
                Mafaza Patient
              </Text>
              <ToggleSwitch
                isOn={mafazapatient}
                onColor={color.Colors.Blue}
                offColor="gray"
                size="small"
                onToggle={() => setmafazapatient(!mafazapatient)}
              />
            </View>
            <View style={[styles.toggleView, {marginTop: 5}]}>
              <Text style={[styles.toggletext, {color: 'gray'}]}>
                Only Personal Patient
              </Text>
              <ToggleSwitch
                isOn={personalpatient}
                onColor={color.Colors.Blue}
                offColor="gray"
                size="small"
                onToggle={() => setpersonalpatient(!personalpatient)}
              />
            </View>
            <View style={[styles.toggleView, {marginTop: 5}]}>
              <Text style={[styles.toggletext, {color: 'gray'}]}>Both</Text>
              <ToggleSwitch
                isOn={both}
                onColor={color.Colors.Blue}
                offColor="gray"
                size="small"
                onToggle={() => setboth(!both)}
              />
            </View>
            <View style={[styles.toggleView, {marginTop: 5}]}>
              <Text style={[styles.toggletext, {color: 'black'}]}>
                Would you like to consult patients online?
              </Text>
              <ToggleSwitch
                isOn={consultonline}
                onColor={color.Colors.Blue}
                offColor="gray"
                size="small"
                onToggle={() => setconsultonline(!consultonline)}
              />
            </View>
            <View>
              <Text style={styles.txtstyle}>{errortext}</Text>
            </View>
            <TouchableOpacity
              onPress={() => HandleContinue()}
              style={styles.Btndesign}>
              <Text style={styles.Btntext}>Continue to Step 5</Text>
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
  text: {
    marginTop: 20,
    color: 'black',
    fontSize: 16,
    fontFamily: font.fonts.PoppinsBold,
  },
  toggleView: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 2,
    paddingRight: 2,
  },
  toggletext: {
    fontFamily: font.fonts.PoppinsMedium,
    fontSize: 14,
  },
});
