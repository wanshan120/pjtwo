import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import reactQueryClient from 'configs/react-query-client';
import { StateContextProvider } from 'context';
import AuthMiddleware from 'middlewares/AuthMiddleware';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <QueryClientProvider client={reactQueryClient}>
      <Router>
        <StateContextProvider>
          <AuthMiddleware>
            <App />
          </AuthMiddleware>
        </StateContextProvider>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </Router>
      ,
    </QueryClientProvider>,
  );
}

reportWebVitals();
