import React from 'react';
import {
  View,
  Text, StyleSheet
} from 'react-native';

const RecentChats = ({ navigation }) => {
  const goToChatRoom = () => {
    navigation.navigate('ChatRoomScreen')
  }
  return (
    <View style={{ backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text style={{ color: 'white', fontSize: 22 }} onPress={() => goToChatRoom()}>Recent chat here</Text>
    </View>
  );
};

export default RecentChats;


const styles = StyleSheet.create({

})