import PropTypes from 'prop-types';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BLACK, WHITE } from '../colors';
import { SURVEY } from '../surveyConstants';
import TextButton from './TextButton';

{
  /** 상세 필터 화면 */
}
const DetailCond = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={defaultStyles.container}>
        <Pressable style={defaultStyles.background} onPress={onClose} />
        <View style={defaultStyles.content}>
          <Text style={{ fontSize: 15, fontWeight: '700', padding: 10 }}>
            필터
          </Text>

          <FlatList
            data={Object.entries(SURVEY)}
            keyExtractor={([key]) => key}
            renderItem={({ item: [key, { name }] }) => (
              <View>
                <TextButton
                  key={key}
                  text={name}
                  onPress={() => {}}
                  customStyles={{
                    content: {
                      backgroundColor: WHITE,
                      borderBottomWidth: 1,
                      width: 90,
                      paddingVertical: 5,
                      alignItems: 'center',
                    },
                    text: { color: BLACK, fontSize: 10, fontWeight: '700' },
                  }}
                />
              </View>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <Text>test</Text>
        </View>
      </View>
    </Modal>
  );
};

DetailCond.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  background: {
    ...StyleSheet.absoluteFill,
    backgroundColor: BLACK,
    opacity: 0.3,
  },
  content: {
    backgroundColor: WHITE,
    height: '55%',
  },
});

export default DetailCond;
