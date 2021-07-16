import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator, Platform
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { api, headers } from '../Config/env';
import { useSelector } from 'react-redux';

const DoctorProfile = ({ navigation }) => {
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
      if (consultation_purpose != '') {
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
            message: message
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
      else {
        seterrortext('Enter Consultation Purpose')
      }

    } else {
      seterrortext('Enter time slot');
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>
          <View style={styles.dropDownView}>
            <View style={{...(Platform.OS == 'ios' && {zIndex: 10 })}}>
              <DropDownPicker
                items={[
                  { label: 'Mafaza Patient', value: 'Mafaza Patient' },
                  { label: 'Personal Patient', value: 'Personal Patient' },
                  { label: 'Both', value: 'Both' },
                ]}
                placeholder="Select Patient Category"
                selectedLabelStyle={{ color: 'black' }}
                placeholderStyle={{ color: '#9EA0A4' }}
                style={styles.dropDownStyle}
                containerStyle={styles.dropDownContainer}
                itemStyle={styles.dropDownItemStyle}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={(item) => setPatientType(item.value)}
              />
            </View>
            <View style={{...(Platform.OS == 'ios' && {zIndex: 10})}}>
              <DropDownPicker
                items={[
                  { label: 'Mafaza Patient', value: 'Mafaza Patient' },
                  { label: 'Personal Patient', value: 'Personal Patient' },
                  { label: 'Both', value: 'Both' },
                ]}
                placeholder="Select Patient Category"
                selectedLabelStyle={{ color: 'black' }}
                placeholderStyle={{ color: '#9EA0A4' }}
                style={styles.dropDownStyle}
                containerStyle={styles.dropDownContainer}
                itemStyle={styles.dropDownItemStyle}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={(item) => setPatientType(item.value)}
              />
            </View>
          </View>

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
          <View style={[styles.inputContainer, { height: 150 }]}>
            <TextInput
              style={styles.textArea}
              placeholder="Enter Message (Optional)"
              autoCapitalize="none"
              keyboardType='ascii-capable'
              returnKeyType="next"
              multiline={true}
              numberOfLines={10}
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
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFBFB',
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.Colors.Blue,
    borderRadius: 7,
  },
  inputStyle: {
    fontFamily: fonts.fonts.PoppinsRegular,
    fontSize: 16,
    paddingHorizontal: 10
  },
  textArea: {
    fontFamily: fonts.fonts.PoppinsRegular,
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: 'justify',
    justifyContent: "flex-start",
    textAlignVertical: 'top'
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
  dropDownView:{
    flex:1,
    flexDirection:'row',
    backgroundColor: 'red', 
    marginTop: 20,
  },
  dropDownContainer:{
    width:'50%',
    flexDirection:'column'
  },
  dropDownStyle: {
    backgroundColor: '#fafafa',
    borderColor: colors.Colors.Blue,
    borderRadius: 4,
    color: '#000',
  },
  dropDownItemStyle: {
    justifyContent: 'flex-start',
  }
});
