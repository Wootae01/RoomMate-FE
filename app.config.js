import 'dotenv/config';

export default {
  expo: {
    name: 'roommate',
    slug: 'roommate',
    owner: 'roommate',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      runtimeVersion: {
        policy: 'appVersion', // iOS 런타임 버전 설정 추가
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.kimwootae.roommatefe',
      runtimeVersion: '1.0.0', // Android 런타임 버전 설정 추가
    },
    web: {
      favicon: './assets/favicon.png',
    },
    updates: {
      url: 'https://u.expo.dev/2e6b94a7-3a72-452c-8e7e-6492d6cbbfc8', // 프로젝트 ID 기반 URL 추가
    },
    plugins: [
      'expo-updates', // EAS Update를 사용하기 위해 추가
      [
        'expo-build-properties',
        {
          android: {
            extraMavenRepos: [
              'https://devrepo.kakao.com/nexus/content/groups/public/',
            ],
          },
        },
      ],
      [
        '@react-native-kakao/core',
        {
          nativeAppKey: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY,
          android: {
            authCodeHandlerActivity: true,
          },
          ios: {
            handleKakaoOpenUrl: true,
          },
        },
      ],
    ],
    extra: {
      eas: {
        projectId: '2e6b94a7-3a72-452c-8e7e-6492d6cbbfc8',
      },
    },
  },
};
