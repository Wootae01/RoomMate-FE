// NotificationHandler.js
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { useCallback, useContext, useEffect, useRef } from 'react';
import ActiveChatRoomContext from '../contexts/ActiveChatRoomContext';
import NotificationContext from '../contexts/NotificationContext';
import UserContext from '../contexts/UserContext';
import { ChatRoutes, MainRoutes, SignRoutes } from '../navigations/routes';

const NotificationHandler = () => {
  const { notification, setNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const { activeChatRoomId } = useContext(ActiveChatRoomContext);
  const notificationRef = useRef();
  const navigation = useNavigation();
  const notificationListener = useRef();
  const responseListener = useRef();
  const hasHandledInitial = useRef(false); //알림 처리 유무 확인
  const checkInitialNotification = useCallback(async () => {
    const response = await Notifications.getLastNotificationResponseAsync();

    if (hasHandledInitial.current) return; //이미 처리했으면 동작 안함
    hasHandledInitial.current = true;

    if (response) {
      console.log('초기 알림 응답:', JSON.stringify(response));
      const content = response.notification.request.content;
      const chatRoomId = content.data?.chatRoomId;
      Notifications.dismissAllNotificationsAsync();
      if (chatRoomId) {
        user.userId
          ? navigation.navigate(MainRoutes.CHAT_STACK, {
              screen: ChatRoutes.CHAT_ROOM,
              params: { nickname: content.title, chatRoomId },
            })
          : navigation.navigate(MainRoutes.SIGN_UP, {
              screen: SignRoutes.SIGN_IN,
            });
      }
    }
  }, [navigation, user]);

  //채팅방 알림 설정
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async (notification) => {
        console.log('notification: ', notification);
        let data = notification?.request?.content?.dataString;
        data = JSON.parse(data);
        const chatRoomId = data.chatRoomId;
        console.log('chatRoomId: ', chatRoomId);
        console.log('activeChatRoomId: ', activeChatRoomId);
        if (chatRoomId && chatRoomId == activeChatRoomId) {
          console.log('같음');
          return {
            shouldShowAlert: false,
            shouldPlaySound: false,
            shouldSetBadge: false,
          };
        }
        console.log('다름');
        return {
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        };
      },
    });
  }, [activeChatRoomId]);

  useEffect(() => {
    checkInitialNotification();
  }, [checkInitialNotification]);

  useEffect(() => {
    notificationRef.current = notification;
  }, [notification]);

  useEffect(() => {
    // 포그라운드 알림 처리
    notificationListener.current =
      Notifications.addNotificationReceivedListener((response) => {
        console.log('채팅 알림', JSON.stringify(response));
        const chatRoomId = response.request.content.data.chatRoomId;
        const lastId = notificationRef.current[chatRoomId]?.lastIdentifier;
        console.log('lastId= ', lastId);

        Notifications.dismissNotificationAsync(lastId);

        if (chatRoomId) {
          const identifier = response.request.identifier;

          console.log('identifier= ', identifier);
          setNotification((prev) => ({
            ...prev,
            [chatRoomId]: {
              count: (prev[chatRoomId]?.count || 0) + 1,
              lastIdentifier: identifier,
            },
          }));
        } else {
          console.log('알림에 chatRoomId 데이터가 없습니다.', response);
        }
      });

    //상호작용 시 알림 처리
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(JSON.stringify(response));

        const content = response?.notification?.request?.content;
        const chatRoomId = content.data?.chatRoomId;

        Notifications.dismissAllNotificationsAsync();
        if (chatRoomId) {
          setNotification((prev) => {
            const { [chatRoomId]: _removed, ...rest } = prev;
            return rest;
          });

          navigation.navigate(MainRoutes.CHAT_STACK, {
            screen: ChatRoutes.CHAT_ROOM,
            params: { nickname: content.title, chatRoomId },
          });
        } else {
          console.log('알림에 chatRoomId 데이터가 없습니다.', response);
        }
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [setNotification, navigation]);

  return null;
};

export default NotificationHandler;
