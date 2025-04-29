import api from './api';

/**
 * 추천 목록 가져오는 api 요청
 *
 * @param {number} userId
 * @return 추천 목록 리스트 정보 반환
 */
export const getRecommendList = async (userId) => {
  try {
    const response = await api.get(`/recommendations/${userId}/basic`);
    return response.data;
  } catch (error) {
    console.log('Failed to get recommendationList: ', error);
    throw error;
  }
};

/**
 * 유사도 순으로 추천 목록 가져오는 api 요청
 *
 * @param {number} userId
 * @return 유사도 순으로 정렬된 추천 목록 리스트 정보 반환
 */
export const getSimilarityList = async (userId) => {
  try {
    const response = await api.get(`/recommendations/${userId}/similarity`);
    return response.data;
  } catch (error) {
    console.log('Failed to get similarityList: ', error);
    throw error;
  }
};


export const getFilteredMember = async (memberId, filterCond) => {
  try {
    const response = await api.post(
      `/recommendations/${memberId}/filter`,
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
