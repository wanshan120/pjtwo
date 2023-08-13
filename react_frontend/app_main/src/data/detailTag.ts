export type tagWithURL = {
  id: number;
  name: string;
  url?: string;
};

export type TagType = {
  publicationDate?: tagWithURL[];
  based?: tagWithURL[];
  author?: tagWithURL[];
  country?: tagWithURL[];
  language?: tagWithURL[];
  genre?: tagWithURL[];
  directedBy?: tagWithURL[];
  screenplayBy?: tagWithURL[];
  producedBy?: tagWithURL[];
  starring?: tagWithURL[];
  graphy?: tagWithURL[];
  editedBy?: tagWithURL[];
  musicBy?: tagWithURL[];
  prodConpany?: tagWithURL[];
  award?: tagWithURL[];
  feeling?: tagWithURL[];
  period?: tagWithURL[];
  stage?: tagWithURL[];
  freeWord?: tagWithURL[];
  action?: tagWithURL[];
  thought?: tagWithURL[];
};

export const SampleContentsTagData: TagType = {
  publicationDate: [{ id: 1, name: '2007', url: '/' }],
  based: [{ id: 1, name: '荒野へ', url: '/' }],
  author: [
    {
      id: 1,
      name: 'ジョン・クラウカー',
      url: '/',
    },
  ],
  country: [{ id: 1, name: 'アメリカ', url: '/' }],
  language: [{ id: 1, name: '英語', url: '/' }],
  genre: [
    { id: 1, name: 'アドベンチャー', url: '/' },
    { id: 2, name: 'ドラマ', url: '/' },
    { id: 3, name: '伝記', url: '/' },
  ],
  directedBy: [
    {
      id: 2,
      name: 'ショーン・ペン',
      url: '/',
    },
  ],
  screenplayBy: [
    {
      id: 2,
      name: 'ショーン・ペン',
      url: '/',
    },
  ],
  producedBy: [
    {
      id: 3,
      name: 'アート・リンソン',
      url: '/',
    },
    {
      id: 2,
      name: 'ショーン・ペン',
      url: '/',
    },
    {
      id: 4,
      name: 'ウィリアム・ポーラッド',
      url: '/',
    },
  ],
  starring: [
    {
      id: 5,
      name: 'エミール・ハーシュ',
      url: '/',
    },
    {
      id: 6,
      name: 'マーシャ・ゲイ・ハーデン',
      url: '/',
    },
  ],
  graphy: [
    {
      id: 7,
      name: 'エリック・ゴーティエ',
      url: '/',
    },
  ],
  editedBy: [
    {
      id: 8,
      name: 'ジェイ・キャシディ',
      url: '/',
    },
  ],
  musicBy: [
    {
      id: 9,
      name: 'マイケル・ブルック',
      url: '/',
    },
    {
      id: 10,
      name: 'カーキ・キング',
      url: '/',
    },
    {
      id: 11,
      name: 'エディ・ヴェダー',
      url: '/',
    },
  ],
  prodConpany: [
    {
      id: 1,
      name: 'リバー・ロード・エンターティメント',
      url: '/',
    },
    {
      id: 2,
      name: 'パラマウント・ヴァンテージ',
      url: '/',
    },
    {
      id: 4,
      name: 'フォーカス・フィーチャーズ・インターナショナル',
      url: '/',
    },
  ],
};
