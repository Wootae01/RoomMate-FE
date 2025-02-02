import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types'; // 수정된 부분
import { BLACK, PRIMARY, WHITE } from '../colors';
import tinycolor from 'tinycolor2';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const Button = ({ title, onPress, customStyles, icon }) => {
  const backgroundColor =
    customStyles?.button?.backgroundColor || PRIMARY.DEFAULT;
  const darkColor = tinycolor(backgroundColor).darken(10).toString();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        defaultStyles.button,
        { backgroundColor }, // 기본 배경색 적용
        customStyles?.button,
        pressed && { backgroundColor: darkColor }, // 눌렀을 때 색상 변경
      ]}
    >
      <View style={defaultStyles.content}>
        {icon && (
          <MaterialCommunityIcons
            name={icon.name}
            size={icon.size || 24}
            color={icon.color || BLACK}
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={[defaultStyles.title, customStyles?.title]}>{title}</Text>
      </View>
    </Pressable>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  customStyles: PropTypes.object,
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
  }),
};

const defaultStyles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY.DEFAULT,
    borderRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
  },
});

export default Button;
