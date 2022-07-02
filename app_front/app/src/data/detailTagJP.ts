export type DetailTagJP = {
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
};

const DetailTagJPData: DetailTagJP = {
  publicationDate: '公開日',
  based: '原作',
  author: '原作者',
  country: '制作国',
  language: '言語',
  genre: 'ジャンル',
  directedBy: '監督',
  screenplayBy: '撮影',
  producedBy: '脚本',
  starring: '主演・助演',
  graphy: '映像',
  editedBy: '制作',
  musicBy: '音楽',
  prodConpany: '制作会社',
};

export default DetailTagJPData;
