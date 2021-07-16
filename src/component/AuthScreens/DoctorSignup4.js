import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import color from '../../constants/colors';
import font from '../../constants/fonts';
import ToggleSwitch from 'toggle-switch-react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DoctorSignup3 = ({ navigation }) => {
  const [wrongfees, setwrongfees] = useState(false);
  const [correctfees, setcorrectfees] = useState(false);
  const [fees, setfees] = useState('');
  const [errortext, seterrortext] = useState('');
  const [PatientType, setPatientType] = useState('');
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
      if (PatientType != '') {
        DoctorData.PatientType = PatientType;
        DoctorData.consultonline = consultonline;
        seterrortext('');
        navigation.navigate('DoctorSignUp5Screen', { DoctorData });
      } else {
        seterrortext('Select patient type');
      }
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
          <Text style={styles.text}>
            Which patient you want to see in Clinic?
          </Text>
          <View style={styles.toggleView}>
            <View style={{flex:1}}>
              <Text style={[styles.toggletext, { color: 'black' }]}>
                Would you like to consult patients online?
              </Text>
            </View>
            <View>
              <ToggleSwitch
                isOn={consultonline}
                onColor={color.Colors.Blue}
                offColor="gray"
                size="small"
                onToggle={() => setconsultonline(!consultonline)}
              />
            </View>

          </View>
          <View
            style={{
              ...(Platform.OS == 'ios' && {
                zIndex: 10,
              }),
              marginTop: 20,
            }}>
            <DropDownPicker
              items={[
                { label: 'Mafaza Patient', value: 'Mafaza Patient' },
                { label: 'Personal Patient', value: 'Personal Patient' },
                { label: 'Both', value: 'Both' },
              ]}
              placeholder="Select Patient Category"
              selectedLabelStyle={{ color: 'black' }}
              placeholderStyle={{color: '#9EA0A4'}}
              style={styles.dropDownStyle}
              itemStyle={styles.dropDownItemStyle}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={(item) => setPatientType(item.value)}
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
    paddingHorizontal: 20
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical:10
  },
  toggletext: {
    fontFamily: font.fonts.PoppinsMedium,
    fontSize: 14,
  },
  dropDownStyle:{
    backgroundColor: '#fafafa',
    borderColor: color.Colors.Blue,
    borderRadius: 4,
    color: '#000',
  },
  dropDownItemStyle:{
    justifyContent: 'flex-start',
  }
});
