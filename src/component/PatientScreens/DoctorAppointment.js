import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import {api, headers} from '../Config/env';
import {useSelector} from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { color } from 'react-native-reanimated';

const DoctorProfile = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [userSelectedDay, setUserSelectedDay] = useState('');
  const [userSelectedTime, setUserSelectedTime] = useState('');
  const [message, setmessage] = useState('');
  const [errortext, seterrortext] = useState('');
  const [day, setDay] = useState(false); //open dropdown for days
  const [time, setTime] = useState(false); //open dropdown for time
  const [showDays, setShowDays] = useState([]); //arr for showing days
  const [selectTime, setSelectedTime] = useState([]); //arr for showing selected time against day
  const [data, setData] = useState([]); //arr for get all data from api
  const user = useSelector((state) => state.user.user);
  const DoctorData = navigation.getParam('doctorData');
  const [Appointments, setAppointments] = useState([]);
  const [date, setDate] = useState();

  const getTimeSlot = async (Dates) => {
    setDate(Dates);
    setData([])
    await fetch(`${api}appointment/check_date_wise_slot`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        // doctorId: DoctorData._id,
        doctorId: '60efc2076627c50efc476baa',
        date: Dates,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        getDayFromUser(json.data[0].day)
        
        // const day = json.data.map((res) => {
        //   return {label: res.day, value: res.day};
        // });
        // setShowDays(day);
      })
      .catch((err) => console.log(err));
  };

  const getDayFromUser = (item) => {
    // setUserSelectedDay(item);
    console.log(data);
    const time = [];
    data.filter((res) => {
      if (res.day == item) {
        res.slots.map((result) => {
          let slots = {
            label: result.from + ' to ' + result.to,
            value: result.from + ' to ' + result.to,
          };
          time.push(slots);
        });
      }
    });
    // console.log(time);
    setSelectedTime(time);
  };

  const submitAppointment = () => {
    seterrortext('');
    const slot = userSelectedTime.split(' to ');
    let slotObj = {
      from: slot[0],
      to: slot[1],
    };

    // if(name == '' && contactNum == '' && userSelectedDay == ''){

    // }
    // if (timeSlot != '') {
    //   if (consultation_purpose != '') {
    setLoading(true);
    fetch(`${api}appointment/add`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        date: '1-6-2021',
        timeSlot: slotObj,
        name: name,
        phone_no: contactNum,
        consultation_purpose: message,
        patientId: user.data.user._id,
        doctorId: DoctorData._id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status == 1) {
          setLoading(false);
          setName('');
          setContactNum('');
          setmessage('');
          alert('Your appointment have been booked');
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
    //   }
    //   else {
    //     seterrortext('Enter Consultation Purpose')
    //   }

    // } else {
    //   seterrortext('Enter time slot');
    // }
  };
  const openDayDropDown = () => {
    setDay(true);
    setTime(false);
    // setSelectedTime([])
  };
  const openTimeDropDown = () => {
    setTime(true);
    setDay(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView enabled>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter your contact no"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              value={contactNum}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              onChangeText={(text) => setContactNum(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter your name"
              autoCapitalize="none"
              keyboardType="ascii-capable"
              returnKeyType="next"
              value={name}
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <DatePicker
            style={styles.DatePicker}
            date={date}
            minDate={new Date()}
            mode="date"
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            onDateChange={(date)=>getTimeSlot(date)}
            format="YYYY-MM-DD"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 5,
                marginLeft: 0,
              },
              dateInput: {
                borderWidth: 0,
                marginLeft: 40,
                alignItems: 'flex-start',
              },
            }}
          />

          {/* <View style={styles.dropDownView}>
            <View
              style={{...(Platform.OS == 'ios' && {zIndex: 10}), width: '48%'}}>
              <DropDownPicker
                items={showDays}
                placeholder="Select Day"
                selectedLabelStyle={styles.dropDownSelectedLabelStyle}
                placeholderStyle={styles.dropDownPlaceholderStyle}
                style={styles.dropDownStyle}
                itemStyle={styles.dropDownItemStyle}
                isVisible={day}
                onOpen={() => openDayDropDown()}
                onClose={() => setDay(false)}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={(item) => getDayFromUser(item.value)}
              />
            </View> */}
            <View
              style={{...(Platform.OS == 'ios' && {zIndex: 10}), width: '100%',marginTop:20}}>
              <DropDownPicker
                items={selectTime}
                placeholder="Select Time"
                selectedLabelStyle={styles.dropDownSelectedLabelStyle}
                placeholderStyle={styles.dropDownPlaceholderStyle}
                style={styles.dropDownStyle}
                isVisible={time}
                onOpen={() => openTimeDropDown()}
                onClose={() => setTime(false)}
                itemStyle={styles.dropDownItemStyle}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={(item) => setUserSelectedTime(item.value)}
              />
            </View>
          {/* </View> */}

          <View style={[styles.inputContainer, {height: 150}]}>
            <TextInput
              style={styles.textArea}
              placeholder="Enter Message (Optional)"
              autoCapitalize="none"
              keyboardType="ascii-capable"
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
            activeOpacity={0.8}
            onPress={() => submitAppointment()}
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
    paddingHorizontal: 10,
  },
  textArea: {
    fontFamily: fonts.fonts.PoppinsRegular,
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: 'justify',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
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
  dropDownView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dropDownContainer: {
    width: '50%',
    flexDirection: 'column',
  },
  dropDownStyle: {
    backgroundColor: '#fafafa',
    borderColor: colors.Colors.Blue,
    borderRadius: 4,
    color: '#000',
  },
  dropDownItemStyle: {
    justifyContent: 'flex-start',
  },
  dropDownSelectedLabelStyle: {
    color: 'gray',
    fontSize: 12,
    fontFamily: fonts.fonts.PoppinsRegular,
  },
  dropDownPlaceholderStyle: {
    fontSize: 12,
    fontFamily: fonts.fonts.PoppinsRegular,
    color: 'gray',
  },
  DatePicker: {
    borderColor: colors.Colors.Blue,
    borderRadius: 7,
    borderWidth: 1,
    marginTop: 20,
    width: '100%',
    height:50
  },
});
