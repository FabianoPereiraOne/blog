import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  GlobalTypes,
  Post,
  ConfigStructure,
  TypeGroupGaleryImg,
  TypeParamsDelete,
  ModelDate,
  TypeFileAds,
  TypeRatig,
  TypeDatasUser,
  ManualAds,
  TypeDownloadAds,
  TypeTotalDatas,
  PlayerContextProviderProps,
  ResultsFilter,
  ModelPost,
  TypeComment,
  LocalRating,
  ContentImages,
  ModelCapa,
  ModelUpdateDatas,
  ModelUploadImg,
  TypeMsg,
  TypeContribuicoes,
  ArrayMembers,
  TypeAds,
  ArrayGaleryFiles,
  ArrayImages,
  TypeFileUplod,
} from "./Types";
import {
  DefaultObjectImages,
  DefaultManualAds,
  DefaultDownloadAds,
  DefaultObjectTask,
} from "./DefaultObjects";
import firebase from "firebase/app";

export const BlogContext = createContext({} as GlobalTypes);

export default function DatesProvider({
  children,
}: PlayerContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState<ModelPost>([]);
  const [postAll, setPostAll] = useState<ModelPost>([]);
  const [postRemove, setPostRemove] = useState<ModelPost>([]);
  const [postModified, setPostModified] = useState<ModelPost>([]);
  const [webStructures, setWebStructures] = useState({} as ConfigStructure);
  const [iconList, setIconList] = useState(false);
  const [resultsFilter, setResultsFilter] = useState<ResultsFilter>(false);
  const [filters, setFilter] = useState<ModelPost>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isPostsEmpty, setIsPostsEmpty] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [lastPost, setLastPost] = useState<Object>({});
  const [post, setPost] = useState({} as Post);
  const [comments, setComments] = useState([] as TypeComment);
  const [mark, setMark] = useState([] as ModelPost);
  const [localStorageDatas, setLocalStorageDatas] = useState<LocalRating>(
    localStorage.userDatas ? JSON.parse(localStorage.userDatas) : []
  );
  const [localData, setLocalData] = useState({} as TypeRatig);
  const [postTen, setPostTen] = useState([] as ModelPost);
  const [sectionActive, setSectionActive] = useState<string>("inicio");
  const [anchorEnable, setAnchorEnable] = useState<string>("home");
  const [isEmptyPost, setIsEmptyPost] = useState<boolean>(true);
  const [userDatas, setUserDatas] = useState<TypeDatasUser>({} as TypeDatasUser);
  const [totalDatas, setTotalDatas] = useState<TypeTotalDatas>({} as TypeTotalDatas);
  const [avalibleTot, setAvalibleTot] = useState<number>(0);
  const [editAds, setEditAds] = useState<boolean>(false);
  const [loadAds, setLoadAds] = useState<boolean>(true);
  const [statusPopupEdit, setStatusPopupEdit] = useState<boolean>(false);
  const [manualAds, setManualAds] = useState<ManualAds>(DefaultManualAds);
  const [mensagens, setMensagens] = useState<TypeMsg>([]);
  const [contribuicoes, setContribuicoes] = useState<TypeContribuicoes>([]);
  const [patrocinadores, setPatrocinadores] = useState<ArrayMembers>([]);
  const [activePage, setActivePage] = useState('post')
  const [signed, setSigned] = useState<boolean>(false)
  const [downloadAds, setDownloadAds] =
    useState<TypeDownloadAds>(DefaultDownloadAds);
  const [galeryFiles, setGaleryFiles] =
    useState<TypeGroupGaleryImg>(DefaultObjectImages);
  const [pageDash, setPageDash] = useState('inicio')
  const [file, setFile] = useState<TypeFileAds>({
    file: {} as React.ChangeEvent<HTMLInputElement>,
    ref: "",
    index: -1,
  });

  useEffect(() => {
    if (localStorageDatas.length !== 0) {
      localStorage.setItem("userDatas", JSON.stringify(localStorageDatas));
    }
  }, [localStorageDatas]);

  async function getPosts() {
    await firebase.firestore()
      .collection("posts")
      .orderBy("created", "desc")
      .limit(8)
      .get()
      .then((snapshot: firebase.firestore.DocumentData) => {
        let snapshotEmpty = snapshot.docs.length > 0;

        if (snapshotEmpty) {
          updateState(snapshot);
        } else {
          setIsPostsEmpty(true);
          setIsEmpty(true);
        }
      })
      .catch((e) => {
        console.error(e);
        setLoading(false)
      });
  }

  function updateState(snapshot: firebase.firestore.DocumentData) {
    let lista: ModelPost = [];

    snapshot.docs.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
      lista.push({
        user: doc.data().user,
        created: doc.data().created,
        title: doc.data().title,
        view: doc.data().view,
        numberComments: doc.data().numberComments,
        share: doc.data().share,
        capaUrl: doc.data().capaUrl,
        id: doc.id,
        categoria: doc.data().categoria,
        description: doc.data().description,
        avaliacao: doc.data().avaliacao,
        imageGalery: doc.data().imageGalery,
        link: doc.data().link,
        autor: doc.data().autor,
      });

    });

    let lastDoc = snapshot.docs[snapshot.docs.length - 1];

    setLastPost(lastDoc);
    setPostList(lista);
  }

  async function getWebStructures() {

    await firebase
      .database()
      .ref("WebStructures")
      .get()
      .then((snapshot: firebase.database.DataSnapshot) => {
        setWebStructures({
          logoName: snapshot.val().logoName,
          logoUrl: snapshot.val().logoUrl,
          backgroundUrl: snapshot.val().backgroundUrl,
          title: snapshot.val().title,
        });

        const logoMarca = document.querySelector('#logoMarca')
        const logoTitle = document.querySelector('#logoTitle')
        logoMarca?.setAttribute('href', snapshot.val().logoUrl)
        logoTitle!.innerHTML = `${snapshot.val().logoName}`
      })
      .catch((e) => {
        toast.error("Ops! Falha ao buscar dados");
        console.error(e);
      })
      .finally(()=>{
        setLoading(false)
      })
  }

  function ToggleIconList() {
    setIconList(!iconList);
  }

  async function handleLoadMore() {
    setLoadingMore(true)
    await firebase
      .firestore()
      .collection("posts")
      .orderBy("created", "desc")
      .startAfter(lastPost)
      .limit(4)
      .get()
      .then((snapshot: firebase.firestore.DocumentData) => {
        let isDocsEmpty = snapshot.size === 0;

        if (!isDocsEmpty) {
          let lista: ModelPost = [];

          snapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
            lista.push({
              user: doc.data().user,
              created: doc.data().created,
              title: doc.data().title,
              view: doc.data().view,
              numberComments: doc.data().numberComments,
              share: doc.data().share,
              capaUrl: doc.data().capaUrl,
              id: doc.id,
              categoria: doc.data().categoria,
              description: doc.data().description,
              avaliacao: doc.data().avaliacao,
              imageGalery: doc.data().imageGalery,
              link: doc.data().link,
              autor: doc.data().autor,
            });
          });

          let lastDoc = snapshot.docs[snapshot.docs.length - 1];

          setLastPost(lastDoc);
          setPostList((postList) => [...postList, ...lista]);
        } else {
          setIsEmpty(true);
        }
      })
      .catch((e) => {
        toast.error("Ops! Falha ao carregar mais dados");
        console.error(e);
        setLoadingMore(false)
      })
      .finally(()=>{
        setLoadingMore(false)
      })
  }

  function handleShare(id: string, title: string, description: string) {
    let url = window.location.origin;

    const data = {
      title: title,
      text: description,
      url: `${url}/post/${id}`,
    };

    navigator
      .share(data)
      .then(() => {
        postList.forEach(async (post) => {
          if (post.id === id) {
            await firebase
              .firestore()
              .collection("posts")
              .doc(id)
              .update({
                user: post.user,
                created: post.created,
                title: post.title,
                view: post.view,
                numberComments: post.numberComments,
                share: Number(post.share) + 1,
                capaUrl: post.capaUrl,
                id: post.id,
                categoria: post.categoria,
                description: post.description,
                avaliacao: post.avaliacao,
                autor: post.autor,
                imageGalery: post.imageGalery,
                link: post.link,
              });
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function handlePost(id: string) {
    await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .get()
      .then(async (snapshot: firebase.firestore.DocumentData) => {
        if (snapshot.exists) {
          setPost({
            user: snapshot.data()?.user,
            created: snapshot.data()?.created,
            title: snapshot.data()?.title,
            view: snapshot.data()?.view,
            numberComments: snapshot.data()?.numberComments,
            share: snapshot.data()?.share,
            capaUrl: snapshot.data()?.capaUrl,
            id: snapshot.data()?.id,
            categoria: snapshot.data()?.categoria,
            description: snapshot.data()?.description,
            avaliacao: snapshot.data()?.avaliacao,
            imageGalery: snapshot.data()?.imageGalery,
            link: snapshot.data()?.link,
            autor: snapshot.data()?.autor,
          });
          setStateTotAvalible(snapshot.data()?.avaliacao);
          setIsEmptyPost(false);
          handleDatasLocalSorage(snapshot.data());
        } else {
          toast.error("Post não encontrado");
          setIsEmptyPost(true);
        }
      })
      .catch((e) => {
        toast.error("Ops! Erro ao carregar post");
        console.log(e);
      });
  }

  function setStateTotAvalible(avaliacao: number) {
    if (avaliacao === 0) {
      setAvalibleTot(0);
    }else if (avaliacao < 100) {
      setAvalibleTot(1);
    }else if (avaliacao >= 100 && avaliacao < 150) {
      setAvalibleTot(2);
    }else if (avaliacao >= 250 && avaliacao < 200) {
      setAvalibleTot(3);
    }else if (avaliacao >= 350 && avaliacao < 250) {
      setAvalibleTot(4);
    }else if (avaliacao >= 250) {
      setAvalibleTot(5);
    }
  }

  async function handleComments(id: string) {
    await firebase
      .database()
      .ref("comments")
      .child(id)
      .on("value", (snapshot: firebase.database.DataSnapshot) => {
        if (snapshot.val() === null || snapshot.val() === undefined) {
          setComments([]);
        } else {
          let lista: TypeComment = [];
          snapshot.forEach((comment: firebase.database.DataSnapshot) => {
            lista.push({
              userName: comment.val().userName,
              data: comment.val().data,
              hours: comment.val().hours,
              comentario: comment.val().comentario,
              index: comment.val().index,
            });
          });

          setComments(lista);
        }
      });
  }

  async function handleAddNewRate(id: string, rate: number) {
    let newTotAvaliable = post.avaliacao + rate;

    await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .update({
        user: post.user,
        created: post.created,
        title: post.title,
        view: post.view,
        numberComments: post.numberComments,
        share: post.share,
        capaUrl: post.capaUrl,
        id: post.id,
        categoria: post.categoria,
        description: post.description,
        avaliacao: newTotAvaliable,
        autor: post.autor,
        link: post.link,
        imageGalery: post.imageGalery,
      } as Post)
      .then(() => {
        let datas = [
          {
            id: id,
            stateView: true,
            stateLockRating: true,
            ratingStars: rate,
          },
        ];

        let arrayPost: LocalRating = []

        localStorageDatas.forEach((item) => {
          if (item.id !== id) {
            arrayPost = [...arrayPost, item]
          }
        });

        if (arrayPost.length === 0 || arrayPost === undefined || arrayPost === null) {
          setLocalStorageDatas(datas);
        } else {
          setLocalStorageDatas([...arrayPost, ...datas]);
        }
      })
      .catch((e) => {
        toast.error("Ops! Falha ao carregar mais dados");
        console.error(e);
      });
  }

  function handleMark() {
    let newMark = [];

    if (postList.length >= 7) {
      for (let c = 0; c < 7; c++) {
        let numberRandom = Math.floor(Math.random() * postList.length);
        newMark.push(postList[numberRandom]);
      }
      setMark(newMark);
    } else {
      for (let c = 0; c < postList.length; c++) {
        newMark.push(postList[c]);
      }
      setMark(newMark);
    }
  }

  async function handlePublish(
    userName: string,
    myComment: string,
    dates: ModelDate
  ) {
    let user = null;

    if (userName === "") {
      user = "Anonymous";
    }

    if (myComment === "") {
      toast.info("Antes de publicar comente algo");
      return;
    }

    await firebase
      .database()
      .ref("comments")
      .child(post.id)
      .push()
      .set({
        userName: user !== null ? user : userName,
        data: dates.date,
        hours: dates.hours,
        comentario: myComment,
        index: post.numberComments + 1,
      })
      .then(async () => {
        await firebase
          .firestore()
          .collection("posts")
          .doc(post.id)
          .update({
            user: post.user,
            created: post.created,
            title: post.title,
            view: post.view,
            numberComments: post.numberComments + 1,
            share: post.share,
            capaUrl: post.capaUrl,
            id: post.id,
            categoria: post.categoria,
            description: post.description,
            avaliacao: post.avaliacao,
            autor: post.autor,
            link: post.link,
            imageGalery: post.imageGalery,
          } as Post)
          .then(() => {
            handlePost(post.id);
            handleComments(post.id);
          })
          .catch((e) => {
            toast.error("Ops! Falha ao atualizar dados");
            console.error(e);
          });
      })
      .catch((e) => {
        toast.error("Ops! Falha ao publicar");
        console.error(e);
      });
  }

  function handleDatasLocalSorage(post: Post) {
    let datas = [
      {
        id: post.id,
        stateView: true,
        stateLockRating: false,
        ratingStars: 0,
      },
    ];

    if (!localStorage.userDatas) {
      localStorage.setItem("userDatas", JSON.stringify(datas));
      setLocalData({
        id: post.id,
        stateView: true,
        stateLockRating: false,
        ratingStars: 0,
      });
      setLocalStorageDatas(datas);
      updateDataView(post);
    } else {
      let responseCheck = null;

      localStorageDatas.forEach((configPost) => {
        if (configPost.id === post.id) {
          setLocalData({
            id: configPost.id,
            stateView: configPost.stateView,
            stateLockRating: configPost.stateLockRating,
            ratingStars: configPost.ratingStars,
          });
          responseCheck = true;
        }
      });

      if (responseCheck === true) {
        return;
      } else {
        setLocalStorageDatas([...localStorageDatas, ...datas]);
        setLocalData({
          id: post.id,
          stateView: true,
          stateLockRating: false,
          ratingStars: 0,
        });
        updateDataView(post);
      }
    }
  }

  async function updateDataView(post: Post) {
    await firebase
      .firestore()
      .collection("posts")
      .doc(post.id)
      .update({
        user: post.user,
        created: post.created,
        title: post.title,
        view: post.view + 1,
        numberComments: post.numberComments,
        share: post.share,
        capaUrl: post.capaUrl,
        id: post.id,
        categoria: post.categoria,
        description: post.description,
        avaliacao: post.avaliacao,
        imageGalery: post.imageGalery,
        link: post.link,
        autor: post.autor,
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function handlePostTen() {
    setLoading(false)
    await firebase
      .firestore()
      .collection("posts")
      .orderBy("avaliacao", "desc")
      .limit(10)
      .get()
      .then((snapshot: firebase.firestore.DocumentData) => {
        if (snapshot.docs.length > 0) {
          let lista: ModelPost = [];

          snapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
            lista.push({
              user: doc.data().user,
              created: doc.data().created,
              title: doc.data().title,
              view: doc.data().view,
              numberComments: doc.data().numberComments,
              share: doc.data().share,
              capaUrl: doc.data().capaUrl,
              id: doc.id,
              categoria: doc.data().categoria,
              description: doc.data().description,
              avaliacao: doc.data().avaliacao,
              imageGalery: doc.data().imageGalery,
              link: doc.data().link,
              autor: doc.data().autor,
            });
          });

          setPostTen(lista);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Falha ao buscar os top 10");
      })
  }

  async function signInUser(
    email: string,
    senha: string,
    checkStatus: boolean
  ) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then((user: firebase.auth.UserCredential) => {
        if (checkStatus === true) {
          localStorage.setItem(
            "datasUser",
            JSON.stringify({
              email,
              senha,
              uid: user.user?.uid,
            })
          );
        } else {
          localStorage.removeItem("datasUser");
        }

        getDatasUser(user.user?.uid);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Confira novamente os dados.");

      });
  }

  async function getDatasUser(uid: string | undefined) {
    if (uid !== undefined) {
      await firebase
        .database()
        .ref("users")
        .child(uid)
        .get()
        .then((snapshot: firebase.database.DataSnapshot) => {
          setUserDatas(snapshot.val());
          setSigned(true)
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      toast.error("Erro usuario não definido!")
    }
  }

  function verificUser() {
    if (localStorage.datasUser) {
        let data = JSON.parse(localStorage.datasUser)
        getDatasUser(data.uid)
    }
}

  async function getTotPosts() {
    await firebase
      .firestore()
      .collection("posts").orderBy('created', 'asc').onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
        const changes = snapshot.docChanges()

        changes.forEach((post: firebase.firestore.DocumentChange) => {
          if (post.type === 'added') {

            let response = { result: false }

            postAll.forEach((item) => {
              if (item.id.includes(post.doc.data().id)) {
                response = { result: true }
              }
            })

            if (response.result !== true) {
              setPostAll(internalValue => [{
                user: post.doc.data().user,
                created: post.doc.data().created,
                title: post.doc.data().title,
                view: post.doc.data().view,
                numberComments: post.doc.data().numberComments,
                share: post.doc.data().share,
                capaUrl: post.doc.data().capaUrl,
                id: post.doc.data().id,
                categoria: post.doc.data().categoria,
                description: post.doc.data().description,
                avaliacao: post.doc.data().avaliacao,
                imageGalery: post.doc.data().imageGalery,
                link: post.doc.data().link,
                autor: post.doc.data().autor,
              }, ...internalValue])
            }
          } else if (post.type === 'removed') {
            setPostRemove(internalValue => [...internalValue, {
              user: post.doc.data().user,
              created: post.doc.data().created,
              title: post.doc.data().title,
              view: post.doc.data().view,
              numberComments: post.doc.data().numberComments,
              share: post.doc.data().share,
              capaUrl: post.doc.data().capaUrl,
              id: post.doc.data().id,
              categoria: post.doc.data().categoria,
              description: post.doc.data().description,
              avaliacao: post.doc.data().avaliacao,
              imageGalery: post.doc.data().imageGalery,
              link: post.doc.data().link,
              autor: post.doc.data().autor,
            }])
          } else if (post.type === 'modified') {
            setPostModified(internalValue => [...internalValue, {
              user: post.doc.data().user,
              created: post.doc.data().created,
              title: post.doc.data().title,
              view: post.doc.data().view,
              numberComments: post.doc.data().numberComments,
              share: post.doc.data().share,
              capaUrl: post.doc.data().capaUrl,
              id: post.doc.data().id,
              categoria: post.doc.data().categoria,
              description: post.doc.data().description,
              avaliacao: post.doc.data().avaliacao,
              imageGalery: post.doc.data().imageGalery,
              link: post.doc.data().link,
              autor: post.doc.data().autor,
            }])
          }
        })
      })
  }

  useEffect(() => {

    if (postRemove.length > 0) {
      let newListPostAll: Array<Post> = []

      postAll.forEach((post) => {
        if (post.id !== postRemove[0].id) {
          newListPostAll = [...newListPostAll, post]
        }
      })

      setPostAll(newListPostAll)
      setPostRemove([])
    }
    // eslint-disable-next-line
  }, [postRemove])

  useEffect(() => {

    if (postModified.length > 0) {
      let newListPostAll: Array<Post> = []

      postAll.forEach((post) => {
        if (post.id !== postModified[0].id) {
          newListPostAll = [...newListPostAll, post]
        } else {
          newListPostAll = [...newListPostAll, postModified[0]]
        }
      })

      setPostAll(newListPostAll)
      setPostModified([])
    }
    // eslint-disable-next-line
  }, [postModified])

  async function getMembers() {
    await firebase.database().ref('patrocinadores').get()
      .then((snapshot: firebase.database.DataSnapshot) => {
        const isExists = snapshot.exists()

        if (isExists) {
          setPatrocinadores(Object.values(snapshot.val()))
        }
      })
      .catch((error) => {
        console.log(error)
        toast.error("Erro ao buscar patrocinadores!")
      })
  }

  async function addMembers(name: string, link: string) {
    let id = firebase
      .database()
      .ref("patrocinadores")
      .push().key;

    await firebase
      .database()
      .ref("patrocinadores")
      .child(String(id))
      .set({
        name,
        link,
        id,
      })
      .then(() => {
        toast.success("Adicionado com sucesso!");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Erro ao criar patrocinador!");
      });
  }

  async function deletarMember(id: string) {
    await firebase
      .database()
      .ref("patrocinadores")
      .child(id)
      .remove()
      .then(() => {
        let newListMembers: ArrayMembers = []

        patrocinadores.forEach((member) => {
          if (id !== member.id) {
            newListMembers = [...newListMembers, member]
          }
        });

        setPatrocinadores(newListMembers)

        toast.success("Deletado com sucesso!");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Erro ao deletar!");
      });
  }

  async function handleDeletarPost(id: string) {
    await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .delete()
      .then(async () => {
        handleCommentsDelete(id)
          .then(() => {
            handleDeleteCapa(id)
              .then(() => {
                handleDeleteGaleryImages(id)
                  .then(() => {

                    let newListPost: ModelPost = []

                    postAll.forEach((post) => {
                      if (id !== post.id) {
                        newListPost = [...newListPost, post]
                      }
                    });


                    setPostAll(newListPost);
                    toast.success("Deletado com sucesso!");
                  })
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((e) => {
            console.log(e);
          });

      })
      .catch((e) => {
        console.log(e);
        toast.error("Erro ao deletar!");
      });
  }

  async function handleCommentsDelete(id: string) {
    await firebase
      .database()
      .ref("comments")
      .child(id)
      .remove()
      .catch((e) => {
        console.log(e);
      });
  }

  async function handleDeleteCapa(id: string) {
    await firebase
      .storage()
      .ref(`posts/${id}/capa/imageCapa`)
      .delete()
      .catch((e) => {
        console.log(e);
      });
  }

  async function handleDeleteGaleryImages(id: string) {
    let postSelect: Post = {
      user: "",
      created: "",
      title: "",
      view: 0,
      numberComments: 0,
      share: 0,
      capaUrl: "",
      id: "",
      categoria: "",
      description: "",
      avaliacao: 0,
      imageGalery: [],
      link: "",
      autor: "",
    };

    postList.forEach((post) => {
      if (post.id.includes(id)) {
        postSelect = post;
      }
    });

    const storageRef = firebase.storage().ref(`posts/${id}/imagesGalery`);

    postSelect.imageGalery.forEach((item) => {
      storageRef
        .child(item.name!)
        .delete()
        .catch((e) => {
          console.log(e);
        });
    });
  }

  async function handleContribuicoes(
    name: string,
    title: string,
    link: string
  ) {
    let id = firebase.database().ref("contribuicoes").push().key;

    await firebase
      .database()
      .ref("contribuicoes")
      .child(String(id))
      .set({
        name,
        title,
        link,
        id,
      })
      .then(() => {
        toast.success("Post enviado com sucesso!");
      })
      .catch((e) => {
        toast.error("Falha a o enviar post");
        console.log(e);
      });
  }

  async function handleMessagens(name: string, feedBack: string) {
    let id = firebase.database().ref("mensagens").push().key;

    await firebase
      .database()
      .ref("mensagens")
      .child(String(id))
      .set({
        name,
        mensagem: feedBack,
        id,
      })
      .then(() => {
        toast.success("enviado com sucesso!");
      })
      .catch((e) => {
        toast.error("Erro ao enviar!");
        console.log(e);
      });
  }

  async function registerPost(
    title: string,
    autor: string,
    category: string,
    link: string,
    description: string,
    capa: ModelCapa,
    date: string
  ) {
    if (
      title.length > 0 &&
      category.length > 0 &&
      description.length > 0 &&
      capa.url.length > 0 &&
      date.length > 0
    ) {
      const id = await firebase.firestore().collection("posts").doc().id;

      const imageRef = firebase.storage().ref("posts").child(id);
      const capaUpload = imageRef
        .child("capa")
        .child("imageCapa")
        .put(capa.file.target.files![0]);

      capaUpload
        .then(() => {
          capaUpload.on(
            "state_changed",
            function () { },
            function (e) {
              console.log(e);
            },
            function () {
              imageRef
                .child("capa")
                .child("imageCapa")
                .getDownloadURL()
                .then((capaUrl: string) => {
                  let filesImg: ArrayGaleryFiles = []
                  const ArrayGalery = Object.values(galeryFiles)

                  ArrayGalery.forEach((Files) => {
                    if (Files.url.length > 0) {
                      filesImg = [...filesImg, Files]
                    }
                  });

                  if (filesImg.length > 0) {
                    let urlImages = DefaultObjectTask;

                    filesImg.forEach((img, index) => {
                      const imgTask = imageRef
                        .child("imagesGalery")
                        .child(img.file.target.files![0].name)
                        .put(img.file.target.files![0]);

                      imgTask.on(
                        "state_changed",
                        function () { },
                        function (e) {
                          console.log(e);
                        },
                        function () {
                          imageRef
                            .child("imagesGalery")
                            .child(img.file.target.files![0].name)
                            .getDownloadURL()
                            .then((url) => {
                              urlImages = {
                                ...urlImages,
                                [img.index]: {
                                  url,
                                  index: img.index,
                                  name: img.file.target.files![0].name,
                                },
                              };

                              if (index === filesImg.length - 1) {
                                let arrayUrlList: ArrayImages = []
                                const arrayImg = Object.values(urlImages)

                                arrayImg.forEach((img) => {
                                  if (img.url.length > 0) {
                                    arrayUrlList = [...arrayUrlList, img]
                                  }
                                });

                                let datasParams: Post = {
                                  title,
                                  user: userDatas.name,
                                  capaUrl,
                                  id,
                                  autor,
                                  categoria: category,
                                  link,
                                  description,
                                  created: date,
                                  imageGalery: arrayUrlList,
                                  view: 0,
                                  numberComments: 0,
                                  share: 0,
                                  avaliacao: 0,
                                };

                                finishCreatedPost(datasParams);
                              }
                            })
                            .catch((e) => {
                              console.log(e);
                              imageRef
                                .child("imagesGalery")
                                .child(img.file.target.files![0].name)
                                .delete()
                                .catch((error) => {
                                  console.log(error);
                                });
                            });
                        }
                      );
                    });
                  } else {
                    let datasParams: Post = {
                      title,
                      user: userDatas.name,
                      capaUrl,
                      id,
                      autor,
                      categoria: category,
                      link,
                      description,
                      created: date,
                      imageGalery: [],
                      view: 0,
                      numberComments: 0,
                      share: 0,
                      avaliacao: 0,
                    };

                    finishCreatedPost(datasParams);
                  }
                })
                .catch((e) => {
                  console.log(e);
                  imageRef.child(capa.file.target.files![0].name).delete();
                  return;
                });
            }
          );
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    } else {
      toast.info("Preencha todos os campos!");
      return;
    }
  }

  async function finishCreatedPost(datasParams: Post) {
    await firebase
      .firestore()
      .collection("posts")
      .doc(datasParams.id)
      .set({
        user: datasParams.user,
        created: datasParams.created,
        title: datasParams.title,
        view: datasParams.view,
        numberComments: datasParams.numberComments,
        share: datasParams.share,
        capaUrl: datasParams.capaUrl,
        id: datasParams.id,
        categoria: datasParams.categoria,
        description: datasParams.description,
        avaliacao: datasParams.avaliacao,
        imageGalery: datasParams.imageGalery,
        link: datasParams.link.length > 0 ? datasParams.link : null,
        autor: datasParams.autor.length > 0 ? datasParams.autor : null,
      })
      .then(() => {
        toast.success("Post criado com sucesso!");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Erro ao criar post!");
      })
      .finally(()=>{
        setLoading(false)
      })
  }

  async function handleDeleteAds(ads: TypeParamsDelete) {
    const response = window.confirm("Deseja excluir essa campanhia?")
    let defaultAds: TypeAds = {
      name: "",
      link: "",
      capa: "",
      id: "",
      index: ads.index,
      nameImg: ""
    };


    if (response) {
      await firebase
        .database()
        .ref(ads.ref)
        .child(ads.id)
        .remove()
        .then(async () => {
          await firebase
            .storage()
            .ref(ads.ref)
            .child(`${ads.index}`)
            .child(ads.nameImg)
            .delete()
            .then(() => {
              if (ads.ref === "manualAds") {
                setManualAds({ ...manualAds, [ads.index]: defaultAds })
                toast.success("Deletado com sucesso!");
              } else if (ads.ref === "downloadAds") {

                setDownloadAds({ ...downloadAds, [ads.index]: defaultAds })
                toast.success("Deletado com sucesso!");
              }
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
          toast.error("Erro ao deletar!");
        })
        .finally(() => {
          setLoadAds(false);
        });
    } else {
      return;
    }
  }

  function handleCreatedAds(name: string, link: string, file: TypeFileAds) {
    if (
      file.file.target.files !== null &&
      name !== "" &&
      link !== "" &&
      file.index !== -1
    ) {
      let storageRef = firebase.storage().ref(`${file.ref}/${file.index}`);
      const uploadTask = storageRef
        .child(file.file.target.files[0].name)
        .put(file.file.target.files[0]);

      uploadTask.on(
        "state_changed",
        function () { },
        function (e) {
          console.log(e);
        },
        function () {
          storageRef
            .child(file.file.target.files![0].name)
            .getDownloadURL()
            .then(async (url: string) => {
              setEditAds(false);

              const id: string | null = await firebase.database().ref(file.ref).push().key

              if (id !== null) {
                await firebase
                  .database()
                  .ref(file.ref)
                  .child(id)
                  .set({
                    id,
                    capa: url,
                    name,
                    link,
                    nameImg: file.file.target.files![0].name,
                    index: file.index,
                  })
                  .then(() => {
                    if (file.ref === "manualAds") {
                      let obj = {
                        name,
                        link,
                        capa: url,
                        id,
                        nameImg: file.file.target.files![0].name,
                        index: file.index,
                      };

                      let newManualAds = { ...manualAds, [file.index]: obj };
                      setManualAds(newManualAds);
                    } else {
                      let obj = {
                        name,
                        link,
                        capa: url,
                        id,
                        nameImg: file.file.target.files![0].name,
                        index: file.index,
                      };

                      let newDownloadAds = { ...downloadAds, [file.index]: obj };
                      setDownloadAds(newDownloadAds);
                    }
                    toast.success("Salvo com sucesso!");
                  })
                  .catch(() => {
                    console.log("Erro ao salvar!");
                    toast.error("Preencha todos os campos!");
                  });
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      );
    } else {
      toast.info("Preencha todos os campos!");
      return;
    }
  }

  async function getManualAds() {
    await firebase
      .database()
      .ref("manualAds")
      .get()
      .then((snapshot: firebase.database.DataSnapshot) => {
        if (snapshot.exists()) {
          let newManualAds = DefaultManualAds
          let datas: firebase.database.DataSnapshot = snapshot.val()

          Object.values(datas).forEach((ads: TypeAds) => {
            let obj = {
              name: ads.name,
              link: ads.link,
              capa: ads.capa,
              id: ads.id,
              index: ads.index,
            };

            newManualAds = { ...newManualAds, [ads.index]: obj }
          });

          setManualAds(newManualAds)
        } else {
          return;
        }
      })
      .catch((e) => {
        console.error(e);
        setLoading(false)
      });
  }

  async function getDownloadAds() {
    setLoading(false)
    await firebase
      .database()
      .ref("downloadAds")
      .get()
      .then((snapshot: firebase.database.DataSnapshot) => {

        if (snapshot.exists()) {
          const data: firebase.database.DataSnapshot = snapshot.val()
          let localDatas = DefaultDownloadAds

          Object.values(data).forEach((item: TypeAds) => {
            localDatas = { ...localDatas, [item.index]: item }
          })

          setDownloadAds(localDatas)
        } else {
          return;
        }
      })
      .catch((e) => {
        setActivePage('ads')
        console.error(e);
        setLoading(false)
      })
      .finally(()=>{
        setActivePage('ads')
      })
  }

  function updateConfig(
    title: string,
    logoName: string,
    logoFile: TypeFileUplod,
    backgroundFile: TypeFileUplod
  ) {
    if (
      title !== "" &&
      logoName !== "" &&
      logoFile.file.target !== undefined && logoFile.file.target.files !== null &&
      backgroundFile.file.target !== undefined && backgroundFile.file.target.files !== null
    ) {
      let storageRef = firebase.storage().ref("WebStructures");
      storageRef
        .listAll()
        .then((e) => {
          const anteriores = Object.values(e.items);

          anteriores.forEach((img) => {
            storageRef.child(img.name).delete();
          });
        })
        .finally(() => {
          const logoTask = storageRef
            .child(logoFile.file.target.files![0].name)
            .put(logoFile.file.target.files![0]);
          logoTask.on(
            "state_changed",
            function () { },
            function (e) {
              console.log(e);
            },
            function () {
              storageRef
                .child(logoFile.file.target.files![0].name)
                .getDownloadURL()
                .then((logoUrl) => {
                  const backgroundTask = storageRef
                    .child(backgroundFile.file.target.files![0].name)
                    .put(backgroundFile.file.target.files![0]);

                  backgroundTask.on(
                    "state_changed",
                    function () { },
                    function (e) {
                      console.log(e);
                    },
                    function () {
                      storageRef
                        .child(backgroundFile.file.target.files![0].name)
                        .getDownloadURL()
                        .then(async (backgroundUrl) => {
                          await firebase
                            .database()
                            .ref("WebStructures")
                            .update({
                              logoUrl,
                              backgroundUrl,
                              title,
                              logoName,
                            })
                            .then(() => {
                              toast.success("Atualizado com sucesso!");
                            })
                            .catch((e) => {
                              console.log(e);
                            });
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }
                  );
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          );
        });
    } else {
      toast.info("Preencha todos os campos!")
    }
  }

  function updateGaleryFiles(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    if (
      e.target.files![0].type === "image/png" ||
      e.target.files![0].type === "image/jpeg" ||
      e.target.files![0].type === "image/jpg"
    ) {
      if (e.target.files![0] !== null) {
        setGaleryFiles({
          ...galeryFiles,
          [index]: {
            file: e,
            url: URL.createObjectURL(e.target.files![0]),
            index: index,
            name: e.target.files![0].name
          },
        });
      } else {
        return;
      }
    } else {
      toast.info("Formato invalido! [ PNG OU JPG ]");
      return;
    }
  }

  function handleEditPost(id: string) {
    setLoading(true)
    handlePost(id)
      .finally(() => {
        setLoading(false)
        setPageDash('editPost')
      })
  }

  function handleSaveEditPost(capa: ModelCapa, title: string, category: string, link: string, autor: string, description: string) {

    const storageRef = firebase.storage().ref(`posts/${post.id}`)

    const oldVersionTextPost = [
      post.title,
      post.categoria,
      post.link,
      post.autor,
      post.description
    ]

    const newVersionTextPost = [
      title,
      category,
      link,
      autor,
      description,
    ]

    const compareText = newVersionTextPost.map((input, index) => {
      if (input === oldVersionTextPost[index]) {
        return false
      } else {
        return true
      }
    })
    const compareGalery = Object.values(galeryFiles).map((image) => {
      if (image.file.target === undefined) {
        return false
      } else {
        return true
      }
    })

    const capaFile = capa.file.target !== undefined
    const resultCompareGalery = compareGalery.indexOf(true) !== -1
    const resultCompareText = compareText.indexOf(true) !== -1

    if (resultCompareText && !capaFile && !resultCompareGalery) {
      let datasPost = {
        newCapaUrl: capa.url,
        galeryImages: post.imageGalery,
        title,
        category,
        link,
        autor,
        description,
      }
      handleUpdateDatasPost(datasPost)
    }

    if (capaFile && !resultCompareText && !resultCompareGalery) {
      let datasPost = {
        newCapaUrl: '',
        galeryImages: post.imageGalery,
        title: post.title,
        category: post.categoria,
        link: post.link,
        autor: post.autor,
        description: post.description,
      }
      handleUploadCapa(capa, storageRef, datasPost)
    }

    if (resultCompareGalery && !resultCompareText && !capaFile) {
      let datasPost = {
        newCapaUrl: post.capaUrl,
        galeryImages: [],
        title: post.title,
        category: post.categoria,
        link: post.link,
        autor: post.autor,
        description: post.description,
      }
      handleUploadImagesGalery(storageRef, datasPost)
    }

    if (resultCompareText && capaFile && !resultCompareGalery) {
      let datasPost = {
        newCapaUrl: '',
        galeryImages: post.imageGalery,
        title,
        category,
        link,
        autor,
        description,
      }
      handleUploadCapa(capa, storageRef, datasPost)
    }

    if (resultCompareGalery && resultCompareText && !capaFile) {
      let datasPost = {
        newCapaUrl: post.capaUrl,
        galeryImages: [],
        title,
        category,
        link,
        autor,
        description,
      }
      handleUploadImagesGalery(storageRef, datasPost)
    }

    if (resultCompareGalery && resultCompareText && capaFile) {
      let datasPost = {
        newCapaUrl: '',
        galeryImages: [],
        title,
        category,
        link,
        autor,
        description,
      }
      let isAllDatas = true
      handleUploadCapa(capa, storageRef, datasPost, isAllDatas)
    }

  }

  function handleUploadImagesGalery(storageRef: firebase.storage.Reference, datasPost: ModelUpdateDatas) {
    const contentImages: ContentImages = {
      imagesUpload: [],
      imagesNotUpload: DefaultObjectTask
    }

    Object.values(galeryFiles).forEach((image) => {
      if (image.file.target !== undefined) {
        contentImages.imagesUpload.push(image)
      } else {
        if (image.url.length > 0) {
          contentImages.imagesNotUpload = {
            ...contentImages.imagesNotUpload, [image.index]: {
              url: image.url,
              index: image.index,
              name: image.name
            }
          }
        }
      }
    })


    contentImages.imagesUpload.forEach((imageFile, index) => {
      const refImage = storageRef.child('imagesGalery')

      let versionOldImage = {
        index: -1,
        url: '',
        name: ''
      }

      // eslint-disable-next-line
      post.imageGalery.map((oldVersion) => {
        if (oldVersion.index === imageFile.index) {
          versionOldImage.index = oldVersion.index
          versionOldImage.url = oldVersion.url
          versionOldImage.name = `${oldVersion.name}`
        }
      })

      if (versionOldImage.url.length > 0) {
        refImage.child(versionOldImage.name).delete()
          .then(() => {
            handleUploadImage(refImage, imageFile, contentImages, index, datasPost)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        handleUploadImage(refImage, imageFile, contentImages, index, datasPost)
      }
    })
  }

  function handleUploadImage(refImage: firebase.storage.Reference, imageFile: ModelUploadImg, contentImages: ContentImages, index: number, datasPost: ModelUpdateDatas) {
    const taskImage = refImage.child(imageFile.file.target.files![0].name).put(imageFile.file.target.files![0])

    taskImage.on('state_changed', function () { }, function (error) { console.log(error) }, function () {

      refImage.child(imageFile.file.target.files![0].name).getDownloadURL()
        .then((url) => {
          contentImages.imagesNotUpload = {
            ...contentImages.imagesNotUpload, [imageFile.index]: {
              url,
              index: imageFile.index,
              name: imageFile.name
            }
          }
        })
        .then(() => {
          if (index === contentImages.imagesUpload.length - 1) {
            const arrayImagesNotUp = Object.values(contentImages.imagesNotUpload)
            let newUrlList: ArrayImages = []
            arrayImagesNotUp.forEach((img) => {
              if (img.url.length > 0) {
                newUrlList = [...newUrlList, img]
              }
            });

            let newDatasPost = {
              newCapaUrl: datasPost.newCapaUrl,
              galeryImages: newUrlList,
              title: datasPost.title,
              category: datasPost.category,
              link: datasPost.link,
              autor: datasPost.autor,
              description: datasPost.description,
            }
            handleUpdateDatasPost(newDatasPost)
          }
        }
        )
        .catch((error) => {
          console.log(error)
        })
    })
  }

  function handleUploadCapa(capa: ModelCapa, storageRef: firebase.storage.Reference, datasPost: ModelUpdateDatas, isAllDatas?: boolean) {

    storageRef.child('capa').child('imageCapa').delete()
      .then(() => {
        const taskCapa = storageRef.child('capa').child('imageCapa')
        const taskUp = taskCapa.put(capa.file.target.files![0])

        taskUp.on('state_changed', function () { }, function (error) { console.log(error) }, function () {
          taskCapa.getDownloadURL()
            .then((newCapaUrl: string) => {
              let newDatasPost = {
                newCapaUrl: newCapaUrl,
                galeryImages: datasPost.galeryImages,
                title: datasPost.title,
                category: datasPost.category,
                link: datasPost.link,
                autor: datasPost.autor,
                description: datasPost.description,
              }

              if (isAllDatas) {
                handleUploadImagesGalery(storageRef, newDatasPost)
              } else {
                handleUpdateDatasPost(newDatasPost)
              }
            })
            .catch((error) => {
              console.log(error)
            })

        })
      })
      .catch((error) => {
        console.log(error)
      })
      .catch((error) => {
        console.log(error)
        toast.error("Erro ao atualizar <Capa>")
      })
  }

  async function handleUpdateDatasPost(newDatasPost: ModelUpdateDatas) {
    await firebase
      .firestore()
      .collection("posts")
      .doc(post.id)
      .update({
        user: post.user,
        created: post.created,
        title: newDatasPost.title,
        view: post.view,
        numberComments: post.numberComments,
        share: post.share,
        capaUrl: newDatasPost.newCapaUrl,
        id: post.id,
        categoria: newDatasPost.category,
        description: newDatasPost.description,
        avaliacao: post.avaliacao,
        imageGalery: newDatasPost.galeryImages,
        link: newDatasPost.link?.length > 0 ? newDatasPost.link : null,
        autor: newDatasPost.autor?.length > 0 ? newDatasPost.autor : null,
      })
      .then(() => {
        toast.success("Post atualizado com sucesso!");
        setGaleryFiles(DefaultObjectImages)
        setPageDash('inicio')
      })
      .catch((e) => {
        console.log(e);
        toast.error("Erro ao criar post!");
      });
  }

  async function getMessagens() {
    await firebase.database().ref('mensagens').on('value', (snapshot: firebase.database.DataSnapshot) => {
      if (snapshot.exists()) {
        const datasMsg: TypeMsg = Object.values(snapshot.val())
        setMensagens(datasMsg.reverse())
      }
    })
  }

  async function getContribuicoes() {
    await firebase.database().ref('contribuicoes').on('value', (snapshot: firebase.database.DataSnapshot) => {
      if (snapshot.exists()) {
        const datasContri: TypeContribuicoes = Object.values(snapshot.val())
        setContribuicoes(datasContri.reverse())
      }
    })
  }

  async function handlDeleteNotification(id: string, pageActive: string) {
    const response = window.confirm('Deseja deletar essa notificação?')

    if (response) {
      await firebase.database().ref(pageActive).child(id).remove()
        .then(() => {
          toast.success("Deletado com sucesso!")

          if (pageActive === 'mensagens') {
            let newListMsg: TypeMsg = []

            mensagens.forEach((msg) => {
              if (msg.id !== id) {
                newListMsg = [...newListMsg, msg]
              }
            })

            setMensagens(newListMsg)
          } else {
            let newListContri: TypeContribuicoes = []

            contribuicoes.forEach((contri) => {
              if (contri.id !== id) {
                newListContri = [...newListContri, contri]
              }
            })

            setContribuicoes(newListContri)
          }
        })
        .catch((error) => {
          console.log(error)
          toast.error("Erro ao deletar!")
        })
    } else {
      return
    }
  }

  async function signOut() {
    await firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('datasUser')
        setSigned(false)
      })
      .catch((error) => {
        console.log(error)
        toast.error("Erro ao sair!")
      })
  }

  async function resetPassword(email:string){
    if(email.length > 0){
      await firebase.auth().sendPasswordResetEmail(email)
      .then(()=>{
        toast.success("Link enviado! Verifique seu email.")
      })
      .catch((error)=>{
        console.log(error)
        toast.error("Falha ao redefinir senha!")
      })

    }else{
      toast.info("Digite seu email!")
    }
  }

  return (
    <BlogContext.Provider
      value={{
        postList,
        loading,
        webStructures,
        iconList,
        resultsFilter,
        filters,
        isEmpty,
        loadingMore,
        isPostsEmpty,
        post,
        comments,
        mark,
        localStorageDatas,
        localData,
        postTen,
        sectionActive,
        anchorEnable,
        isEmptyPost,
        userDatas,
        totalDatas,
        avalibleTot,
        manualAds,
        editAds,
        loadAds,
        downloadAds,
        file,
        galeryFiles,
        statusPopupEdit,
        pageDash,
        mensagens,
        contribuicoes,
        postAll,
        activePage,
        patrocinadores,
        signed,
        getPosts,
        getWebStructures,
        ToggleIconList,
        setResultsFilter,
        setFilter,
        handleShare,
        handleLoadMore,
        setIsPostsEmpty,
        handlePost,
        handleComments,
        setLoading,
        handleAddNewRate,
        handleMark,
        handlePublish,
        handlePostTen,
        setSectionActive,
        setIconList,
        setAnchorEnable,
        signInUser,
        getDatasUser,
        getTotPosts,
        setTotalDatas,
        addMembers,
        deletarMember,
        handleDeletarPost,
        handleContribuicoes,
        handleMessagens,
        registerPost,
        handleDeleteAds,
        getManualAds,
        handleCreatedAds,
        setEditAds,
        setLoadAds,
        getDownloadAds,
        setFile,
        updateConfig,
        updateGaleryFiles,
        setGaleryFiles,
        setStatusPopupEdit,
        setPageDash,
        handleEditPost,
        setPost,
        handleSaveEditPost,
        getMessagens,
        getContribuicoes,
        handlDeleteNotification,
        signOut,
        setActivePage,
        setPostAll,
        setPostList,
        getMembers,
        verificUser,
        resetPassword
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
