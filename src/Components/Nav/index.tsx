import { Link, Redirect } from "react-router-dom";
import Styled from './nav.module.css'
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { BlogContext } from "../../Context";
import { Post } from '../../Context/Types'

function Nav(active: any) {
  const [search, setSearch] = useState("");

  const {
    postList,
    setResultsFilter,
    setFilter,
  } = useContext(BlogContext);

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

      return <Redirect to={`/projetoxis/post/${id}`}/>
    } else {
      return
    }
  }

  return (
    <nav className={Styled.nav}>
      <Link to="/projetoxis/">
        Todos posts
      </Link>
      <Link
        to="/projetoxis/posts/top-10"
        className={active === "top" ? `${Styled.anchorActive}` : ""}
      >
        Top 10
      </Link>
      <Link
        to="/projetoxis/posts/envio-arquivo"
        className={active === "archive" ? `${Styled.anchorActive}` : ""}
      >
        Enviar arquivo
      </Link>

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
  );
}

export default Nav;
