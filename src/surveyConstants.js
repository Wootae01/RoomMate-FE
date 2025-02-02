export const SURVEY = {
  BED_TIME: {
    name: '취침 시간',
    details: [
      { label: '22시', value: 'AT_22' },
      { label: '23시', value: 'AT_23' },
      { label: '0시', value: 'AT_00' },
      { label: '1시', value: 'AT_01' },
      { label: '2시', value: 'AT_02' },
      { label: '3시', value: 'AT_03' },
    ],
  },
  WAKEUP_TIME: {
    name: '기상 시간',
    details: [
      { label: '6시', value: 'AT_06' },
      { label: '7시', value: 'AT_07' },
      { label: '8시', value: 'AT_08' },
      { label: '9시', value: 'AT_09' },
      { label: '10시', value: 'AT_10' },
      { label: '11시', value: 'AT_11' },
    ],
  },
  HEATING: {
    name: '난방(추위)',
    details: [
      { label: '20도 이하', value: 'BELOW_20' },
      { label: '21~23도', value: 'FROM_21_TO_23' },
      { label: '24~26도', value: 'FROM_24_TO_26' },
      { label: '27도 이상', value: 'ABOVE_27' },
    ],
  },
  COOLING: {
    name: '냉방(더위)',
    details: [
      { label: '20도 이하', value: 'BELOW_20' },
      { label: '21~23도', value: 'FROM_21_TO_23' },
      { label: '24~26도', value: 'FROM_24_TO_26' },
      { label: '27도 이상', value: 'ABOVE_27' },
    ],
  },
  SLEEP_HABIT: {
    name: '잠버릇',
    details: [
      { label: '있음', value: 'YES' },
      { label: '없음', value: 'NO' },
    ],
  },
  SMOKING: {
    name: '흡연',
    details: [
      { label: '비흡연자', value: 'NON_SMOKER' },
      { label: '흡연자', value: 'SMOKER' },
    ],
  },
  NOISE: {
    name: '소음 민감도',
    details: [
      { label: '이어폰', value: 'EARPHONES' },
      { label: '유동적', value: 'FLEXIBLE' },
      { label: '스피커', value: 'SPEAKERS' },
    ],
  },
  INDOOR_CALL: {
    name: '실내 통화',
    details: [
      { label: '안함', value: 'BAN' },
      { label: '간단히', value: 'SIMPLE' },
      { label: '자유롭게', value: 'FREE' },
    ],
  },
  EATING: {
    name: '실내 취식',
    details: [
      { label: '안함', value: 'BAN' },
      { label: '과자류', value: 'SNACK' },
      { label: '배달음식', value: 'FOOD' },
    ],
  },
  DRINKING: {
    name: '음주 빈도',
    details: [
      { label: '비음주 (월 1회 미만)', value: 'NON_DRINKER' },
      { label: '가끔 (월 1~3회)', value: 'OCCASIONAL' },
      { label: '자주 (주 1회 이상)', value: 'FREQUENT' },
    ],
  },
  SCENT: {
    name: '향 민감도',
    details: [
      { label: '민감함', value: 'SENSITIVE' },
      { label: '보통', value: 'NORMAL' },
      { label: '민감하지 않음', value: 'NOT_SENSITIVE' },
    ],
  },
  CLEANING: {
    name: '청소 방식',
    details: [
      { label: '각자 알아서', value: 'INDIVIDUAL' },
      { label: '교대로', value: 'ROTATION' },
      { label: '룸메와 함께', value: 'TOGETHER' },
    ],
  },
  RELATIONSHIP: {
    name: '룸메 발전 관계',
    details: [
      { label: '투명인간', value: 'INVISIBLE' },
      { label: '적당히 친밀한', value: 'NORMAL' },
      { label: '절친', value: 'CLOSE' },
    ],
  },
  AGE: {
    name: '나이',
    details: [
      { label: '20세', value: 'TWENTY' },
      { label: '21세', value: 'TWENTY_ONE' },
      { label: '22세', value: 'TWENTY_TWO' },
      { label: '23세', value: 'TWENTY_THREE' },
      { label: '24세', value: 'TWENTY_FOUR' },
      { label: '25세', value: 'TWENTY_FIVE' },
      { label: '26세', value: 'TWENTY_SIX' },
      { label: '27세', value: 'TWENTY_SEVEN' },
      { label: '28세', value: 'TWENTY_EIGHT' },
    ],
  },
};
