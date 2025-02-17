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

const RecommendItem = () => {
  const width = useWindowDimensions().width / 4;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.items}>
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
            <Text style={{ fontWeight: '700', fontSize: 15 }}>닉네임</Text>
            <Text
              style={{ fontSize: 13 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              한줄소개한줄소개dddddd
            </Text>
          </View>
        </Pressable>

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
