export type TagKeysType = {
  publicationDate?: string;
  based?: string;
  author?: string;
  country?: string;
  language?: string;
  genre?: string;
  directedBy?: string;
  screenplayBy?: string;
  producedBy?: string;
  starring?: string;
  graphy?: string;
  editedBy?: string;
  musicBy?: string;
  prodConpany?: string;
  award?: string;
  feeling?: string;
  period?: string;
  stage?: string;
  freeWord?: string;
  action?: string;
  thought?: string;
};

const TagKeys: TagKeysType = {
  publicationDate: '公開日',
  based: '原作',
  author: '原作者',
  country: '制作国',
  language: '言語',
  genre: 'ジャンル',
  directedBy: '監督',
  screenplayBy: '撮影',
  producedBy: '脚本',
  starring: 'キャスト',
  graphy: '映像',
  editedBy: '制作',
  musicBy: '音楽',
  prodConpany: '制作会社',
  award: '受賞',
  feeling: '情感',
  period: '時代',
  stage: '舞台',
  freeWord: 'その他',
  action: '行動',
  thought: '思想',
};

export default TagKeys;
