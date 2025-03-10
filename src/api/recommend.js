import axios from 'axios';

/**
 * 추천 목록 가져오는 api 요청
 *
 * @param {number} userId
 * @return 추천 목록 리스트 정보 반환
 */
export const getRecommendList = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/${userId}/recommendation`
    );
    return response.data;
  } catch (error) {
    console.log('Failed to get recommendationList: ', error);
    throw error;
  }
};

export const getFilteredMember = async (memberId, filterCond) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/${memberId}/recommendation`,
      { cond: filterCond },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data;
  } catch (error) {
    console.log('Failed to get FilteredMember: ', error);
    throw error;
  }
};
