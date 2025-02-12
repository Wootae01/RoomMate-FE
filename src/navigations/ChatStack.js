import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WHITE } from '../colors';
import ChatListScreen from '../screens/ChatListScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import { ChatRoutes, ContentRoutes } from './routes';

const Stack = createNativeStackNavigator();
const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: WHITE } }}
    >
      <Stack.Screen name={ContentRoutes.CHAT_LIST} component={ChatListScreen} />
      <Stack.Screen
        name={ChatRoutes.CHAT_ROOM}
        component={ChatRoomScreen}
        options={({ route }) => ({ title: route.params?.nickname || '닉네임' })} //상대 닉네임 받아서 title로 설정
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
