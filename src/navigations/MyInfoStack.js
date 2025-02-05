import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WHITE } from '../colors';
import MyInfoScreen from '../screens/MyInfoScreen';
import LifeStyleUpdateScreen from '../screens/update/LifeStyleUpdateScreen';
import MyInfoUpdateScreen from '../screens/update/MyInfoUpdateScreen';
import PreferenceUpdateScreen from '../screens/update/PreferenceUpdateScreen';
import { MyInfoRoutes } from './routes';

const Stack = createNativeStackNavigator();

{
  /** 내 정보 화면 네비게이션 스택 */
}
const MyInfoStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 19,
          fontWeight: '600',
        },

        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name={MyInfoRoutes.MY_INFO_SCREEN}
        component={MyInfoScreen}
      />
      <Stack.Screen
        name={MyInfoRoutes.MY_INFO_UPDATE}
        component={MyInfoUpdateScreen}
        options={{ title: '회원 정보 수정' }}
      />
      <Stack.Screen
        name={MyInfoRoutes.LIFE_STYLE}
        component={LifeStyleUpdateScreen}
        options={{ title: '생활패턴 정보 수정' }}
      />
      <Stack.Screen
        name={MyInfoRoutes.PREFERENCE}
        component={PreferenceUpdateScreen}
        options={{ title: '선호하는 룸메 수정' }}
      />
    </Stack.Navigator>
  );
};

export default MyInfoStack;
