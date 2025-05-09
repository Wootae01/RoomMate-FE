import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WHITE } from '../colors';
import LifeStyleSurveyScreen from '../screens/LifeStyleSurveyScreen';
import MyInfoSurveyScreen from '../screens/MyInfoSurveyScreen';
import PreferenceSurveyScreen from '../screens/PreferenceSurveyScreen';
import SignInScreen from '../screens/SignInScreen';
import { SignRoutes } from './routes';

const Stack = createNativeStackNavigator();
const SignUpStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 19,
          fontWeight: '600',
        },
        headerBackVisible: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name={SignRoutes.SIGN_IN}
        component={SignInScreen}
        options={{ title: '로그인' }}
      />
      <Stack.Screen
        name={SignRoutes.PROFILE_SURVEY}
        component={MyInfoSurveyScreen}
        options={{ title: '회원 정보 입력', unmountOnBlur: false }}
      />
      <Stack.Screen
        name={SignRoutes.LIFESTLYE_SURVEY}
        component={LifeStyleSurveyScreen}
        options={{ title: '나의 생활 패턴', unmountOnBlur: false }}
      />
      <Stack.Screen
        name={SignRoutes.PREFERENCE_SURVEY}
        component={PreferenceSurveyScreen}
        options={{ title: '선호하는 룸메', unmountOnBlur: false }}
      />
    </Stack.Navigator>
  );
};

export default SignUpStack;
