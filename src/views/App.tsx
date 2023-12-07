import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

import { SocketProvider } from '../contexts/socket.io';
import Messages from '../modules/chat/application/messages';
import Sender from '../modules/chat/application/sender';
import { Message } from '../modules/chat/domain/types';
import { theme } from '../styles/theme';
import { StyledContent, StyledGlobal } from './App.styles';

const queryClient = new QueryClient();

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <ThemeProvider theme={theme}>
      <StyledGlobal />
      <QueryClientProvider client={queryClient}>
        <StyledContent>
          <h1>Feenix Bot</h1>
          <SocketProvider>
            <Messages messages={messages} setMessages={setMessages} />
            <Sender setMessages={setMessages} />
          </SocketProvider>
        </StyledContent>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
