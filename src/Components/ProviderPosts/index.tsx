import { Card } from "../Global";
import { useContext } from "react";
import { BlogContext } from "../../Context";
import { Link } from "react-router-dom";
import { Post } from '../../Context/Types'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

// ==> Icons
import { AiOutlineEye } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { FiShare } from "react-icons/fi";

import Styled from "./providerPosts.module.css";

function ProviderPosts() {
  const { postList, iconList, resultsFilter, filters, handleShare } =
    useContext(BlogContext);

  return (
    <>
      {resultsFilter ? (
        iconList ? (
          //Rederiza em Lista
          <table className={Styled.table}>
            <thead>
              <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Autor</th>
                <th scope="col">Gênero</th>
                <th scope="col">Data</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {filters.map((Post: Post) => {
                return (
                  <tr key={Post.id}>
                    <td>
                      <Link to={`/projetoxis/post/${Post.id}`}>
                        <p>{Post.title}</p>
                      </Link>
                    </td>
                    <td>{Post.user}</td>
                    <td>{Post.categoria}</td>
                    <td>{format(parseISO(Post.created), "dd MMM yyyy", {
                      locale: ptBR,
                    })}</td>
                    <td>
                      <button
                        type="button"
                        className={Styled.share_list}
                        onClick={() =>
                          handleShare(Post.id, Post.title, Post.description)
                        }
                      >
                        <FiShare />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          //Rederiza em Cards

          filters.map((post: Post) => {
            return (
              <article key={post.id} className={Styled.containerCard}>
                <Card
                  className={Styled.post}
                  capa={post.capaUrl}
                  to={`/projetoxis/post/${post.id}`}
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
                            <span className={Styled.limit_size_view}>{post.view}</span>
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
                </Card>

                {/* Button Share */}
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
        )
      ) : iconList ? (
        //Rederiza em Lista
        <table className={Styled.table}>
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Autor</th>
              <th scope="col">Gênero</th>
              <th scope="col">Data</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {postList.map((post: Post) => {
              return (
                <tr key={post.id}>
                  <td>
                    <Link to={`/projetoxis/post/${post.id}`}>
                      <p>{post.title}</p>
                    </Link>
                  </td>
                  <td>{post.user}</td>
                  <td>{post.categoria}</td>
                  <td>{format(parseISO(post.created), "dd MMM yyyy", {
                    locale: ptBR,
                  })}</td>
                  <td>
                    <button
                      type="button"
                      className={Styled.share_list}
                      onClick={() =>
                        handleShare(post.id, post.title, post.description)
                      }
                    >
                      <FiShare />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        //Rederiza em Cards

        postList.map((post: Post) => {
          return (
            <article key={post.id} className={Styled.containerCard}>
              <Card
                className={Styled.post}
                capa={post.capaUrl}
                to={`/projetoxis/post/${post.id}`}
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
                <div className={Styled.post__footer}>
                  <h3>{post.title}</h3>
                  <hr />
                  <div className={Styled.post_action}>
                    <p>
                      <AiOutlineEye />
                      {post.view > 999 ? (
                        <>
                          <span className={Styled.limit_size_view}>{post.view}</span>
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
              </Card>

              {/* Button Share */}
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
      )}
    </>
  );
}

export default ProviderPosts;
