import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from '../screens/ChatListScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import { ChatRoutes, ContentRoutes } from './routes';

const Stack = createNativeStackNavigator();
const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ContentRoutes.CHAT_LIST} component={ChatListScreen} />
      <Stack.Screen name={ChatRoutes.CHAT_ROOM} component={ChatRoomScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
