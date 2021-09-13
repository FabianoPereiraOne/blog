import { useEffect, useContext, useState } from "react";
import { BlogContext } from "../../Context";
import { fireload } from "../../Services/firebaseConection";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import { Post } from '../../Context/Types'
import { FiColumns } from "react-icons/fi";
import { RiPlayList2Fill } from "react-icons/ri";
import { BannerAds } from '../../Components/Global'

import Header from "../../Components/Header";
import ProviderPosts from "../../Components/ProviderPosts";
import Footer from "../../Components/Footer";
import Styled from "./home.module.css";
import Empty from "../../Components/Empty";
import "@emotion/react";
import Loading from "../../Components/Loading";


function Home() {
  const [search, setSearch] = useState("");

  const {
    postList,
    iconList,
    isEmpty,
    loadingMore,
    isPostsEmpty,
    manualAds,
    loading,
    getPosts,
    getManualAds,
    getWebStructures,
    ToggleIconList,
    handleLoadMore,
    handleMark,
    setResultsFilter,
    setFilter,
    setIconList,
    setLoading
  } = useContext(BlogContext);

  useEffect(() => {
    setLoading(true)
    try {
      fireload()
      getPosts();
      getManualAds()
      getWebStructures()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

    if (postList.length > 0) {
      handleMark();
    }

    //eslint-disable-next-line
  }, []);

  function preSearch(search: string) {
    if (search.length === 0) {
      return;
    } else {
      try {
        handleSearch(search);
      } catch (erro) {
        toast.error("Erro ao pesquisar :C");
        console.error(erro);
      }

      setSearch("");
    }
  }

  function handleSearch(search: string) {
    let toSearchCase = search.toUpperCase();

    let resFilter = postList.filter((item: Post) => {
      if (item.title.toUpperCase().includes(toSearchCase)) {
        return item;
      } else if (item.created.toUpperCase().includes(toSearchCase)) {
        return item;
      } else {
        return null;
      }
    });

    setFilter(resFilter);

    if (resFilter.length === 0) {
      toast.info("Nenhum post encontrado!");
      setResultsFilter(false);
    } else if (resFilter.length === 1) {
      setResultsFilter(false);

      let id = null;
      resFilter.forEach((post: Post) => {
        id = post.id;
      });

      return <Redirect to={`/projetoxis/post/${id}`} />
    } else {
      setResultsFilter(true);
    }
  }

  function handleDefaultPosts() {
    setResultsFilter(false);
    setIconList(false);
  }

  if (!loading) {
    return (
      <div className={Styled.page}>
        <Header />
        <nav className={Styled.nav}>
          <button type="button" onClick={handleDefaultPosts}>
            Todos posts
          </button>
          <Link to="/projetoxis/posts/top-10">Top 10</Link>
          <Link to="/projetoxis/posts/envio-arquivo">Enviar arquivo</Link>
          <div className={Styled.input_group}>
            <input
              type="text"
              placeholder="Digite uma palavra chave..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="button" onClick={() => preSearch(search)}>
              Pesquisar
            </button>
          </div>
        </nav>

        {!isPostsEmpty && (
          <section className={Styled.iconList}>
            <button type="button" onClick={ToggleIconList}>
              {iconList ? <FiColumns /> : <RiPlayList2Fill />}
            </button>
          </section>
        )}
        <picture className={manualAds[0].name.length > 0 ? ` ${Styled.adsense}` : `${Styled.hiddenPicture}`}>
          {manualAds[0].name.length > 0 &&
            (
              <BannerAds rel="noreferrer"
                href={manualAds[0].link}
                key={manualAds[0].id}
                target="_blank" background={manualAds[0].capa} />
            )
          }
        </picture>
        <section className={Styled.container_cards_posts}>
          <div className={Styled.card_posts}>
            {isPostsEmpty ? (
              <Empty />
            ) : (
              <ProviderPosts />
            )}
          </div>
        </section>
        {!isEmpty && !loadingMore && (
          <button className={Styled.loadMore} type="button" onClick={handleLoadMore}>
            {loadingMore ? "Carregando..." : "Carregar mais"}
          </button>
        )}
        <picture className={manualAds[1].name.length > 0 ? `${Styled.adsense}` : `${Styled.hiddenPicture}`}>
          {manualAds[1].name.length > 0 &&
            (
              <BannerAds rel="noreferrer"
                href={manualAds[1].link}
                key={manualAds[1].id}
                target="_blank" background={manualAds[1].capa} />
            )
          }
        </picture>
        <Footer />
      </div>
    );
  } else {
    return <Loading />
  }
}

export default Home;
