import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Linking,
} from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

class CustomPatientDrawer extends Component {
  constructor() {
    super();
    this.state = {
      items: [
        {
          navOptionName: 'Home',
          screenToNavigate: 'PatientHomeScreen',
          uri: require('../../assets/Images/home.png'),
        },
        {
          navOptionName: 'Chat History',
          screenToNavigate: 'chat',
          uri: require('../../assets/Images/chathistory.png'),
        },
      ],
    };
  }
  componentDidMount() {}

  navigateedit(text) {
    this.props.navigation.toggleDrawer();
    this.props.navigation.navigate(text);
  }
  logout = async () => {
    console.log('Logout');
  };

  render() {
    const arr = this.state.items;
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={styles.lowercontainer}>
            <View style={{width: 100, marginLeft: 20}}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => this.props.navigation.toggleDrawer()}>
                <Image
                  source={require('../../assets/Images/dashboardcircle.png')}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: colors.Colors.Orange,
                    fontFamily: fonts.fonts.PoppinsRegular,
                    fontSize: 14,
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.randatext}>
              Account
            </Text>

            <View style={styles.nameView}>
              <View style={{width: '85%'}}>
                <View style={[styles.rightview]}>
                  <View style={[styles.DoctorImageView, {marginLeft: 10}]}>
                    <Image
                      source={require('../../assets/Images/doctor.png')}
                      resizeMode="stretch"
                      style={styles.DoctorImage}
                    />
                  </View>
                  <View style={styles.innerrightview}>
                    <Text style={styles.nametext}>Syed Kashan Tayyab</Text>
                    <TouchableOpacity
                      style={[
                        styles.updateView,
                        {alignSelf: 'flex-start', marginLeft: 7},
                      ]}>
                      <Text style={styles.updateText}>Update Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{width: '15%',justifyContent:'center',alignItems:'center'}}>
              <Image
                  source={require('../../assets/Images/rightarrow.png')}
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text style={styles.randatext}>
              Records
            </Text>
            {arr.map((item, key) => (
              <TouchableOpacity
                style={styles.btnoption}
                onPress={() => {
                  this.navigateedit(item.screenToNavigate);
                }}
                key={key}>
                <Image source={item.uri} style={{marginLeft: 18}} />
                <Text style={styles.btnbelowtext}> {item.navOptionName}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.btnoption}
              onPress={() => {
                this.logout();
              }}>
              <Image
                source={require('../../assets/Images/logout.png')}
                style={{marginLeft: 18}}
              />
              <Text style={styles.btnbelowtext}> Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  lowercontainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 30,
  },
  btnoption: {
    backgroundColor: '#F5F5F5',
    height: 65,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  btnbelowtext: {
    color: 'black',
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: fonts.fonts.PoppinsRegular,
  },
  rightview: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerrightview: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nametext: {
    marginRight: 7,
    marginLeft: 8,
    fontFamily: fonts.fonts.PoppinsMedium,
    fontSize: 14,
    color: 'white',
  },
  updateView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 7,
  },
  updateText: {
    marginLeft: 3,
    fontFamily: fonts.fonts.PoppinsMedium,
    fontSize: 13,
    color: 'white',
    textDecorationLine: 'underline',
  },
  DoctorImageView: {
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: 'center'
  },
  DoctorImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  nameView:{
    backgroundColor: colors.Colors.Blue,
    marginLeft: 20,
    marginRight: 20,
    height: 90,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 5
  },
  randatext:{
    marginLeft: 20,
    marginTop: 20,
    fontSize: 16,
    fontFamily: fonts.fonts.PoppinsRegular
  }
});

export default CustomPatientDrawer;
