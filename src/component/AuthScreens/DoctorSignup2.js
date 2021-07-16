import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import color from '../../constants/colors';
import font from '../../constants/fonts';

const DoctorSignUp2 = ({navigation}) => {
  const [errortext, seterrortext] = useState('');
  const DoctorData = navigation.getParam('DoctorData');
  const [qualifications, setqualifications] = useState([
    {Degree: '', Institute: '', Editable: false},
    { Degree: '', Institute: '', Editable: false},
    {Degree: '', Institute: '', Editable: false},
  ]);
  const [experience, setexperience] = useState([
    {Designation: '', Hospital: '', Editable: false},
    {Designation: '', Hospital: '', Editable: false},
    { Designation: '', Hospital: '', Editable: false},
  ]);
  const [speaciality, setspeaciality] = useState([
    {speacialname: ''},
    {speacialname: ''},
    {speacialname: ''},
  ]);
  const addspeaciality = () => {
    const _speaciality = [...speaciality];
    _speaciality.push({speacialname: ''});
    setspeaciality(_speaciality);
  };
  const deletespeaciality = (index) => {
    const _speaciality = speaciality.filter((v, i) => i != index);
    setspeaciality(_speaciality);
  };
  const inputspeaciality = (text, index) => {
    const _speaciality = [...speaciality];
    _speaciality[index].speacialname = text;
    setspeaciality(_speaciality);
  };
  const addqualification = (key) => {
    const _qualifications = [...qualifications];
    _qualifications.push({
      Degree: '',
      Institute: '',
      Editable: false,
    });
    setqualifications(_qualifications);
  };
  const deletequalification = (index) => {
    const _qualifications = qualifications.filter((v, i) => i != index);
    setqualifications(_qualifications);
  };
  const inputqualificationdegree = (textdegree, index) => {
    const _qualifications = [...qualifications];
    _qualifications[index].Degree = textdegree;
    setqualifications(_qualifications);
    if (textdegree == '') {
      _qualifications[index].Editable = false;
      _qualifications[index].Institute = '';
    } else {
      _qualifications[index].Editable = true;
    }
  };
  const inputqualificationinstitute = (textinstitute, index) => {
    const _qualifications = [...qualifications];
    _qualifications[index].Institute = textinstitute;
    setqualifications(_qualifications);
  };
  const addexperience = (key) => {
    const _experience = [...experience];
    _experience.push({office: '', years: '', Editable: false});
    setexperience(_experience);
  };
  const deleteexperience = (index) => {
    const _experience = experience.filter((v, i) => i != index);
    setexperience(_experience);
  };
  const inputexperiencedesignation = (textdesignation, index) => {
    const _experience = [...experience];
    _experience[index].Designation = textdesignation;
    setexperience(_experience);
    if (textdesignation == '') {
      _experience[index].Editable = false;
      _experience[index].Hospital = '';
    } else {
      _experience[index].Editable = true;
    }
  };
  const inputexperincehospital = (texthospital, index) => {
    const _experience = [...experience];
    _experience[index].Hospital = texthospital;
    setexperience(_experience);
  };
  const HandleContinue = () => {
    if (qualifications[0].Degree != '' && qualifications[0].Institute != '' && qualifications[1].Degree != '' && qualifications[1].Institute != '' && qualifications[2].Degree != '' && qualifications[2].Institute != '') {
      DoctorData.DoctorSpeacility = speaciality;
      DoctorData.DoctorQualification = qualifications;
      DoctorData.DoctorExperience = experience;
      navigation.navigate('DoctorSignUp3Screen',{DoctorData})
      seterrortext('')
    } else {
      seterrortext('Three Degree are neccesary');
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
            <View style={styles.multiouterview}>
              <Text style={styles.multitext}>Speaciality</Text>
              {speaciality.map((speaciality, index) => (
                <View style={styles.multiinnerview} key={index}>
                  <TextInput
                    placeholder={'Your Speaciality'}
                    style={[styles.multitextinput, {width: '80%'}]}
                    onChangeText={(text) => inputspeaciality(text, index)}
                    value={speaciality.speacialname}
                  />
                  <TouchableOpacity
                    style={styles.multiimageview}
                    onPress={() => deletespeaciality(index)}>
                    <Image
                      source={require('../../../assets/Images/delete.png')}
                      resizeMode={'contain'}
                      style={{height: '55%'}}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={styles.addmoremultibutton}
                onPress={() => addspeaciality(speaciality.length)}>
                <Image
                  source={require('../../../assets/Images/addmore.png')}
                  resizeMode={'contain'}
                  style={{height: '70%'}}
                />
                <Text
                  style={{
                    color: color.Colors.Blue,
                    fontFamily: font.fonts.PoppinsRegular,
                    fontSize: 14,
                  }}>
                  Add more
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.multiouterview}>
              <Text style={styles.multitext}>Qualificatiions</Text>
              {qualifications.map((Qualificatiions, index) => (
                <View style={styles.multiinnerview} key={index}>
                  <TextInput
                    placeholder={'Degree'}
                    style={styles.multitextinput}
                    onChangeText={(text) =>
                      inputqualificationdegree(text, index)
                    }
                    value={Qualificatiions.Degree}
                  />
                  <TextInput
                    placeholder={'Institue'}
                    editable={Qualificatiions.Editable}
                    style={[styles.multitextinput, {marginLeft: 5}]}
                    onChangeText={(text) =>
                      inputqualificationinstitute(text, index)
                    }
                    value={Qualificatiions.Institute}
                  />

                  <TouchableOpacity
                    style={styles.multiimageview}
                    onPress={() => deletequalification(index)}>
                    <Image
                      source={require('../../../assets/Images/delete.png')}
                      resizeMode={'contain'}
                      style={{height: '55%'}}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={styles.addmoremultibutton}
                onPress={() => addqualification(qualifications.length)}>
                <Image
                  source={require('../../../assets/Images/addmore.png')}
                  resizeMode={'contain'}
                  style={{height: '70%'}}
                />
                <Text
                  style={{
                    color: color.Colors.Blue,
                    fontFamily: font.fonts.PoppinsRegular,
                    fontSize: 14,
                  }}>
                  Add more
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.multiouterview}>
              <Text style={styles.multitext}>Experience</Text>
              {experience.map((Experience, index) => (
                <View style={styles.multiinnerview} key={index}>
                  <TextInput
                    placeholder={'Designation'}
                    style={styles.multitextinput}
                    onChangeText={(text) =>
                      inputexperiencedesignation(text, index)
                    }
                    value={Experience.Designation}
                  />
                  <TextInput
                    placeholder={'Hospital'}
                    editable={Experience.Editable}
                    style={[styles.multitextinput, {marginLeft: 5}]}
                    onChangeText={(text) => inputexperincehospital(text, index)}
                    value={Experience.Hospital}
                  />
                  <TouchableOpacity
                    style={styles.multiimageview}
                    onPress={() => deleteexperience(index)}>
                    <Image
                      source={require('../../../assets/Images/delete.png')}
                      resizeMode={'contain'}
                      style={{height: '55%'}}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={styles.addmoremultibutton}
                onPress={() => addexperience(experience + 1)}>
                <Image
                  source={require('../../../assets/Images/addmore.png')}
                  resizeMode={'contain'}
                  style={{height: '70%'}}
                />
                <Text
                  style={{
                    color: color.Colors.Blue,
                    fontFamily: font.fonts.PoppinsRegular,
                    fontSize: 14,
                  }}>
                  Add more
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.txtstyle}>{errortext}</Text>
            </View>
            <TouchableOpacity
              onPress={() => HandleContinue(0)}
              style={styles.Btndesign}>
              <Text style={styles.Btntext}>Continue to Step 3</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default DoctorSignUp2;

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
  Btndesign: {
    backgroundColor: color.Colors.Orange,
    width: '100%',
    height: 62,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
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
  inputsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  multiouterview: {
    width: '100%',
    marginTop: 20,
  },
  multitext: {
    color: color.Colors.Blue,
    fontFamily: font.fonts.PoppinsBold,
    fontSize: 20,
  },
  multiinnerview: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    justifyContent: 'space-between',
  },
  multitextinput: {
    width: '40%',
    borderBottomColor: color.Colors.Blue,
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: font.fonts.PoppinsRegular,
  },
  multiimageview: {
    width: '15%',
    marginLeft: 5,
    alignItems: 'center',
    height: 40,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  addmoremultibutton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
});
