import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import tinycolor from 'tinycolor2';
import { BLACK, PRIMARY, WHITE } from '../colors';

const Button = ({ title, onPress, customStyles, icon }) => {
  const backgroundColor =
    customStyles?.button?.backgroundColor || PRIMARY.DEFAULT;
  const darkColor = tinycolor(backgroundColor).darken(10).toString();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        defaultStyles.button,
        { backgroundColor },
        customStyles?.button,
        pressed && { backgroundColor: darkColor },
      ]}
    >
      <View style={[defaultStyles.content, customStyles?.content]}>
        {icon?.left && (
          <MaterialCommunityIcons
            name={icon.name}
            size={icon.size || 24}
            color={icon.color || BLACK}
            style={icon.style || { marginRight: 8 }}
          />
        )}
        <Text style={[defaultStyles.title, customStyles?.title]}>{title}</Text>
        {icon?.right && (
          <MaterialCommunityIcons
            name={icon.name}
            size={icon.size || 24}
            color={icon.color || BLACK}
            style={icon.style || { marginLeft: 8 }}
          />
        )}
      </View>
    </Pressable>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  customStyles: PropTypes.object,
  icon: PropTypes.shape({
    left: PropTypes.bool, // 텍스트 왼쪽 아이콘 여부
    right: PropTypes.bool, // 텍스트 오른쪽 아이콘 여부
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    style: PropTypes.object,
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
    width: '100%',
  },
  title: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
  },
});

export default Button;
