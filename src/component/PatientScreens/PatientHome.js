import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { api, headers } from '../Config/env';
import DoctorList from './DoctorList';
import { useSelector } from 'react-redux';
import { createDirectory } from '../utils/directory';
import { askForPermission } from '../utils/permission';
const PatientHome = ({ navigation }) => {
  const [dataSource, setDataSource] = useState([]);
  const [Appointments, setAppointments] = useState([]);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    getDoctors();
    getAppointments();
    checkPermission()
  }, []);

  const getDoctors = () => {
    fetch(`${api}admin/find/doctor/approved`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == 1) {
          setDataSource(responseJson.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAppointments = () => {
    fetch(`${api}appointment/show`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        patientId: user.data.user._id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        if (responseJson.status == 1) {
          setAppointments(responseJson.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkPermission = async () =>{
    try {
      const res = await askForPermission()
      if(res == 'granted'){
        await createDirectory()
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.uppercontainer}>
        <TouchableOpacity
          style={styles.HamburgerView}
          onPress={() => navigation.toggleDrawer()}>
          <Image
            source={require('../../../assets/Images/Hamburger.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={[styles.rightview, { marginRight: 20 }]}>
          <View style={styles.innerrightview}>
            <Text style={styles.nametext}>{user.data.user.name}</Text>
            <View style={styles.locationView}>
              <Image
                source={require('../../../assets/Images/location.png')}
                resizeMode="contain"
                style={{ height: 18 }}
              />
              <Text style={styles.locationText}>Karachi</Text>
            </View>
          </View>
          <View style={styles.DoctorImageView}>
            <Image
              source={require('../../../assets/Images/doctor.png')}
              resizeMode="stretch"
              style={styles.DoctorImage}
            />
          </View>
        </View>
      </View>
      <View style={styles.lowercontainer}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.uppertextView}>
            <Text
              style={{
                fontFamily: fonts.fonts.PoppinsMedium,
                fontSize: 18,
                color: 'black',
              }}>
              Upcoming Appointments
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: fonts.fonts.PoppinsMedium,
                  fontSize: 16,
                  color: colors.Colors.Orange,
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '70%',
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10
            }}>
            <FlatList
              data={Appointments}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.FlatListTouchButton}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 3 }}>
                      <View style={[styles.rightview]}>
                        <View
                          style={[
                            styles.DoctorImageView,
                            { marginLeft: 10, borderColor: 'white' },
                          ]}>
                          <Image
                            source={require('../../../assets/Images/doctor.png')}
                            resizeMode="stretch"
                            style={styles.DoctorImage}
                          />
                        </View>
                        <View style={styles.innerrightview}>
                          <Text style={[styles.nametext, { color: 'white' }]}>
                            Mahad khan
                          </Text>
                          <Text
                            style={[
                              styles.nametext,
                              { fontSize: 12, color: 'white' },
                            ]}>
                            karachi
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image
                          source={require('../../../assets/Images/cross.png')}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={[
                        styles.belowButtonView,
                        { paddingLeft: 5, paddingRight: 5 },
                      ]}>
                      <TouchableOpacity style={styles.belowButton}>
                        <View
                          style={[
                            styles.bellowbuttoninnerview,
                            { width: '15%' },
                          ]}>
                          <Image
                            source={require('../../../assets/Images/clock.png')}
                            resizeMode="contain"
                          />
                        </View>
                        <View
                          style={[
                            styles.bellowbuttoninnerview,
                            { width: '85%' },
                          ]}>
                          <Text
                            style={[
                              styles.belowButtonText,
                              { marginLeft: 10 },
                            ]}>
                            Sunday
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.lowerInnerView}>
            <Text style={styles.letsfinddoctortext}>
              Let's Find Your Doctor
            </Text>
            <TouchableOpacity style={styles.finddoctorTouch}>
              <Image
                source={require('../../../assets/Images/doctorbox.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20
            }}>
            <FlatList
              data={dataSource}
              renderItem={({ item }) => (
                <DoctorList data={item} navigation={navigation} />
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default PatientHome;

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
  HamburgerView: {
    height: '100%',
    justifyContent: 'center',
    marginLeft: 20,
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
    marginLeft: 5,
    fontFamily: fonts.fonts.PoppinsMedium,
    fontSize: 14,
    color: 'black',
  },
  DoctorImageView: {
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.Colors.Blue,
  },
  DoctorImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 7,
  },
  locationText: {
    marginLeft: 3,
    fontFamily: fonts.fonts.PoppinsMedium,
    fontSize: 13,
    color: colors.Colors.Gray,
  },
  lowercontainer: {
    height: '92%',
    backgroundColor: colors.Colors.ScreenBackground,
    width: '100%',
  },
  belowButtonView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  belowButton: {
    backgroundColor: '#004DD4',
    height: 60,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 4,
  },
  belowButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.fonts.PoppinsMedium,
  },
  bellowbuttoninnerview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlatListTouchButton: {
    backgroundColor: '#136EE3',
    height: '90%',
    borderRadius: 20,
    marginRight: 20,
    elevation: 10,
    width: 320,
    padding: 7,
  },
  uppertextView: {
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
  },
  lowerInnerView: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  letsfinddoctortext: {
    marginLeft: 20,
    fontSize: 18,
    color: colors.Colors.Orange,
    fontFamily: fonts.fonts.PoppinsBold,
  },
  finddoctorTouch: {
    height: '100%',
    marginRight: 20,
    justifyContent: 'center',
  },
});
