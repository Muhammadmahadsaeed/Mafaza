import React, {useEffect, useState} from 'react';
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

const DoctorHome = ({navigation}) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => setDataSource(json));
  }, []);

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
        <View style={[styles.rightview, {marginRight: 20}]}>
          <View style={styles.innerrightview}>
            <Text style={styles.nametext}>Syed Kashan Tayyab</Text>
            <View style={styles.locationView}>
              <Image
                source={require('../../../assets/Images/location.png')}
                resizeMode="contain"
                style={{height: 18}}
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
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.uppertextView}>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: fonts.fonts.PoppinsMedium,
                  fontSize: 18,
                  color: colors.Colors.Blue,
                }}>
                Upcoming Schedule
              </Text>
            </TouchableOpacity>
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
              paddingTop: 10,
            }}>
            <FlatList
              data={dataSource}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.FlatListTouchButton}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                      <View style={[styles.rightview]}>
                        <View
                          style={[styles.DoctorImageView, {marginLeft: 10,borderColor: colors.Colors.Orange}]}>
                          <Image
                            source={require('../../../assets/Images/doctor.png')}
                            resizeMode="stretch"
                            style={styles.DoctorImage}
                          />
                        </View>
                        <View style={styles.innerrightview}>
                          <Text style={styles.nametext}>
                            Syed Kashan Tayyab
                          </Text>
                          <View
                            style={[
                              styles.locationView,
                              {alignSelf: 'flex-start', marginLeft: 6},
                            ]}>
                            <Image
                              source={require('../../../assets/Images/orangelocation.png')}
                              resizeMode="contain"
                              style={{height: 18}}
                            />
                            <Text
                              style={[
                                styles.locationText,
                                {color: colors.Colors.Orange},
                              ]}>
                              Karachi
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <TouchableOpacity style={{alignItems: 'center'}}>
                        <Image
                          source={require('../../../assets/Images/cross.png')}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{flex: 1}}>
                    <View
                      style={[
                        styles.belowButtonView,
                        {paddingLeft: 5, paddingRight: 5},
                      ]}>
                      <TouchableOpacity style={styles.belowButton}>
                        <View
                          style={[
                            styles.bellowbuttoninnerview,
                            {width: '15%'},
                          ]}>
                          <Image
                            source={require('../../../assets/Images/clock.png')}
                            resizeMode="contain"
                          />
                        </View>
                        <View
                          style={[
                            styles.bellowbuttoninnerview,
                            {width: '85%'},
                          ]}>
                          <Text
                            style={[styles.belowButtonText, {marginLeft: 10}]}>
                            Sunday 6-Jan 2022
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
        <View style={{flex: 1}}>
          <Text style={styles.OtherappointmentText}>
            See Other Appointments
          </Text>
          <View style={styles.ViewfortwoButton}>
            <TouchableOpacity
              style={[
                styles.TouchButton,
                {backgroundColor: '#FEE4D2', marginLeft: 20},
              ]}>
              <Image
                source={require('../../../assets/Images/pastapointment.png')}
                resizeMode="contain"
                style={{height: '40%'}}
              />
              <Text
                style={{
                  color: '#FD872C',
                  fontSize: 16,
                  fontFamily: fonts.fonts.PoppinsRegular,
                }}>
                Past Appointments
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.TouchButton,
                {backgroundColor: '#FFDDDD', marginLeft: 10, marginRight: 20},
              ]}>
              <Image
                source={require('../../../assets/Images/cancelapointment.png')}
                resizeMode="contain"
                style={{height: '40%'}}
              />
              <Text
                style={{
                  color: '#FF4238',
                  fontSize: 16,
                  fontFamily: fonts.fonts.PoppinsRegular,
                }}>
                Cancel Appointments
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.belowButtonView}>
            <TouchableOpacity style={styles.belowButton}>
              <View style={[styles.bellowbuttoninnerview, {width: '85%'}]}>
                <Text style={[styles.belowButtonText, {marginLeft: 10}]}>
                  Payments
                </Text>
              </View>
              <View style={[styles.bellowbuttoninnerview, {width: '15%'}]}>
                <Image
                  source={require('../../../assets/Images/rightarrow.png')}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default DoctorHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.Colors.ScreenBackground,
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
  lowercontainer: {
    height: '92%',
    backgroundColor: colors.Colors.ScreenBackground,
    width: '100%',
  },
  TouchButton: {
    borderRadius: 10,
    marginRight: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  OtherappointmentText: {
    marginLeft: 20,
    fontFamily: fonts.fonts.PoppinsMedium,
    fontSize: 16,
    color: '#000',
  },
  ViewfortwoButton: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  belowButtonView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  belowButton: {
    backgroundColor: colors.Colors.Orange,
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
    backgroundColor: 'white',
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
    marginLeft: 20
  },
});