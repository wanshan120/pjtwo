export type urlType = {
  path: string;
  name: string;
};

export type urlPatternsType = {
  [urlName: string]: urlType;
};

export const urlPatterns: urlPatternsType = {
  home: {
    path: '/home',
    name: 'ホーム',
  },
  myList: {
    path: '/my_list',
    name: 'マイリスト',
  },
  detailMovie: {
    path: '/detail_movie',
    name: 'detail_movie',
  },
  notice: {
    path: '/natice',
    name: '通知',
  },
  message: {
    path: '/message',
    name: 'メッセージ',
  },
  profile: {
    path: '/profile',
    name: 'プロフィール',
  },
  settings: {
    path: '/settings',
    name: '設定',
  },
  logout: {
    path: '/logout',
    name: 'ログアウト',
  },
  login: {
    path: '/login',
    name: 'ログイン',
  },
};
