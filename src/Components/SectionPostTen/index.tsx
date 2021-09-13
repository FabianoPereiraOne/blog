import Styled from './sectionPostTen.module.css'
import { Post } from '../../Context/Types'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { CardTop } from "../../Components/Global";
import { FiShare } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { BlogContext } from "../../Context";
import { useContext } from "react";
import { Redirect } from 'react-router-dom'
import Empty from '../Empty';

function SectionPostTen() {
  const {
    postTen,
    handleShare,
    handlePost,
    setSectionActive,
  } = useContext(BlogContext);

  function handleRedirect(id: string) {
    handlePost(id);
    setSectionActive("inicio");
    handleScroll();
    return <Redirect to={`/projetoxis/post/${id}`} />
  }

  function handleScroll() {
    let element = document.querySelector(".page");
    element?.scrollIntoView();
  }

  return (
    <section className={Styled.section_post_ten}>
      <h2>Mais curtidos</h2>
      <h4>Veja os 10 posts mais curtidos do momento.</h4>

      <section className={Styled.containerCardTen}>
        {postTen.length > 0 ? (
          postTen.map((post: Post) => {
            return (
              <article key={post.id} className={Styled.containerCard}>
                <CardTop
                  className={Styled.post}
                  capa={post.capaUrl}
                  onClick={() => handleRedirect(post.id)}
                >
                  <div className={Styled.post_header}>
                    <p>{post.user}</p>
                    <p>
                      <span>{format(parseISO(post.created), "dd MMM yyyy", {
                        locale: ptBR,
                      })}</span>
                      <time>{format(parseISO(post.created), "HH:mm", {
                        locale: ptBR,
                      })}</time>
                    </p>
                  </div>
                  <div className={Styled.post_footer}>
                    <h3>{post.title}</h3>
                    <hr />
                    <div className={Styled.post_action}>
                      <p>
                        <AiOutlineEye />
                        {post.view > 999 ? (
                          <>
                            <span className={Styled.limit_size_view}>
                              {post.view}
                            </span>
                            <span>+</span>
                          </>
                        ) : (
                          `${post.view}`
                        )}
                      </p>
                      <p>
                        <BiMessageDetail />
                        {post.numberComments > 999 ? (
                          <>
                            <span className={Styled.limit_size_comments}>
                              {post.numberComments}
                            </span>
                            <span>+</span>
                          </>
                        ) : (
                          `${post.numberComments}`
                        )}
                      </p>
                    </div>
                  </div>
                </CardTop>

                <button
                  type="button"
                  className={Styled.share}
                  onClick={() =>
                    handleShare(post.id, post.title, post.description)
                  }
                >
                  <FiShare />
                </button>
              </article>
            );
          })
        ) : (
          <Empty />
        )}
      </section>
    </section>
  )
}

export default SectionPostTen