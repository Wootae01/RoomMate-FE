import { StyleSheet, Text, View } from 'react-native';
import DefaultProfile from './DefaultProfile';
import Message, { MessageType } from './Message';

{
  /** 상대 채팅 메시지*/
}
const OtherMessage = () => {
  return (
    <View style={defaultStyles.container}>
      <DefaultProfile size={30} />
      <View style={defaultStyles.content}>
        <Text style={defaultStyles.nickname}>닉네임</Text>
        <Message messageType={MessageType.OTHER_MESSAGE} />
      </View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    marginLeft: 8,

    flexWrap: 'wrap',
  },
  nickname: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 15,
  },
});

export default OtherMessage;
