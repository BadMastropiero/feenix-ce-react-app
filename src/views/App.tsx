import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from '../contexts/auth';
import { SocketProvider } from '../contexts/socket.io';
import { theme } from '../styles/theme';
import { StyledGlobal } from './App.styles';
import Chat from './Chat';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledGlobal />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SocketProvider>
            <Chat />
          </SocketProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
