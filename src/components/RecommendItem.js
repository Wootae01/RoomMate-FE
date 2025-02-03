import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Button from './Button';
import { WHITE } from '../colors';
import DefaultProfile from './DefaultProfile';

const RecommendItem = () => {
  const width = useWindowDimensions().width / 4;
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <DefaultProfile />
        <View style={[styles.content, { width: width * 2 - 15 }]}>
          <Text style={{ fontWeight: '700', fontSize: 15 }}>닉네임</Text>
          <Text style={{ fontSize: 13 }} numberOfLines={1} ellipsizeMode="tail">
            한줄소개한줄소dddddd
          </Text>
        </View>
        <Button
          title="채팅"
          onPress={() => {}}
          icon={{ name: 'chat', color: WHITE, size: 18 }}
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

  content: {},
});

export default RecommendItem;
