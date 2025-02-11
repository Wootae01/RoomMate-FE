import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OtherUserScreen from '../screens/OtherUserScreen';
import RecommendScreen from '../screens/RecommendScreen';
import { ContentRoutes, RecommendRoutes } from './routes';

const Stack = createNativeStackNavigator();

const RecommendStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{}}
      initialRouteName={ContentRoutes.RECOMMEND}
    >
      <Stack.Screen
        name={ContentRoutes.RECOMMEND}
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
