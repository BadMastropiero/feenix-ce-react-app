import { useEffect, useState } from 'react';

import Navbar from '../components/navbar/navbar';
import { useAuth } from '../contexts/auth';
import Messages from '../modules/chat/application/messages';
import Sender from '../modules/chat/application/sender';
import { Message } from '../modules/chat/domain/types';
import Login from '../modules/login/application/login';
import { StyledContent } from './App.styles';

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const auth = useAuth();

  useEffect(() => {
    if (!auth?.user) {
      setMessages([]);
    }
  }, [auth]);

  return (
    <>
      <Navbar />
      <StyledContent>
        {auth?.user ? (
          <>
            <Messages messages={messages} setMessages={setMessages} />
            <Sender setMessages={setMessages} />
          </>
        ) : (
          <Login />
        )}
      </StyledContent>
    </>
  );
}

export default Chat;
