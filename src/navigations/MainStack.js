import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainRoutes } from './routes';
import ContentTab from './ContentTab';
import SignUpStack from './SignUpStack';
import MyInfoStack from './MyInfoStack';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={MainRoutes.SIGN_UP} component={SignUpStack} />
      <Stack.Screen name={MainRoutes.CONTENT_TAB} component={ContentTab} />
      <Stack.Screen name={MainRoutes.MY_INFO} component={MyInfoStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
