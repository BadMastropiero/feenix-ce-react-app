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

  const Authenticate = () => {
    if (auth?.user) {
      return (
        <>
          <Messages messages={messages} setMessages={setMessages} />
          <Sender setMessages={setMessages} />
          <History />
        </>
      );
    }

    if (auth?.createRegister) return <Register />;

    return <Login />;
  };

  return (
    <>
      <Navbar />
      <StyledContent>
        <Authenticate />
      </StyledContent>
    </>
  );
}

export default Chat;
