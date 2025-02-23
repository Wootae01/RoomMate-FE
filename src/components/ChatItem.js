import { useNavigation } from '@react-navigation/native';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { PALETTES } from '../colors';
import { ChatRoutes, MainRoutes } from '../navigations/routes';
import DefaultProfile from './DefaultProfile';
import PropTypes from 'prop-types';

const ChatItem = ({ data }) => {
  const width = useWindowDimensions().width / 4;
  const navigation = useNavigation();
  const { chatRoomId, nickname, message, updatedTime } = data;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && { backgroundColor: PALETTES.NEUTRALVARIANT[90] },
      ]}
      onPress={() =>
        navigation.navigate(MainRoutes.CHAT_STACK, {
          screen: ChatRoutes.CHAT_ROOM,
          params: { nickname: `${nickname}`, chatRoomId },
        })
      }
    >
      <View style={styles.items}>
        <DefaultProfile />
        {/** 닉네임, 최근 채팅 내역 */}
        <View style={[styles.content, { width: width * 2 - 15 }]}>
          <Text style={{ fontWeight: '700', fontSize: 15 }}>{nickname}</Text>
          <Text style={{ fontSize: 13 }} numberOfLines={1} ellipsizeMode="tail">
            {message}
          </Text>
        </View>
      </View>

      {/** 최근 채팅 시간 */}
      <View style={styles.timeContainer}>
        <Text style={{ fontSize: 12, fontWeight: '400' }}>
          {new Date(updatedTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </Pressable>
  );
};

ChatItem.propTypes = {
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  content: { paddingHorizontal: 10 },
  timeContainer: {
    justifyContent: 'center',
  },
});

export default ChatItem;
