import { Dispatch, SetStateAction, useContext, useState } from 'react';
import styled from 'styled-components';

import { SocketContext } from '../../../contexts/socket.io';
import { Message } from '../domain/types';

const StyledButton = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.layout.vGap} ${(p) => p.theme.layout.hGap};
  border-radius: ${(p) => p.theme.borderRadius.base};
  box-shadow: ${(p) => p.theme.shadows.base};
  background-color: ${(props) => props.theme.colors.primary.base};
  color: ${(props) => props.theme.colors.primary.contrast};

  &:hover {
    cursor: pointer;
    box-shadow: ${(p) => p.theme.shadows.hover};
    background-color: ${(props) => props.theme.colors.primary.highlight};
  }
`;

const StyledInput = styled.input`
  all: unset;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.layout.vGap} ${(p) => p.theme.layout.hGap};
  border-radius: ${(p) => p.theme.borderRadius.base};
  box-shadow: ${(p) => p.theme.shadows.base};
  background-color: ${(props) => props.theme.colors.lighter.base};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  padding: ${(p) => p.theme.layout.vGap} 0;
  width: 100%;
  gap: ${(p) => p.theme.layout.vGap};
`;

interface Props {
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

const Sender = ({ setMessages }: Props) => {
  const socket = useContext(SocketContext);

  const [message, setMessage] = useState<string>('');

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
      <StyledInput value={message} onChange={(event) => setMessage(event.target.value)} />
      <StyledButton>Send</StyledButton>
    </StyledForm>
  );
};

export default Sender;
