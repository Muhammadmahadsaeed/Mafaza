import { gql } from "@apollo/client";
const GET_MESSAGES = gql`
  query getMessages($senderId: String!,$receiverId: String!) {
    getMessages(senderId: $senderId,receiverId: $receiverId) {
      messageId userName senderId receiverId type messageText sendTime
      content{
        url
        time
      }
     
    }
  }
`
const SEND_MESSAGE = gql`
  mutation sendMessage($messageId: String!,$userName: String!, $senderId: String!,$receiverId: String!,$type: String!,$content: [ContentInput], $messageText: String) {
    sendMessage(messageId: $messageId,userName: $userName, senderId:$senderId, receiverId: $receiverId,type: $type,content: $content, messageText: $messageText) {
      messageId userName senderId receiverId type isSending messageText sendTime
      content{
        url
        time
      }
    }
  }
`
const NEW_MESSAGE = gql`
  subscription newMessage($senderId: String!,$receiverId: String!) {
    newMessage(senderId: $senderId,receiverId: $receiverId) {
      messageId userName senderId receiverId type isSending messageText sendTime
      content{
        url
        time
      }
    }
  }
`

const FCM_TOKEN = gql`
mutation create_firebase_token($device_id: String!, $fcm_token: String!, $user_id: String!){
    create_firebase_token(device_id: $device_id, fcm_token: $fcm_token, user_id: $user_id){
      device_id fcm_token user_id
    }
  }
`;

export {
  GET_MESSAGES,
  SEND_MESSAGE,
  NEW_MESSAGE,
  FCM_TOKEN
}