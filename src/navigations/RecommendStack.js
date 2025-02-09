import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OtherUserScreen from '../screens/OtherUserScreen';
import RecommendScreen from '../screens/RecommendScreen';
import { RecommendRoutes } from './routes';

const Stack = createNativeStackNavigator();

const RecommendStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{}}
      initialRouteName={RecommendRoutes.RECOMMEND_SCREEN}
    >
      <Stack.Screen
        name={RecommendRoutes.RECOMMEND_SCREEN}
        component={RecommendScreen}
      />
      <Stack.Screen
        name={RecommendRoutes.OTHER_USER}
        component={OtherUserScreen}
        options={{ title: '상대 프로필' }}
      />
    </Stack.Navigator>
  );
};

export default RecommendStack;
