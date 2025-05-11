import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const ActiveChatRoomContext = createContext();

export const ActiveChatRoomProvider = ({ children }) => {
  const [activeChatRoomId, setActiveChatRoomId] = useState(null);

  return (
    <ActiveChatRoomContext.Provider
      value={{ activeChatRoomId, setActiveChatRoomId }}
    >
      {children}
    </ActiveChatRoomContext.Provider>
  );
};
ActiveChatRoomProvider.propTypes = {
  children: PropTypes.node,
};

export default ActiveChatRoomContext;
