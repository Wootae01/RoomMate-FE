import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatStack from './ChatStack';
import ContentTab from './ContentTab';
import MyInfoStack from './MyInfoStack';
import RecommendStack from './RecommendStack';
import { MainRoutes } from './routes';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={MainRoutes.CONTENT_TAB} component={ContentTab} />
      <Stack.Screen name={MainRoutes.MY_INFO} component={MyInfoStack} />
      <Stack.Screen
        name={MainRoutes.RECOMMEND_STACK}
        component={RecommendStack}
      />
      <Stack.Screen name={MainRoutes.CHAT_STACK} component={ChatStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
