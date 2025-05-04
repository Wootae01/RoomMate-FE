import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NEUTRALVARIANT, PRIMARY } from '../colors';
import ChatListScreen from '../screens/ChatListScreen';
import MyInfoScreen from '../screens/MyInfoScreen';
import RecommendScreen from '../screens/RecommendScreen';
import { ContentRoutes } from './routes';

const Tab = createBottomTabNavigator();
const getTabBarIcon = ({ color, name, focused }) => {
  const iconName = focused ? name : `${name}-outline`;
  return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
};

const ContentTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={ContentRoutes.RECOMMEND}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY.DEFAULT,
        tabBarInactiveTintColor: NEUTRALVARIANT.DARK,
        tabBarStyle: {
          height: 70,
          paddingTop: 5,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIconStyle: {
          marginBottom: 3,
        },
      }}
    >
      <Tab.Screen
        name={ContentRoutes.RECOMMEND}
        component={RecommendScreen}
        options={{
          tabBarIcon: (props) =>
            getTabBarIcon({ ...props, name: 'account-details' }),
          tabBarLabel: '추천 목록',
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={ContentRoutes.CHAT_LIST}
        component={ChatListScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'chat' }),
          tabBarLabel: '채팅',
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={ContentRoutes.MY_INFO}
        component={MyInfoScreen}
        options={{
          tabBarIcon: (props) =>
            getTabBarIcon({ ...props, name: 'account-circle' }),
          tabBarLabel: '내 정보',
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default ContentTab;
