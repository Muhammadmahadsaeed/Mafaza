import React from 'react';
import {
    View,
    Text
  } from 'react-native';

const PatientSehdule = ({navigation}) => {
  return (
       <View style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',flex:1}}>
        <Text style={{color:'white',fontSize:22}} onPress={()=>navigation.toggleDrawer()}>I am Patient Sehdule </Text>
       </View>
  );
};

export default PatientSehdule;
