import { getKeyHashAndroid } from "@react-native-kakao/core";
import { login } from "@react-native-kakao/user";
import axios from "axios";

export const kakaoLogin = async () => {
  try {
    getKeyHashAndroid().then(console.log);
    const result = await login();

    console.log("URL", process.env.EXPO_PUBLIC_API_BASE_URL)
    console.log("카카오 로그인 성공!", result);

    const accessToken = result.accessToken;
    console.log("Access Token:", accessToken);

    // 🛠 axios 요청 확인을 위해 try-catch 블록을 추가
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/kakao/callback`,
        { accessToken: accessToken },
        {
          headers: {
            "Content-Type": "application/json", // 💡 JSON 형식으로 명시
          },
        }
      );

      console.log("백엔드 응답:", response.data);
      return response;
    } catch (axiosError) {
      console.error("백엔드 요청 실패:", axiosError.response?.data || axiosError.message);
    }
  } catch (error) {
    console.log("KaKao login error:", error.message);
  }
};
