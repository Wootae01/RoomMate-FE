import { ButtonTypes } from './components/QuestionItem';

//현재 년도에 맞는 설문 항목 동적으로 생성
const generateAgeDetails = () => {
  const arr = Array.from({ length: 9 }, (_, i) => ({
    label: `${new Date().getFullYear() - 18 - i}년`,
    value: new Date().getFullYear() - 18 - i,
    id: new Date().getFullYear() - 18 - i,
  }));
  return arr;
};

export const SURVEY = {
  BED_TIME: {
    name: '취침 시간',
    details: [
      { label: '22시', value: 'AT_22', id: 101 },
      { label: '23시', value: 'AT_23', id: 102 },
      { label: '0시', value: 'AT_00', id: 103 },
      { label: '1시', value: 'AT_01', id: 104 },
      { label: '2시', value: 'AT_02', id: 105 },
      { label: '3시', value: 'AT_03', id: 106 },
    ],
    buttonType: ButtonTypes.CHECK,
  },
  WAKEUP_TIME: {
    name: '기상 시간',
    details: [
      { label: '6시', value: 'AT_06', id: 201 },
      { label: '7시', value: 'AT_07', id: 202 },
      { label: '8시', value: 'AT_08', id: 203 },
      { label: '9시', value: 'AT_09', id: 204 },
      { label: '10시', value: 'AT_10', id: 205 },
      { label: '11시', value: 'AT_11', id: 206 },
    ],
    buttonType: ButtonTypes.CHECK,
  },
  HEATING: {
    name: '난방(추위)',
    details: [
      { label: '20도 이하', value: 'BELOW_20', id: 301 },
      { label: '21~23도', value: 'FROM_21_TO_23', id: 302 },
      { label: '24~26도', value: 'FROM_24_TO_26', id: 303 },
      { label: '27도 이상', value: 'ABOVE_27', id: 304 },
    ],
    buttonType: ButtonTypes.CHECK,
  },
  COOLING: {
    name: '냉방(더위)',
    details: [
      { label: '20도 이하', value: 'BELOW_20', id: 401 },
      { label: '21~23도', value: 'FROM_21_TO_2,3', id: 402 },
      { label: '24~26도', value: 'FROM_24_TO_2,6', id: 403 },
      { label: '27도 이상', value: 'ABOVE_27', id: 404 },
    ],
    buttonType: ButtonTypes.CHECK,
  },
  SLEEP_HABIT: {
    name: '잠버릇',
    details: [
      { label: '있음', value: 'YES', id: 501 },
      { label: '없음', value: 'NO', id: 502 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  SMOKING: {
    name: '흡연',
    details: [
      { label: '비흡연자', value: 'NON_SMOKER', id: 601 },
      { label: '흡연자', value: 'SMOKER', id: 602 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  NOISE: {
    name: '소음 민감도',
    details: [
      { label: '이어폰', value: 'EARPHONES', id: 701 },
      { label: '유동적', value: 'FLEXIBLE', id: 702 },
      { label: '스피커', value: 'SPEAKERS', id: 703 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  INDOOR_CALL: {
    name: '실내 통화',
    details: [
      { label: '안함', value: 'BAN', id: 801 },
      { label: '간단히', value: 'SIMPLE', id: 802 },
      { label: '자유롭게', value: 'FREE', id: 803 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  EATING: {
    name: '실내 취식',
    details: [
      { label: '안함', value: 'BAN', id: 901 },
      { label: '과자류', value: 'SNACK', id: 902 },
      { label: '배달음식', value: 'FOOD', id: 903 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  DRINKING: {
    name: '음주 빈도',
    details: [
      { label: '비음주 (월 1회 미만)', value: 'NON_DRINKER', id: 1001 },
      { label: '가끔 (월 1~3회)', value: 'OCCASIONAL', id: 1002 },
      { label: '자주 (주 1회 이상)', value: 'FREQUENT', id: 1003 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  SCENT: {
    name: '향 민감도',
    details: [
      { label: '민감함', value: 'SENSITIVE', id: 1101 },
      { label: '보통', value: 'NORMAL', id: 1102 },
      { label: '민감하지 않음', value: 'NOT_SENSITIVE', id: 1103 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  CLEANING: {
    name: '청소 방식',
    details: [
      { label: '각자 알아서', value: 'INDIVIDUAL', id: 1201 },
      { label: '교대로', value: 'ROTATION', id: 1202 },
      { label: '룸메와 함께', value: 'TOGETHER', id: 1203 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  RELATIONSHIP: {
    name: '룸메 발전 관계',
    details: [
      { label: '투명인간', value: 'INVISIBLE', id: 1301 },
      { label: '적당히 친밀한', value: 'NORMAL', id: 1302 },
      { label: '절친', value: 'CLOSE', id: 1303 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  AGE: {
    name: '출생년도',
    details: generateAgeDetails(),
    buttonType: ButtonTypes.CHECK,
  },
};

/**
 * 선호하는 사람 설문 항목
 */
export const SURVEY_PREFERENCE = {
  BED_TIME: {
    name: '취침 시간',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 1 },
      { label: '22시', value: 'AT_22', id: 101 },
      { label: '23시', value: 'AT_23', id: 102 },
      { label: '0시', value: 'AT_00', id: 103 },
      { label: '1시', value: 'AT_01', id: 104 },
      { label: '2시', value: 'AT_02', id: 105 },
      { label: '3시', value: 'AT_03', id: 106 },
    ],
    buttonType: ButtonTypes.CHECK,
  },
  WAKEUP_TIME: {
    name: '기상 시간',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 2 },
      { label: '6시', value: 'AT_06', id: 201 },
      { label: '7시', value: 'AT_07', id: 202 },
      { label: '8시', value: 'AT_08', id: 203 },
      { label: '9시', value: 'AT_09', id: 204 },
      { label: '10시', value: 'AT_10', id: 205 },
      { label: '11시', value: 'AT_11', id: 206 },
    ],
    buttonType: ButtonTypes.CHECK,
  },
  HEATING: {
    name: '난방(추위)',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 3 },
      { label: '20도 이하', value: 'BELOW_20', id: 301 },
      { label: '21~23도', value: 'FROM_21_TO_23', id: 302 },
      { label: '24~26도', value: 'FROM_24_TO_26', id: 303 },
      { label: '27도 이상', value: 'ABOVE_27', id: 304 },
    ],
    buttonType: ButtonTypes.CHECK,
  },
  COOLING: {
    name: '냉방(더위)',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 4 },
      { label: '20도 이하', value: 'BELOW_20', id: 401 },
      { label: '21~23도', value: 'FROM_21_TO_2,3', id: 402 },
      { label: '24~26도', value: 'FROM_24_TO_2,6', id: 403 },
      { label: '27도 이상', value: 'ABOVE_27', id: 404 },
    ],
    buttonType: ButtonTypes.CHECK,
  },
  SLEEP_HABIT: {
    name: '잠버릇',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 5 },
      { label: '있음', value: 'YES', id: 501 },
      { label: '없음', value: 'NO', id: 502 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  SMOKING: {
    name: '흡연',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 6 },
      { label: '비흡연자', value: 'NON_SMOKER', id: 601 },
      { label: '흡연자', value: 'SMOKER', id: 602 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  NOISE: {
    name: '소음 민감도',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 7 },
      { label: '이어폰', value: 'EARPHONES', id: 701 },
      { label: '유동적', value: 'FLEXIBLE', id: 702 },
      { label: '스피커', value: 'SPEAKERS', id: 703 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  INDOOR_CALL: {
    name: '실내 통화',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 8 },
      { label: '안함', value: 'BAN', id: 801 },
      { label: '간단히', value: 'SIMPLE', id: 802 },
      { label: '자유롭게', value: 'FREE', id: 803 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  EATING: {
    name: '실내 취식',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 9 },
      { label: '안함', value: 'BAN', id: 901 },
      { label: '과자류', value: 'SNACK', id: 902 },
      { label: '배달음식', value: 'FOOD', id: 903 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  DRINKING: {
    name: '음주 빈도',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 10 },
      { label: '비음주 (월 1회 미만)', value: 'NON_DRINKER', id: 1001 },
      { label: '가끔 (월 1~3회)', value: 'OCCASIONAL', id: 1002 },
      { label: '자주 (주 1회 이상)', value: 'FREQUENT', id: 1003 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  SCENT: {
    name: '향 민감도',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 11 },
      { label: '민감함', value: 'SENSITIVE', id: 1101 },
      { label: '보통', value: 'NORMAL', id: 1102 },
      { label: '민감하지 않음', value: 'NOT_SENSITIVE', id: 1103 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  CLEANING: {
    name: '청소 방식',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 12 },
      { label: '각자 알아서', value: 'INDIVIDUAL', id: 1201 },
      { label: '교대로', value: 'ROTATION', id: 1202 },
      { label: '룸메와 함께', value: 'TOGETHER', id: 1203 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  RELATIONSHIP: {
    name: '룸메 발전 관계',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 13 },
      { label: '투명인간', value: 'INVISIBLE', id: 1301 },
      { label: '적당히 친밀한', value: 'NORMAL', id: 1302 },
      { label: '절친', value: 'CLOSE', id: 1303 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  AGE: {
    name: '출생년도',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 0 },
      ...generateAgeDetails(),
    ],
    buttonType: ButtonTypes.CHECK,
  },
};
