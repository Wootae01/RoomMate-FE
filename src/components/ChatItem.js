import {
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  Pressable,
} from 'react-native';
import { PALETTES } from '../colors';
import DefaultProfile from './DefaultProfile';

const ChatItem = () => {
  const width = useWindowDimensions().width / 4;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && { backgroundColor: PALETTES.NEUTRALVARIANT[90] },
      ]}
    >
      <View style={styles.items}>
        <DefaultProfile />
        {/** 닉네임, 최근 채팅 내역 */}
        <View style={[styles.content, { width: width * 2 - 15 }]}>
          <Text style={{ fontWeight: '700', fontSize: 15 }}>닉네임</Text>
          <Text style={{ fontSize: 13 }} numberOfLines={1} ellipsizeMode="tail">
            한줄소개한줄소dddddd
          </Text>
        </View>
      </View>

      {/** 최근 채팅 시간 */}
      <View style={styles.timeContainer}>
        <Text style={{ fontSize: 12, fontWeight: '400' }}>오후 12:30</Text>
      </View>
    </Pressable>
  );
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
  content: {},
  timeContainer: {
    justifyContent: 'center',
  },
});

export default ChatItem;
