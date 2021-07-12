import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image,ActivityIndicator} from 'react-native';
import color from '../../constants/colors'

const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.navigate('AuthScreens');
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
    backgroundColor: color.Colors.White
  },
});
