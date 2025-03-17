import axios from 'axios';
import { SURVEY, SURVEY_PREFERENCE } from '../surveyConstants';

/**
 * 회원 정보 입력 검증 메서드드
 *
 * @param {Object} data 검증할 데이터 (nickname, gender, birthYear, dorm)
 * @returns 각 필드 별 에러 메시지
 */
export const validateMyInfo = ({ nickname, gender, age, dorm, introduce }) => {
  const errors = {};

  if (!nickname || !nickname.trim()) {
    errors.nickname = '닉네임을 입력해 주세요.';
  }
  if (nickname && nickname.length > 10) {
    errors.nickname = '닉네임의 최대 길이는 10글자 입니다.';
  }

  if (!gender) {
    errors.gender = '성별을 선택해 주세요.';
  }
  if (!age) {
    errors.birthYear = '출생년도를 선택해 주세요.';
  }
  if (!dorm) {
    errors.dorm = '기숙사 정보를 입력해 주세요.';
  }
  if (introduce && introduce.length > 60) {
    errors.introduce = '한줄 소개의 최대 길이는 60글자 입니다.';
  }
  return errors;
};

/**
 * 생활 패턴 정보 검증하는 메서드
 * 모든 설문 항목에 1개 이상 체크해야 된다.
 *
 * @param {Object} lifeStyle 선택한 생활패턴 정보
 * @returns 체크 하지 않은 설문 항목 정보
 */
export const validateLifeStyle = ({ lifeStyle }) => {
  const errors = {};
  const check = {};
  Object.keys(SURVEY)
    .filter((key) => key !== 'AGE')
    .map((key) => {
      check[key] = false;
    });

  Object.keys(lifeStyle).forEach((key) => {
    if (lifeStyle[key].length > 0) {
      check[key] = true;
    }
  });

  Object.keys(check).forEach((key) => {
    if (!check[key]) {
      errors[key] = SURVEY[key].name + ' 값을 선택해 주세요.';
    }
  });

  return errors;
};

/**
 * 선호하는 룸메메 정보 검증하는 메서드
 * 모든 설문 항목에 1개 이상 체크해야 된다.
 *
 * @param {Object} preference 선택한 생활패턴 정보
 * @returns 체크 하지 않은 설문 항목 정보
 */
export const validatePreference = ({ preference }) => {
  const errors = {};
  const check = {};
  Object.keys(SURVEY_PREFERENCE).map((key) => {
    check[key] = false;
  });

  Object.keys(preference).forEach((key) => {
    if (preference[key].length > 0) {
      check[key] = true;
    }
  });

  Object.keys(check).forEach((key) => {
    if (!check[key]) {
      errors[key] = SURVEY_PREFERENCE[key].name + ' 값을 선택해 주세요.';
    }
  });

  return errors;
};

/**
 * 사용 가능한한 닉네임인지 확인하고, boolean 값을 반환한다.
 *
 * @param {string} nickname
 * @returns 사용가능 true, 사용 불가 false
 */
export const getIsDuplicatedNicknameAsync = async (nickname) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/validate-nickname`,
      { params: { nickname: nickname } }
    );
    return response.data;
  } catch (error) {
    console.log('알림 정보 조회 실패', error);
  }
};

export const validateNickname = async (nickname) => {
  if (!nickname || !nickname.trim()) {
    return { state: false, message: '닉네임을 입력해 주세요.' };
  }
  if (nickname && nickname.length > 10) {
    return { state: false, message: '닉네임의 최대 길이는 10글자 입니다.' };
  }

  const data = await getIsDuplicatedNicknameAsync(nickname);
  console.log(data);
  if (!data) {
    return { state: false, message: '중복된 닉네임 입니다.' };
  }

  return { state: true, message: '사용 가능한 닉네임 입니다.' };
};
