import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { BLACK, PALETTES, WHITE } from '../colors';

export const MessageType = {
  MY_MESSAGE: 'MyMessage', //내 메시지 형식
  OTHER_MESSAGE: 'OtherMessage', //상대 메시지 형식
};

const Message = ({ messageType }) => {
  return (
    <View
      style={[
        defaultStyles.container,
        messageType === MessageType.MY_MESSAGE //내 메시지는 오른쪽, 상대 메시지는 왼쪽에 나오도록 한다.
          ? { alignSelf: 'flex-end' }
          : { alignSelf: 'flex-start' },
      ]}
    >
      {messageType === MessageType.MY_MESSAGE && ( //내 메시지는 시간이 왼쪽에 나오도록 한다.
        <Text style={defaultStyles.time}>00:31</Text>
      )}

      <Text
        style={
          messageType === MessageType.MY_MESSAGE
            ? defaultStyles.myMessage
            : defaultStyles.otherMessage
        }
      >
        아 뭔가 좀 아쉬운데 뭐가 아쉬운지 모르겠네
      </Text>
      {messageType === MessageType.OTHER_MESSAGE && ( //상대 메시지는 시간이 오른쪽에 나오도록 한다
        <Text style={defaultStyles.time}>00:31</Text>
      )}
    </View>
  );
};

Message.propTypes = {
  messageType: PropTypes.oneOf(Object.values(MessageType)).isRequired,
};

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  time: {
    fontSize: 12,
  },
  myMessage: {
    borderRadius: 15,
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 5,
    backgroundColor: PALETTES.PRIMARY[40],
    color: WHITE,
    fontWeight: '600',
    maxWidth: '67%',
  },
  otherMessage: {
    borderRadius: 15,
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: PALETTES.NEUTRALVARIANT[90],
    color: BLACK,
    fontWeight: '600',
    maxWidth: '70%',
  },
});
export default Message;
