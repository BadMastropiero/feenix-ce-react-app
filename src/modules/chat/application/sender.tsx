import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import { StyledButton } from '../../../components/botton.styles';
import { StyledArea, StyledForm } from '../../../components/input.styles';
import { SocketContext } from '../../../contexts/socket.io';
import { Message } from '../domain/types';

interface Props {
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

const Sender = ({ setMessages }: Props) => {
  const socket = useContext(SocketContext);
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
        const msg: Message = {
          text: message,
          user: {
            name: 'Me',
            id: '1',
          },
          createdAt: new Date(),
        };
        socket?.emit('message', msg);
        setMessages((messages) => [...messages, msg]);
        setMessage('');
      }}
    >
      <StyledArea value={message} onChange={(event) => setMessage(event.target.value)} />
      <StyledButton>Send</StyledButton>
    </StyledForm>
  );
};

export default Sender;
