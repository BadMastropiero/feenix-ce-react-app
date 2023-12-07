import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';

import { SocketContext } from '../../../contexts/socket.io';
import { Message } from '../domain/types';

const StyledMessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 85%;
  width: 100%;
  margin-top: ${(p) => p.theme.layout.vGap};
`;

const StyledMessages = styled.div`
  //height: 100%;
  width: 100%;
  overflow-y: auto;
  padding-right: ${(p) => p.theme.layout.hGap};

  ol {
    margin-left: calc(${(p) => p.theme.layout.vGap} * 4);
  }
`;

const StyledMessage = styled.div<{ $received: boolean }>`
  padding: ${(p) => p.theme.layout.vGap} ${(p) => p.theme.layout.hGap};
  border-radius: ${(p) => p.theme.borderRadius.base};
  box-shadow: ${(p) => p.theme.shadows.base};
  background-color: ${(props) =>
    !props.$received
      ? props.theme.colors.secondary.base
      : props.theme.colors.lighter.base};
  color: ${(props) =>
    !props.$received
      ? props.theme.colors.secondary.contrast
      : props.theme.colors.lighter.contrast};
  margin-bottom: ${(p) => p.theme.layout.vGap};
`;

const StyledMessageText = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSeparator = styled.div`
  display: flex;
  flex-direction: column;
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.lighter.bg};
  margin-top: calc(${(p) => p.theme.layout.vGap} * 2);
  margin-bottom: ${(p) => p.theme.layout.vGap};
`;

const StyledMessageDate = styled.time`
  display: flex;
  flex-direction: column;
  font-size: ${(p) => p.theme.fontSizes.xs};
`;

interface Props {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

const Messages = ({ messages, setMessages }: Props) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    socket.on('message', (data: Message) => {
      setMessages((messages) => {
        const newMessages = structuredClone(messages);
        const existing = newMessages.find((msg) => msg.id === data.id);
        if (existing) {
          existing.text += data.text;
        } else {
          newMessages.push(data);
        }
        return newMessages;
      });
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  return (
    <StyledMessagesWrapper>
      <StyledMessages>
        {messages.map((message, index) => (
          <StyledMessage key={index} $received={message.user?.id === 'chatbot'}>
            <StyledMessageText>
              <Markdown>{message.text}</Markdown>
            </StyledMessageText>
            <StyledSeparator />
            <StyledMessageDate>
              {message.createdAt && new Date(message.createdAt).toLocaleString()}
            </StyledMessageDate>
          </StyledMessage>
        ))}
      </StyledMessages>
    </StyledMessagesWrapper>
  );
};

export default Messages;
