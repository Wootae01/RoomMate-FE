import axios from 'axios';

/**
 * 회원정보 수정 시 회원정보 전달하는 api 요청
 *
 * @param {JSON} memberData
 * @param {number} memberId
 * @param {Json} memberprofile
 * @param {Json} memberlifestlye
 * @param {Json} memberpreference
 * @return "success" : "true"
 */


export const editProfile = async (memberprofile, memberId) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/${memberId}/editprofile`, // membercontroller로 전송
      memberprofile,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log('Member profile 수정 전달에 대한 백엔드 응답:', response.data);
    return response.data;
  } catch (axiosError) {
    console.error(
      'Member profile 전달에 대한 백엔드 요청 실패:',
      axiosError.response?.data || axiosError.message
    );
  }
};

export const editLifeStyle = async (memberlifestyle, memberId) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/${memberId}/editlifestyle`, // membercontroller로 전송
        memberlifestyle,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      console.log('Member LifeStlye 수정 전달에 대한 백엔드 응답:', response.data);
      return response.data;
    } catch (axiosError) {
      console.error(
        'Member LifeStlye 수정 전달에 대한 백엔드 요청 실패:',
        axiosError.response?.data || axiosError.message
      );
    }
  };

  export const editPreference = async (memberpreference, memberId) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/members/${memberId}/editpreference`, // membercontroller로 전송
        memberpreference,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      console.log('Member Preference 수정 전달에 대한 백엔드 응답:', response.data);
      return response.data;
    } catch (axiosError) {
      console.error(
        'Member Preference 수정 전달에 대한 백엔드 요청 실패:',
        axiosError.response?.data || axiosError.message
      );
    }
  };
