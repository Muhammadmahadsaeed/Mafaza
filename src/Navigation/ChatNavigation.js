import { createStackNavigator,TransitionPresets } from 'react-navigation-stack';
import * as ChatScreens from '../component/Chats'

const ChatNavigator = createStackNavigator({

  RecentChatScreen: {
    screen: ChatScreens.RecentChats,
    navigationOptions: {
      headerShown: false
    }
  },
  ChatRoomScreen: {
    screen: ChatScreens.ChatRoom,
    navigationOptions: {
      headerShown: false
    }
  },
},{
  defaultNavigationOptions: {
    ...TransitionPresets.SlideFromRightIOS,
  },
});

export default ChatNavigator;