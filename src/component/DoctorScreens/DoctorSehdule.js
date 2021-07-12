import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const DoctorSehdule = ({navigation}) => {
  const scheduletime = [
    {
      name: 'Syed Kashan',
      age: '9:00',
    },
    {
      name: 'Parkash Kumar',
      age: '10:00',
    },
    {
      name: 'Mahad Khan',
      age: '11:00',
    },
    {
      name: 'Jawwad',
      age: '12:00',
    },
    {
      name: 'Parkash Kumar',
      age: '10:00',
    },
    {
      name: 'Mahad Khan',
      age: '11:00',
    },
    {
      name: 'Jawwad',
      age: '12:00',
    },
    {
      name: 'Parkash Kumar',
      age: '10:00',
    },
    {
      name: 'Mahad Khan',
      age: '11:00',
    },
    {
      name: 'Jawwad',
      age: '12:00',
    },
    {
      name: 'Parkash Kumar',
      age: '10:00',
    },
    {
      name: 'Mahad Khan',
      age: '11:00',
    },
    {
      name: 'Ali',
      age: '12:00',
    }
  ];
  const renderItem = ({item}) => <Item title={item.title} />;
  return (
    <View style={styles.contianer}>
      <View style={styles.uppercontainer}>
        <TouchableOpacity
          style={styles.HamburgerView}
          onPress={() => navigation.toggleDrawer()}>
          <Image
            source={require('../../../assets/Images/Hamburger.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.scheduletext}>Schedule</Text>
        <TouchableOpacity
          style={styles.messageView}
          onPress={() => navigation.navigate('chat')}>
          <Image
            source={require('../../../assets/Images/bluemessage.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, padding: 20}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#EFEFEF',
            borderRadius: 50,
            padding: 20,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../../assets/Images/calendar.png')}
                resizeMode="contain"
              />
              <Text style={styles.dateText}>From Date</Text>
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../../assets/Images/calendar.png')}
                resizeMode="contain"
              />
              <Text style={styles.dateText}>To Date</Text>
            </View>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.getButton}>
              <Text style={styles.getText}>Get</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.lowercontainer}>
        <View style={styles.lowercurvetop}>
          <View style={[styles.lowerleftcurve,{borderTopLeftRadius: 50}]}>
            <Image
              source={require('../../../assets/Images/blueclock.png')}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.lowerrightcurve,{borderTopRightRadius: 50}]}>
            <Text style={{color: colors.Colors.Blue,fontFamily:fonts.fonts.PoppinsMedium,fontSize:16}}>Patient</Text>
          </View>
        </View>
        <FlatList
          data={scheduletime}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={[styles.lowerleftcurve,{paddingTop:8,paddingBottom:8}]}>
                <Text style={{color: colors.Colors.Orange,fontFamily:fonts.fonts.PoppinsMedium,fontSize:14}}>{item.age}</Text>
              </View>
              <TouchableOpacity style={styles.lowerrightcurve} onPress={()=>console.log(item)}>
                <Text style={{color: colors.Colors.Orange,fontFamily:fonts.fonts.PoppinsMedium,fontSize:14}}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: colors.Colors.ScreenBackground,
  },
  uppercontainer: {
    height: '7%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HamburgerView: {
    height: '100%',
    justifyContent: 'center',
    marginLeft: 20,
  },
  messageView: {
    height: '100%',
    justifyContent: 'center',
    marginRight: 20,
  },
  scheduletext: {
    color: colors.Colors.Blue,
    fontSize: 18,
    fontFamily: fonts.fonts.PoppinsMedium,
  },
  getText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.fonts.PoppinsMedium,
  },
  getButton: {
    backgroundColor: colors.Colors.Orange,
    height: 60,
    width: 120,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: colors.Colors.Gray,
    fontFamily: fonts.fonts.PoppinsMedium,
    fontSize: 16,
    marginTop: 7,
  },
  lowercontainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 30,
  },
  lowercurvetop: {
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 50,
    flexDirection: 'row',
  },
  lowerleftcurve: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerrightcurve: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DoctorSehdule;
