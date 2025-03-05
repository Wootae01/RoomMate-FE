import { ButtonTypes } from './components/QuestionItem';

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
    name: '나이',
    details: [
      { label: '20세', value: 'TWENTY', id: 1401 },
      { label: '21세', value: 'TWENTY_ONE', id: 1402 },
      { label: '22세', value: 'TWENTY_TWO', id: 1403 },
      { label: '23세', value: 'TWENTY_THREE', id: 1404 },
      { label: '24세', value: 'TWENTY_FOUR', id: 1405 },
      { label: '25세', value: 'TWENTY_FIVE', id: 1406 },
      { label: '26세', value: 'TWENTY_SIX', id: 1407 },
      { label: '27세', value: 'TWENTY_SEVEN', id: 1408 },
      { label: '28세', value: 'TWENTY_EIGHT', id: 1409 },
    ],
    buttonType: ButtonTypes.CHECK,
  },
};

export const SURVEY_PREFERENCE = {
  BED_TIME: {
    name: '취침 시간',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 100 },
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
      { label: '상관 없음', value: 'NO_PREF', id: 200 },
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
      { label: '상관 없음', value: 'NO_PREF', id: 300 },
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
      { label: '상관 없음', value: 'NO_PREF', id: 400 },
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
      { label: '상관 없음', value: 'NO_PREF', id: 500 },
      { label: '있음', value: 'YES', id: 501 },
      { label: '없음', value: 'NO', id: 502 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  SMOKING: {
    name: '흡연',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 600 },
      { label: '비흡연자', value: 'NON_SMOKER', id: 601 },
      { label: '흡연자', value: 'SMOKER', id: 602 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  NOISE: {
    name: '소음 민감도',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 700 },
      { label: '이어폰', value: 'EARPHONES', id: 701 },
      { label: '유동적', value: 'FLEXIBLE', id: 702 },
      { label: '스피커', value: 'SPEAKERS', id: 703 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  INDOOR_CALL: {
    name: '실내 통화',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 800 },
      { label: '안함', value: 'BAN', id: 801 },
      { label: '간단히', value: 'SIMPLE', id: 802 },
      { label: '자유롭게', value: 'FREE', id: 803 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  EATING: {
    name: '실내 취식',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 900 },
      { label: '안함', value: 'BAN', id: 901 },
      { label: '과자류', value: 'SNACK', id: 902 },
      { label: '배달음식', value: 'FOOD', id: 903 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  DRINKING: {
    name: '음주 빈도',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 1000 },
      { label: '비음주 (월 1회 미만)', value: 'NON_DRINKER', id: 1001 },
      { label: '가끔 (월 1~3회)', value: 'OCCASIONAL', id: 1002 },
      { label: '자주 (주 1회 이상)', value: 'FREQUENT', id: 1003 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  SCENT: {
    name: '향 민감도',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 1100 },
      { label: '민감함', value: 'SENSITIVE', id: 1101 },
      { label: '보통', value: 'NORMAL', id: 1102 },
      { label: '민감하지 않음', value: 'NOT_SENSITIVE', id: 1103 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  CLEANING: {
    name: '청소 방식',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 1200 },
      { label: '각자 알아서', value: 'INDIVIDUAL', id: 1201 },
      { label: '교대로', value: 'ROTATION', id: 1202 },
      { label: '룸메와 함께', value: 'TOGETHER', id: 1203 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  RELATIONSHIP: {
    name: '룸메 발전 관계',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 1300 },
      { label: '투명인간', value: 'INVISIBLE', id: 1301 },
      { label: '적당히 친밀한', value: 'NORMAL', id: 1302 },
      { label: '절친', value: 'CLOSE', id: 1303 },
    ],
    buttonType: ButtonTypes.RADIO,
  },
  AGE: {
    name: '나이',
    details: [
      { label: '상관 없음', value: 'NO_PREF', id: 1400 },
      { label: '20세', value: 'TWENTY', id: 1401 },
      { label: '21세', value: 'TWENTY_ONE', id: 1402 },
      { label: '22세', value: 'TWENTY_TWO', id: 1403 },
      { label: '23세', value: 'TWENTY_THREE', id: 1404 },
      { label: '24세', value: 'TWENTY_FOUR', id: 1405 },
      { label: '25세', value: 'TWENTY_FIVE', id: 1406 },
      { label: '26세', value: 'TWENTY_SIX', id: 1407 },
      { label: '27세', value: 'TWENTY_SEVEN', id: 1408 },
      { label: '28세', value: 'TWENTY_EIGHT', id: 1409 },
    ],
    buttonType: ButtonTypes.CHECK,
  },
};
