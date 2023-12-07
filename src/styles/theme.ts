export const theme = {
  colors: {
    primary: {
      base: '#46003f',
      highlight: '#5e004f',
      contrast: '#fff',
    },
    secondary: {
      base: '#47b27a',
      contrast: '#fff',
    },
    darker: {
      base: '#000',
      contrast: '#fff',
    },
    lighter: {
      base: '#fff',
      bg: '#f7f6f5',
      contrast: '#485A5A',
    },
    success: {
      base: '#4caf50',
      contrast: '#fff',
    },
    error: {
      base: '#f44336',
      contrast: '#fff',
    },
  },
  layout: {
    maxWidth: '900px',
    vGap: '10px',
    hGap: '20px',
  },
  shadows: {
    base: 'none',
    hover: 'none',
  },
  fontSizes: {
    xl: '30px',
    l: '25px',
    m: '20px',
    s: '16px',
    xs: '14px',
  },
  borderRadius: {
    base: '15px',
  },
  easings: {
    wiggle: 'cubic-bezier(0.74, -0.6, 0.225, 1.59)',
    base: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  },
};
