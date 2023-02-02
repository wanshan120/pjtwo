import { QueryClient } from 'react-query';

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true, // ウィンドウフォーカスで再フェッチ
      refetchOnMount: false, // キャッシュデータが古いときにマウント時に再フェッチ
      refetchOnReconnect: true, // ネットワーク接続が失われて回復した場合は、画面に表示されている内容を再検証
      // suspense: true, // エラーをスルーするので個別にtrueする
      staleTime: 1000 * 20, // 20秒で更新
    },
    mutations: {
      retry: 2,
    },
  },
});

export default reactQueryClient;
