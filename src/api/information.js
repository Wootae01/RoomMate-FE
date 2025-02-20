import axios from "axios";







export const signUp = async (memberData) => {
    try {
        const response = await axios.post(
            `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/signup`,  // singupController로 전송송
            memberData,
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        console.log("회원가입 폼 전달에 대한 백엔드 응답:", response.data);
        return response;

    } catch (axiosError) {
        console.error("회원가입 폼 전달에 대한 백엔드 요청 실패:", axiosError.response?.data || axiosError.message);
    }
};
