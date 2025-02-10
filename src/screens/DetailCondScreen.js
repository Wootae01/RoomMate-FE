import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BLACK, PALETTES, PRIMARY, WHITE } from '../colors';
import Button from '../components/Button';
import CheckBox from '../components/CheckBox';
import TextButton from '../components/TextButton';
import { SURVEY } from '../surveyConstants';
{
  /** 상세 필터 화면
   * surveyKey: 설문 key 값
   */
}
const DetailCondScreen = ({ visible, onClose, surveyKey }) => {
  const [selectedFilter, setSelectedFilter] = useState(surveyKey);
  const flatListRef = useRef(null);

  // 부모 surveyKey 값이 바뀌면 selectedFilter 업데이트
  useEffect(() => {
    setSelectedFilter(surveyKey);
  }, [surveyKey]);

  // selectedFilter가 바뀔 때마다 FlatList의 해당 항목으로 스크롤
  useEffect(() => {
    const keys = Object.keys(SURVEY);
    const index = keys.findIndex((key) => key === selectedFilter);
    if (index >= 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  }, [selectedFilter]);

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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', padding: 10 }}>
              필터
            </Text>
            <Pressable
              onPress={onClose}
              style={{ marginRight: 10 }}
              hitSlop={10}
            >
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </Pressable>
          </View>

          <View style={defaultStyles.innerContainer}>
            <FlatList
              ref={flatListRef}
              data={Object.entries(SURVEY)}
              keyExtractor={([key]) => key}
              renderItem={({ item: [key, { name }] }) => (
                <View>
                  <TextButton
                    key={key}
                    text={name}
                    onPress={() => {
                      setSelectedFilter(key);
                    }}
                    customStyles={{
                      content: {
                        backgroundColor: WHITE,
                        borderBottomWidth: 1,
                        marginRight: 2,
                        borderBottomColor:
                          selectedFilter === key
                            ? PRIMARY.DEFAULT
                            : PALETTES.NEUTRALVARIANT[80],
                        width: 90,
                        paddingVertical: 5,
                        alignItems: 'center',
                      },
                      text: {
                        color: selectedFilter === key ? PRIMARY.DEFAULT : BLACK,
                        fontSize: 12,
                        fontWeight: selectedFilter ? '700' : '500',
                      },
                    }}
                  />
                </View>
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              getItemLayout={(data, index) => ({
                length: 90,
                offset: 90 * index,
                index,
              })}
            />
            <View style={defaultStyles.checkBoxContainer}>
              {SURVEY[selectedFilter] && SURVEY[selectedFilter].details ? (
                Object.values(SURVEY[selectedFilter].details).map(
                  ({ label }, index) => (
                    <CheckBox
                      customStyles={{
                        container: {
                          flexDirection: 'row',
                          margin: 10,
                          width: '44%',
                          alignItems: 'center',
                        },
                        text: {
                          fontSize: 14,
                        },
                      }}
                      name={label}
                      key={index}
                      size={26}
                    />
                  )
                )
              ) : (
                <Text>필터 항목이 없습니다.</Text>
              )}
            </View>
          </View>
          <View
            style={{
              bottom: 0,
              right: 0,
              left: 0,
              position: 'absolute',
              padding: 20,
            }}
          >
            <Button title="검색하기" onPress={() => {}} customStyles={{}} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

DetailCondScreen.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  surveyKey: PropTypes.string.isRequired,
};

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    flexDirection: 'column',
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
  checkBoxContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DetailCondScreen;
