import { useNavigation } from '@react-navigation/native';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { PALETTES, PRIMARY, WHITE } from '../colors';
import { ChatRoutes, MainRoutes } from '../navigations/routes';
import DefaultProfile from './DefaultProfile';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import NotificationContext from '../contexts/NotificationContext';

const ChatItem = ({ data }) => {
  const width = useWindowDimensions().width / 4;
  const navigation = useNavigation();
  const { chatRoomId, nickname, message, updatedTime } = data;
  const { notification, setNotification } = useContext(NotificationContext);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && { backgroundColor: PALETTES.NEUTRALVARIANT[90] },
      ]}
      onPress={() => {
        setNotification((prev) => {
          const { [chatRoomId]: _removed, ...rest } = prev;
          return rest;
        });
        navigation.navigate(MainRoutes.CHAT_STACK, {
          screen: ChatRoutes.CHAT_ROOM,
          params: { nickname: `${nickname}`, chatRoomId },
        });
      }}
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

      {/**알림 수, 최근 채팅 시간 */}
      <View style={styles.rightContainer}>
        {notification[chatRoomId]?.count > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {notification[chatRoomId].count}
            </Text>
          </View>
        ) : null}
        <View style={styles.timeContainer}>
          <Text style={{ fontSize: 12, fontWeight: '400' }}>
            {new Date(updatedTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
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
  timeContainer: {},
  rightContainer: {
    justifyContent: 'flex-end',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  badge: {
    backgroundColor: PRIMARY.DEFAULT,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  badgeText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: 12,
  },
});

export default ChatItem;
