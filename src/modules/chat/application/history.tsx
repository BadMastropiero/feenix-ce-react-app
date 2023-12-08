/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { API_ENDPOINT } from '../../../config';
import { SocketContext } from '../../../contexts/socket.io';
import { HistoryItem } from '../domain/types';

const StyledHistoryWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin-top: ${(p) => p.theme.layout.vGap};
  transform: translateY(calc(-100% + 30px));
  transition: transform 0.3s ${(p) => p.theme.easings.base};

  &:hover {
    transform: translateY(0);
  }
`;

const StyledHistory = styled.div`
  background-color: ${(props) => props.theme.colors.lighter.base};
  width: 100%;
  overflow-y: auto;
  padding: ${(p) => p.theme.layout.hGap};
  border-radius: ${(p) => p.theme.borderRadius.base};
  display: flex;
  flex-direction: column;
  z-index: 100;

  ol {
    margin-left: calc(${(p) => p.theme.layout.vGap} * 4);
  }
`;

const StyledHistoryItem = styled.button<{ $received?: boolean }>`
  all: unset;
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
  overflow: auto;
  width: 300px;
  transition: background-color 1s ${(p) => p.theme.easings.base};

  &:hover:not(:disabled) {
    cursor: pointer;
    box-shadow: ${(p) => p.theme.shadows.hover};
    background-color: ${(props) => props.theme.colors.primary.highlight};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.colors.lighter.contrast};
  }
`;

const StyledHistoryText = styled.div`
  display: flex;
  flex-direction: column;
  line-clamp: 1;
`;

const StyledHistoryDate = styled.time`
  display: flex;
  flex-direction: column;
  font-size: ${(p) => p.theme.fontSizes.xs};
`;

const StyledTray = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100px;
  background-color: ${(p) => p.theme.colors.lighter.base};
  color: ${(p) => p.theme.colors.lighter.contrast};
  padding: ${(p) => p.theme.layout.vGap} ${(p) => p.theme.layout.hGap};
  border-radius: 0 0 ${(p) => p.theme.borderRadius.base}
    ${(p) => p.theme.borderRadius.base};
  text-align: center;
  box-shadow: ${(p) => p.theme.shadows.extra};
`;

const trimText = (text: string) => {
  const MAX_LENGTH = 40;
  return text.length > MAX_LENGTH ? text.slice(0, MAX_LENGTH) + '...' : text;
};

const History = () => {
  const socket = useContext(SocketContext);

  const { data, error } = useQuery('history', async (): Promise<HistoryItem[]> => {
    const response = await fetch(`${API_ENDPOINT}/chat/conversationss`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  const restore = (item: HistoryItem) => {
    socket?.emit('restore', { conversationId: item.id });
  };

  if (!data || data.length == +0 || error) return null;
  return (
    <StyledHistoryWrapper>
      <StyledHistory>
        {data
          ?.toSorted(
            (x, y) =>
              new Date(y.messages.at(-1)?.created_at || 0).getTime() -
              new Date(x.messages.at(-1)?.created_at || 0).getTime(),
          )
          .map((item, index) => (
            <StyledHistoryItem key={index} onClick={() => restore(item)}>
              <StyledHistoryDate>
                {item.messages[0]?.created_at
                  ? new Date(item.messages[0]?.created_at as string).toLocaleString()
                  : null}
              </StyledHistoryDate>
              <StyledHistoryText>
                {trimText(item.messages[0]?.text || '')}
              </StyledHistoryText>
            </StyledHistoryItem>
          ))}
      </StyledHistory>
      <StyledTray>History</StyledTray>
    </StyledHistoryWrapper>
  );
};

export default History;
