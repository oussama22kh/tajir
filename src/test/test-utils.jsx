import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../../Component/ErrorBoundary';

/**
 * Custom render function that wraps components with necessary providers
 */
function render(ui, options = {}) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </BrowserRouter>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
export { render };
