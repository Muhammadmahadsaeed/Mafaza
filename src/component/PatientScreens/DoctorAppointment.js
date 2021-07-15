import React, {useState} from 'react';
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

const DoctorAppointment = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [timeSlot, settimeSlot] = useState('');
  const [consultation_purpose, setconsultation_purpose] = useState('');
  const [message, setmessage] = useState('');
  const [errortext, seterrortext] = useState('');
  const user = useSelector((state) => state.user.user);
  const DoctorData = navigation.getParam('doctorData')

  const HandleAppointment = () => {
    seterrortext('')
    if (timeSlot != '') {
      if(consultation_purpose != '')
      {
        setLoading(true)
        fetch(`${api}appointment/add`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            date: '1/5/2021',
            timeSlot: timeSlot,
            name: user.data.user.name,
            consultation_purpose: consultation_purpose,
            patientId: user.data.user._id,
            doctorId: DoctorData._id,
            message:message
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status == 1) {
              setLoading(false);
              settimeSlot('')
              setconsultation_purpose('')
              setmessage('')
              alert("Your appointment have been booked")
            } else {
              setLoading(false);
              seterrortext('Ckeck your Internet connection');
            }
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
            seterrortext('Ckeck your Internet connection');
          });
      }
      else
      {
        seterrortext('Enter Consultation Purpose')
      }
    
    } else {
      seterrortext('Enter time slot');
    }
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
        <Text style={styles.uppertext}>Appointment</Text>
        <TouchableOpacity
          style={[styles.HamburgerView, {marginRight: 20}]}
          onPress={() => navigation.navigate('ChatScreen')}>
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
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter Time Slot"
                  autoCapitalize="none"
                  keyboardType="decimal-pad"
                  value={timeSlot}
                  returnKeyType="next"
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  onChangeText={(text) => settimeSlot(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter Consultation Purpose"
                  autoCapitalize="none"
                  keyboardType='ascii-capable'
                  returnKeyType="next"
                  value={consultation_purpose}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  onChangeText={(text) => setconsultation_purpose(text)}
                />
              </View>
              <View style={[styles.inputContainer, {height: 150}]}>
                <TextInput
                  style={[styles.inputStyle, {textAlign: 'justify'}]}
                  placeholder="Enter Message (Optional)"
                  autoCapitalize="none"
                  keyboardType='ascii-capable'
                  returnKeyType="next"
                  value={message}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                  onChangeText={(text) => setmessage(text)}
                />
              </View>
              <View>
                <Text style={styles.txtstyle}>{errortext}</Text>
              </View>
              <TouchableOpacity
                onPress={() => HandleAppointment()}
                style={styles.Btndesign}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.Btntext}>Book Appointment</Text>
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

export default DoctorAppointment;

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
  inputContainer: {
    width: '100%',
    marginTop: 20,
    height: 56,
    borderWidth: 1,
    borderColor: colors.Colors.Blue,
    borderRadius: 7,
  },
  inputStyle: {
    width: '90%',
    fontFamily: fonts.fonts.PoppinsRegular,
    fontSize: 16,
  },
  innerView: {
    height: '100%',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  Btndesign: {
    backgroundColor: colors.Colors.Orange,
    width: '100%',
    height: 62,
    marginTop: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
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
});
