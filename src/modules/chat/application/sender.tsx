import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import { StyledButton } from '../../../components/botton.styles';
import { StyledArea, StyledForm } from '../../../components/input.styles';
import { useAuth } from '../../../contexts/auth';
import { SocketContext } from '../../../contexts/socket.io';
import { Message } from '../domain/types';

interface Props {
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

const Sender = ({ setMessages }: Props) => {
  const socket = useContext(SocketContext);
  const auth = useAuth();
  const [message, setMessage] = useState<string>('');
  const [greeted, setGreeted] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on('hello_back', () => {
      setGreeted(true);
    });

    if (!greeted) {
      socket.emit('hello', '');
    }
    socket.off('hello');
  }, [socket]);

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        if (!auth.user) return;

        const baseMsg = {
          text: message,
          createdAt: new Date(),
        };
        const msg: Message = {
          ...baseMsg,
          user: {
            name: auth.user.firstName,
            id: auth.user.userId,
          },
        };
        socket?.emit('message', baseMsg);
        setMessages((messages) => [...messages, msg]);
        setMessage('');
      }}
    >
      <StyledArea value={message} onChange={(event) => setMessage(event.target.value)} />
      <StyledButton>Send</StyledButton>
      <StyledButton
        type="button"
        onClick={() => {
          socket?.emit('hello', '');
        }}
      >
        New
      </StyledButton>
    </StyledForm>
  );
};

export default Sender;
