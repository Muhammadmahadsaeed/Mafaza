import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import color from '../../constants/colors';
import {useSelector} from 'react-redux';

const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      if (user) {
        if (user.Role == 'PATIENT') {
          navigation.navigate('PatientHomeScreen');
        } else if (user.Role == 'DOCTOR') {
          navigation.navigate('DoctorHomeScreen');
        }
      } else {
        navigation.navigate('AuthScreens');
      }
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Images/logo.png')}
        style={{width: '60%', height: 300, resizeMode: 'contain'}}
      />
      <ActivityIndicator size="large" color={color.Colors.Blue} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.Colors.White,
  },
});
