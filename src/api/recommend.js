import api from './api';

/**
 * 추천 목록 가져오는 api 요청
 *
 * @param {number} userId
 * @return 추천 목록 리스트 정보 반환
 */
export const getRecommendList = async (userId) => {
  try {
    const response = await api.get(`/members/${userId}/recommendation`);
    return response.data;
  } catch (error) {
    console.log('Failed to get recommendationList: ', error);
    throw error;
  }
};

export const getFilteredMember = async (memberId, filterCond) => {
  try {
    const response = await api.post(
      `/members/${memberId}/recommendation`,
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
