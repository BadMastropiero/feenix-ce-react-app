import { useEffect, useState } from 'react';

import Navbar from '../components/navbar/navbar';
import { useAuth } from '../contexts/auth';
import History from '../modules/chat/application/history';
import Messages from '../modules/chat/application/messages';
import Sender from '../modules/chat/application/sender';
import { Message } from '../modules/chat/domain/types';
import Login from '../modules/login/application/login';
import Register from '../modules/register/application/register';
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
        {auth?.user && (
          <>
            <Messages messages={messages} setMessages={setMessages} />
            <Sender setMessages={setMessages} />
            <History />
          </>
        )}

        {!auth.user && auth?.createRegister && <Register />}
        {!auth.user && !auth?.createRegister && <Login />}
      </StyledContent>
    </>
  );
}

export default Chat;
