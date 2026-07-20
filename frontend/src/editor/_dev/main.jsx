import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../index.css'; // Tailwind + fonts — needed in THIS document so syncStylesIntoIframe has something to clone.
import Designer from '../Designer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Designer />
  </StrictMode>,
);
