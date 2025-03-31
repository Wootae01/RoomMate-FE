import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { PRIMARY, WHITE } from '../colors';

export const DORMS = {
  //기숙사 정보
  GAE_SUNG_JAE: {
    name: '개성재',
    MALE: [
      { label: '진리관', value: 'JINLI' },
      { label: '정의관', value: 'JEONGUI' },
    ],
    FEMALE: [
      { label: '개척관', value: 'GAECHUCK' },
      { label: '계양원', value: 'GAEYANG' },
    ],
  },
  YANG_SUNG_JAE: {
    name: '양성재',
    MALE: [
      { label: '신민관', value: 'SINMIN' },
      { label: '명덕관', value: ' MYEONGDEOK' },
    ],
    FEMALE: [{ label: '지선관', value: ' JISUN' }],
  },
  YANG_JIN_JAE: {
    name: '양진재',
    MALE: [{ label: '인의관', value: 'INUI' }],
    FEMALE: [{ label: '예지관', value: 'YEJI' }],
  },

  YANG_HYEON_JAE: {
    name: '양현재',
    MALE: [{ label: '양현재', value: 'YANGHYEON' }],
    FEMALE: [{ label: '양현재', value: 'YANGHYEON' }],
  },
};

const DormDropDown = ({ detailValue, setDetailValue, gender }) => {
  const [dormOpen, setDormOpen] = useState(false);
  const [dormValue, setDormValue] = useState(null); //처음 선택한 기숙사
  const [dormItems] = useState(getDormItems());

  const [detailOpen, setDetailOpen] = useState(false);
  const [detaliItems, setDetailItems] = useState([
    { label: '기숙사를 먼저 선택해 주세요', value: null },
  ]);

  const handleDormChange = (value) => {
    if (!gender) {
      Alert.alert('경고', '기숙사를 선택하기 전에 성별을 먼저 선택해 주세요.');
      return;
    }
    setDormValue(value);
  };

  // 부모에서 전달받은 detailValue가 변경될 때 dormValue와 세부 목록을 동기화
  useEffect(() => {
    if (detailValue) {
      const dormKey = getDorm(detailValue, gender);
      if (dormKey) {
        setDormValue(dormKey);
      }
    }
  }, [detailValue, gender]);

  //선택한 기숙사 변경되면 그 세부 목록도 바뀜.
  //부모에서 detailValue를 전달 받아 dormValue 값이 바뀌었다면, detailValue null로 초기화 안함
  useEffect(() => {
    if (dormValue) {
      const newDetailItems = getDetailItems(dormValue, gender);
      setDetailItems(newDetailItems);

      if (!newDetailItems.find((item) => item.value === detailValue)) {
        setDetailValue(null);
      }
    }
  }, [dormValue, setDetailValue, detailValue, gender]);

  return (
    <View style={styles.container}>
      <View style={styles.dropDwonWrapper}>
        <DropDownPicker
          listMode="SCROLLVIEW"
          open={dormOpen}
          value={dormValue}
          items={dormItems}
          setOpen={setDormOpen}
          setValue={handleDormChange}
          placeholder="기숙사"
          style={styles.dropdown}
          selectedItemLabelStyle={{ color: WHITE }}
          selectedItemContainerStyle={{ backgroundColor: PRIMARY.DEFAULT }}
          dropDownContainerStyle={styles.dropdownContainer}
          showTickIcon={false}
          zIndex={2000}
          listItemLabelStyle={{ paddingVertical: 1 }}
        />
      </View>

      <View style={styles.dropDwonWrapper}>
        <DropDownPicker
          listMode="SCROLLVIEW"
          open={detailOpen}
          value={detailValue}
          items={detaliItems}
          setOpen={setDetailOpen}
          setValue={setDetailValue}
          placeholder="기숙사 세부 목록"
          style={styles.dropdown}
          selectedItemLabelStyle={{ color: WHITE }}
          selectedItemContainerStyle={{ backgroundColor: PRIMARY.DEFAULT }}
          dropDownContainerStyle={styles.dropdownContainer}
          showTickIcon={false}
          zIndex={1000}
        />
      </View>
    </View>
  );
};

DormDropDown.propTypes = {
  detailValue: PropTypes.string,
  setDetailValue: PropTypes.func,
  gender: PropTypes.oneOf(['MALE', 'FEMALE', '']),
};

const getDormItems = () =>
  Object.entries(DORMS).map(([key, value]) => ({
    label: value.name,
    value: key,
  }));

const getDetailItems = (dormKey, gender) =>
  DORMS[dormKey]?.[gender] || ['기숙사를 먼저 선택해 주세요'];

export const getDorm = (value, gender) => {
  for (const key in DORMS) {
    const details = DORMS[key]?.[gender];
    for (let i = 0; i < details.length; i++) {
      if (details[i].value === value) {
        return key;
      }
    }
  }
  return undefined;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: 'row',
  },
  dropDwonWrapper: {
    flex: 1,
    margin: 5,
  },
  dropdown: {
    backgroundColor: WHITE,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginTop: -55,
    marginBottom: 10,
  },
  dropdownContainer: {
    backgroundColor: WHITE,
    marginTop: -60,
    maxHeight: 160,
  },
});

export default DormDropDown;
