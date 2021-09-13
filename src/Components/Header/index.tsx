import { Main, BtnPrivate } from "../../Components/Global";
import { FaUserLock } from "react-icons/fa";
import { BlogContext } from "../../Context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Styled from './header.module.css'
import logo from "../../assets/logo.svg";
import fundoState from "../../assets/background.jpg";

function Header(){
    const {
        webStructures,
      } = useContext(BlogContext);

    return(
        <Main
          className={ Styled.containerHeader }
          background={
            webStructures.backgroundUrl
              ? webStructures.backgroundUrl
              : fundoState
          }
        >
          <header>
            <Link to="/projetoxis/" className={ Styled.logo }>
              <img
                src={webStructures.logoUrl ? webStructures.logoUrl : logo}
                alt="Logo do blog"
              />
              <strong>
                {webStructures.logoName
                  ? webStructures.logoName
                  : "Blog Play"}
              </strong>
            </Link>

            <BtnPrivate to="/projetoxis/private/login">
              <FaUserLock />
              Acessar
            </BtnPrivate>
          </header>
          <article className={ Styled.title }>
            <div
              className={
                webStructures.title === "" ? `${ Styled.title_disabled }` : `${ Styled.center_title }`
              }
            >
              {webStructures.title ? (
                <h1>{webStructures.title}</h1>
              ) : (
                <h1>
                  <strong>VEJA HOJE</strong> as musicas mais tocadas em todo
                  Mundo em um só lugar.
                </h1>
              )}
            </div>
          </article>
        </Main>
    )
}

export default Header