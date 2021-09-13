import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { BlogContext } from "../../Context";
import { fireload } from "../../Services/firebaseConection";
import { Main, BtnPrivate } from "../../Components/Global";
import { FaUserLock } from "react-icons/fa";

import logo from "../../assets/logo.svg";
import Galeria from "./Galeria";
import Sugestoes from "./Sugestoes";
import Descricao from "./Descricao";
import Patrocinadores from "./Patrocinadores";
import Top from "./Top";
import Footer from "../../Components/Footer";
import Envio from './Envio'

import Styled from "./post.module.css";
import Loading from "../../Components/Loading";

type Id = {
  id: string;
};

function Post() {
  const { id } = useParams<Id>();
  const { sectionActive, setSectionActive } = useContext(BlogContext)

  const {
    post,
    loading,
    webStructures,
    postList,
    handleComments,
    handleMark,
    handlePost,
    getWebStructures,
    getMembers,
    getPosts,
    setLoading
  } = useContext(BlogContext);

  useEffect(() => {
    setLoading(true)
    try {
      fireload();
      getPosts()
      handlePost(id);
      handleComments(id);
      getMembers()
      handleScroll();
      getWebStructures()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    handlePost(id);
    handleComments(id);
    getMembers()
    // eslint-disable-next-line
  }, [id])

  function handleScroll() {
    let element = document.querySelector(".page");
    element?.scrollIntoView();
  }

  useEffect(() => {
    if (postList.length > 0) {
      handleMark();
    }
    // eslint-disable-next-line
  }, [postList]);

  function handlePageActive(page: string) {
    setSectionActive(page);
  }

  if (!loading) {
    return (
      <div className={Styled.page}>
        <Main
          className={Styled.contentHeaderPost}
          background={post.capaUrl && post.capaUrl}
        >
          <header>
            <Link to="/projetoxis/" className={Styled.logoPost}>
              <img
                src={webStructures.logoUrl ? `${webStructures.logoUrl}` : logo}
                alt="Logo do blog"
              />
              <strong>
                {webStructures.logoName
                  ? `${webStructures.logoName}`
                  : "BlogPlay"}
              </strong>
            </Link>

            <BtnPrivate to="/projetoxis/private/login">
              <FaUserLock />
              Acessar
            </BtnPrivate>
          </header>
        </Main>

        <nav className={Styled.nav_post}>
          {sectionActive === 'inicio' ?
            (
              <Link
                to="/projetoxis/"
                className={Styled.active}
              >
                Inicio
              </Link>
            )
            :
            (
              <Link
                to="#"
                onClick={() => handlePageActive("inicio")}
                className={sectionActive === "inicio" ? `${Styled.active}` : ""}
              >
                Inicio
              </Link>
            )}
          <Link
            to="#"
            onClick={() => handlePageActive("galeria")}
            className={sectionActive === "galeria" ? `${Styled.active}` : ""}
          >
            Galeria
          </Link>
          <Link
            to="#"
            onClick={() => handlePageActive("sugestoes")}
            className={sectionActive === "sugestoes" ? `${Styled.active}` : ""}
          >
            Sugestoes
          </Link>
          <Link
            to="#"
            onClick={() => handlePageActive("envio")}
            className={sectionActive === "envio" ? `${Styled.active}` : ""}
          >
            Enviar arquivo
          </Link>
          <Link
            to="#"
            onClick={() => handlePageActive("patrocinadores")}
            className={sectionActive === "patrocinadores" ? `${Styled.active}` : ""}
          >
            Patrocinadores
          </Link>
          <Link
            to="#"
            onClick={() => handlePageActive("top")}
            className={sectionActive === "top" ? `${Styled.active}` : ""}
          >
            Top 10
          </Link>
        </nav>


        {sectionActive === "inicio" ? (
          <Descricao />
        ) : sectionActive === "galeria" ? (
          <Galeria />
        ) : sectionActive === "sugestoes" ? (
          <Sugestoes />
        ) : sectionActive === "patrocinadores" ? (
          <Patrocinadores />
        ) : sectionActive === "envio" ? (
          <Envio />
        ) : (
          <Top />
        )}

        <Footer />
      </div>
    );
  } else {
    return <Loading />
  }
}

export default Post;
