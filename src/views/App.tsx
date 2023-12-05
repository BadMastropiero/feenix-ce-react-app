import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

import { theme } from '../styles/theme';
import { StyledContent, StyledGlobal } from './App.styles';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledGlobal />
      <QueryClientProvider client={queryClient}>
        <StyledContent>
          <h1>You earned this 🍺 </h1>
        </StyledContent>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
