import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Button from './Button';
import { WHITE } from '../colors';

const RecommendItem = () => {
  const width = useWindowDimensions().width / 4;
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <View style={styles.iconBackground}>
          <MaterialCommunityIcons name="account" size={40} color="black" />
        </View>
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
  container: {
    alignItems: 'center',
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconBackground: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  content: {},
});

export default RecommendItem;
