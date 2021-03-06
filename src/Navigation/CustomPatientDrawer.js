import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { connect } from 'react-redux';

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
  navigateedit(text) {
    this.props.navigation.toggleDrawer();
    this.props.navigation.navigate(text);
  }
  logout = () => {
    try {
      this.props.removeUser(null);
      this.setState({ name: '' });
      this.props.navigation.navigate('SignInScreen');
    } catch (error) {
    }
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
            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity activeOpacity={0.8}
                style={{flex:1, flexDirection: 'row', paddingVertical: 15 }}
                onPress={() => this.props.navigation.toggleDrawer()}>
                <View style={{ height: 20, width: 20, }}>
                  <Image source={require('../../assets/Images/dashboardcircle.png')} />
                </View>
                <View>
                  <Text
                    style={{
                      marginLeft: 5,
                      color: colors.Colors.Orange,
                      fontFamily: fonts.fonts.PoppinsRegular,
                      fontSize: 14,
                    }}>
                    Close
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.randatext}>
              Account
            </Text>

            <View style={styles.nameView}>
              <View style={{ width: '85%' }}>
                <View style={[styles.rightview]}>
                  <View style={[styles.DoctorImageView, { marginLeft: 10 }]}>
                    <Image
                      source={require('../../assets/Images/doctor.png')}
                      resizeMode="stretch"
                      style={styles.DoctorImage}
                    />
                  </View>
                  <View style={styles.innerrightview}>
                    <Text style={styles.nametext}>{this.props.user.user.data.user.name}</Text>
                    <TouchableOpacity
                      style={[
                        styles.updateView,
                        { alignSelf: 'flex-start', marginLeft: 7 },
                      ]}>
                      <Text style={styles.updateText}>Update Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
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
                <Image source={item.uri} style={{ marginLeft: 18 }} />
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
                style={{ marginLeft: 18 }}
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
    flex: 1,
    backgroundColor: '#fff',
  },
  lowercontainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical:30
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
  nameView: {
    backgroundColor: colors.Colors.Blue,
    marginLeft: 20,
    marginRight: 20,
    height: 90,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 5
  },
  randatext: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 16,
    fontFamily: fonts.fonts.PoppinsRegular
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: (RemoveUser) =>
      dispatch({ type: 'REMOVE_USER', payload: RemoveUser }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomPatientDrawer);
