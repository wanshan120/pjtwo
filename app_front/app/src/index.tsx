import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { StateContextProvider } from 'context';
import App from './App';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false, // ウィンドウフォーカスで再フェッチ
      refetchOnMount: false, // キャッシュデータが古いときにマウント時に再フェッチ
      refetchOnReconnect: false, // キャッシュデータが古いときに再接続時に再フェッチ
      suspense: true,
      staleTime: 5 * 1000, // データが古くなってからのミリ秒単位の時間
    },
    mutations: {
      retry: 0,
    },
  },
});

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <StateContextProvider>
          <App />
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </StateContextProvider>
      </Router>
      ,
    </QueryClientProvider>,
  );
}

reportWebVitals();
