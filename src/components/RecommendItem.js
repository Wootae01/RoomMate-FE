import { useNavigation } from '@react-navigation/native';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { PALETTES, WHITE } from '../colors';
import { ChatRoutes, MainRoutes, RecommendRoutes } from '../navigations/routes';
import Button from './Button';
import DefaultProfile from './DefaultProfile';
import PropTypes from 'prop-types';

const RecommendItem = ({ memberId, nickname, introduce }) => {
  const width = useWindowDimensions().width / 4;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        {/**디폴트 프로필, 닉네임, 한줄소개 영역 */}
        <Pressable
          onPress={() =>
            navigation.navigate(MainRoutes.RECOMMEND_STACK, {
              screen: RecommendRoutes.OTHER_USER,
            })
          }
          style={({ pressed }) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
            pressed && { backgroundColor: PALETTES.NEUTRALVARIANT[90] },
          ]}
        >
          <DefaultProfile />
          <View style={[styles.content, { width: width * 2 - 15 }]}>
            <Text style={{ fontWeight: '700', fontSize: 15 }}>{nickname}</Text>
            <Text
              style={{ fontSize: 13 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {introduce}
            </Text>
          </View>
        </Pressable>

        {/**채팅 버튼 영역 */}
        <Button
          title="채팅"
          onPress={() => {
            navigation.navigate(MainRoutes.CHAT_STACK, {
              screen: ChatRoutes.CHAT_ROOM,
            });
          }}
          icon={{ left: true, name: 'chat', color: WHITE, size: 18 }}
          customStyles={{
            button: {
              width: width,
              paddingHorizontal: 10,
              margin: 10,
              paddingVertical: 10,
            },
            title: {
              fontSize: 14,
            },
          }}
        />
      </View>
    </View>
  );
};

RecommendItem.propTypes = {
  memberId: PropTypes.number,
  nickname: PropTypes.string,
  introduce: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {},
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  content: { paddingHorizontal: 10 },
});

export default RecommendItem;
