import { ReactNode } from "react";

export type GlobalTypes = {
  postList: Array<Post>;
  loading: boolean;
  webStructures: ConfigStructure;
  filters: Array<Post>;
  iconList: boolean;
  resultsFilter: boolean;
  isEmpty: boolean;
  loadingMore: boolean;
  isPostsEmpty: boolean;
  post: Post;
  comments: TypeComment;
  mark: Array<Post>;
  localStorageDatas: LocalRating;
  localData: TypeRatig;
  postTen: Array<Post>;
  sectionActive: string;
  anchorEnable: string;
  isEmptyPost: boolean;
  userDatas: TypeDatasUser;
  totalDatas: TypeTotalDatas;
  avalibleTot: number;
  manualAds: ManualAds;
  editAds: boolean;
  loadAds: boolean;
  downloadAds: TypeDownloadAds;
  file: TypeFileAds;
  galeryFiles: TypeGroupGaleryImg;
  statusPopupEdit: boolean;
  pageDash: string;
  mensagens: TypeMsg,
  contribuicoes: TypeContribuicoes,
  postAll: ModelPost,
  activePage: string,
  patrocinadores: ArrayMembers;
  signed: boolean;
  getPosts: () => void;
  getWebStructures: () => void;
  setPost: (state: Post) => void
  ToggleIconList: () => void;
  setResultsFilter: (state: boolean) => void;
  setFilter: (state: Array<Post>) => void;
  handleShare: (id: string, title: string, description: string) => void;
  handleLoadMore: () => void;
  setIsPostsEmpty: (state: boolean) => void;
  handlePost: (id: string) => void;
  handleComments: (id: string) => void;
  setLoading: (state: boolean) => void;
  handleAddNewRate: (id: string, rate: number) => void;
  handleMark: () => void;
  handlePublish: (
    userName: string,
    myComment: string,
    dates: ModelDate
  ) => void;
  handlePostTen: () => void;
  setSectionActive: (page: string) => void;
  setIconList: (state: boolean) => void;
  setAnchorEnable: (state: string) => void;
  signInUser: (email: string, senha: string, checkStatus: boolean) => void;
  getDatasUser: (uid: string) => void;
  getTotPosts: () => void;
  setTotalDatas: (state: TypeTotalDatas) => void;
  addMembers: (name: string, link: string) => void;
  deletarMember: (id: string) => void;
  handleDeletarPost: (id: string) => void;
  handleContribuicoes: (name: string, title: string, link: string) => void;
  handleMessagens: (name: string, feedBack: string) => void;
  registerPost: (
    title: string,
    autor: string,
    category: string,
    link: string,
    description: string,
    capa: ModelCapa,
    date: string
  ) => void;
  handleDeleteAds: (ads: TypeParamsDelete) => void;
  getManualAds: () => void;
  getDownloadAds: () => void;
  handleCreatedAds: (name: string, link: string, file: TypeFileAds) => void;
  setEditAds: (state: boolean) => void;
  setLoadAds: (state: boolean) => void;
  setFile: (state: TypeFileAds) => void;
  updateConfig: (
    title: string,
    logoName: string,
    logoFile: TypeFileUplod,
    backgroundFile: TypeFileUplod
  ) => void;
  updateGaleryFiles: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  setGaleryFiles: (state: TypeGroupGaleryImg) => void;
  setStatusPopupEdit: (state: boolean) => void;
  setPageDash: (state: string) => void;
  handleEditPost: (id: string) => void;
  handleSaveEditPost: (capa: ModelCapa, title: string, category: string, link: string, autor: string, description: string) => void
  getMessagens: () => void,
  getContribuicoes: () => void,
  handlDeleteNotification: (id: string, pageActive: string) => void,
  signOut: () => void,
  setActivePage: (state: string) => void,
  setPostAll: (state: ModelPost) => void,
  setPostList: (state: ModelPost) => void,
  getMembers: () => void;
  verificUser: ()=> void;
  resetPassword: (email:string)=> void
};

export type ModelComment = {
  userName: string;
  data: string;
  hours: string;
  comentario: string;
  index: number;
};

export type TypeFileUplod = {
  file: React.ChangeEvent<HTMLInputElement>
}

export type Post = {
  user: string;
  created: string;
  title: string;
  view: number;
  numberComments: number;
  share: number;
  capaUrl: string;
  id: string;
  categoria: string;
  description: string;
  avaliacao: number;
  imageGalery: Array<ContentImage>;
  link: string;
  autor: string
};

export type Member = {
  name: string;
  link: string;
  id: string;
};

export type Msg = {
  id: string,
  mensagem: string,
  name: string,
}


export type Contribucao = {
  id: string,
  name: string,
  link: string,
  title: string
}

type Date = {
  date: string,
  hours: string
}

export type ContentImage = {
  url: string,
  index: number,
  name: string | undefined,
}

export type ConfigStructure = {
  logoName: string;
  logoUrl: string;
  backgroundUrl: string;
  title: string;
};

export type ModelUploadImg = {
  file: React.ChangeEvent<HTMLInputElement>;
  url: string;
  index: number,
  name?: string
};

export type ModelCapa = {
  file: React.ChangeEvent<HTMLInputElement>;
  url: string;
}

export type TypeGroupGaleryImg = {
  0: ModelUploadImg;
  1: ModelUploadImg;
  2: ModelUploadImg;
  3: ModelUploadImg;
  4: ModelUploadImg;
  5: ModelUploadImg;
  6: ModelUploadImg;
  7: ModelUploadImg;
  8: ModelUploadImg;
  9: ModelUploadImg;
  10: ModelUploadImg;
  11: ModelUploadImg;
};

export type ContentImages = {
  imagesUpload: Array<ModelUploadImg>,
  imagesNotUpload: formatDatasConvertImage
}

export type formatDatasConvertImage = {
  0: ContentImage;
  1: ContentImage;
  2: ContentImage;
  3: ContentImage;
  4: ContentImage;
  5: ContentImage;
  6: ContentImage;
  7: ContentImage;
  8: ContentImage;
  9: ContentImage;
  10: ContentImage;
  11: ContentImage;
}


export type TypeParamsDelete = {
  id: string;
  ref: string;
  nameImg: string;
  index: number;
};

export type ModelDate = {
  date: string;
  hours: string;
};

export type TypeFileAds = {
  file: React.ChangeEvent<HTMLInputElement>;
  ref: string;
  index: number;
};

export type TypeRatig = {
  id: string;
  stateView: boolean;
  stateLockRating: boolean;
  ratingStars: number;
};

export type TypeDatasUser = {
  email: string;
  imgProfile: string;
  name: string;
};

export type ModelUpdateDatas = {
  newCapaUrl: string,
  galeryImages: Array<ContentImage>,
  title: string,
  category: string,
  link: string,
  autor: string,
  description: string
}

export type ManualAds = {
  0: TypeAds;
  1: TypeAds;
  2: TypeAds;
};
export type TypeAds = {
  name: string;
  link: string;
  capa: string;
  id: string;
  nameImg: string;
  index: number;
};

export type TypeDownloadAds = {
  0: TypeAds;
  1: TypeAds;
  2: TypeAds;
  3: TypeAds;
  4: TypeAds;
  5: TypeAds;
  6: TypeAds;
  7: TypeAds;
  8: TypeAds;
  9: TypeAds;
};

export type TypeTotalDatas = {
  views: number;
  comments: number;
  rating: number;
  share: number;
};

export type TypeDataParams = {
  id: string;
  title: string;
  autor: string;
  category: string;
  link: string;
  description: string;
  date: string;
  url: string;
  index: number;
};

export type PlayerContextProviderProps = {
  children: ReactNode;
};


export type TypeMsg = Array<Msg>
export type TypeContribuicoes = Array<Contribucao>
export type ArrayMembers = Array<Member>
export type ResultsFilter = boolean;
export type ModelPost = Array<Post>;
export type TypeComment = Array<ModelComment>;
export type LocalRating = Array<TypeRatig>;
export type ArrayGaleryFiles = Array<ModelUploadImg>;
export type PostDate = Array<Date>
export type ArrayImages = Array<ContentImage>
