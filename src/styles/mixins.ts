import { css, keyframes } from 'styled-components';

const slideInKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideInAnim = css`
  animation: ${slideInKeyframes} 0.3s ${(p) => p.theme.easings.base};
`;
