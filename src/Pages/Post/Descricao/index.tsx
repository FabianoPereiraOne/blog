import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../../../Context";
import Styled from "./descricao.module.css";
import { FiStar } from "react-icons/fi";
import { FaBookmark, FaUserCircle, FaStar } from "react-icons/fa";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Rating from "react-rating";
import { FiLock, FiUnlock } from "react-icons/fi";

type ModelDate = {
  date: string;
  hours: string;
};

function Descricao() {
  const {
    post,
    comments,
    avalibleTot,
    mark,
    localData,
    manualAds,
    webStructures,
    handleAddNewRate,
    handlePublish,
  } = useContext(BlogContext);

  const [dates, setDate] = useState({} as ModelDate);
  const [myComment, setMyComment] = useState<string>("");

  const [lockAvalible, setLockAvalible] = useState<boolean>(
    localData ? localData.stateLockRating : false
  );

  const [userName, setUserName] = useState<string>(
    localStorage.lockName || "Anonymous"
  );

  const [lock, setLock] = useState<boolean>(
    Boolean(localStorage.statusLockName) || false
  );

  const [star] = useState<number>(localData ? localData.ratingStars : 0);

  useEffect(() => {
    let date = format(new Date(), "dd MMM yyyy", { locale: ptBR });
    let hours = format(new Date(), "HH:mm", { locale: ptBR });
    setDate({ date, hours });

    const time = setInterval(() => {
      let newHours = format(new Date(), "HH:mm", { locale: ptBR });
      setDate({ date, hours: newHours });
    }, 60000);

    return () => {
      clearInterval(time);
    }

    // eslint-disable-next-line
  }, []);



  function handleAvaliar(rate: number) {
    setLockAvalible(true);
    handleAddNewRate(post.id, rate);
  }

  function prePubliish() {
    handlePublish(userName, myComment, dates);
    setMyComment("");
  }

  function handleSaveName() {
    if (lock !== false) {
      localStorage.removeItem("lockName");
      localStorage.removeItem("statusLockName");
      setLock(false);
    } else {
      localStorage.setItem("lockName", userName);
      localStorage.setItem("statusLockName", "true");
      setLock(true);
    }
  }

  useEffect(() => {
    let element = document.querySelector(".comment_view");
    element?.scroll(0, element.scrollHeight);
  }, [comments]);

  return (
    <section className={Styled.page_post}>
      <section className={Styled.post_descricao}>
        <article className={Styled.post_area_one}>
          <section className={Styled.post_datas}>
            <img src={post.capaUrl} alt="Capa do post" />
            <article className={Styled.datas_post}>
              <div>
                <strong>Titulo:</strong>
                <p>{post.title}</p>
              </div>
              <div>
                <strong>Avaliação:</strong>
                <p>
                  <Rating
                    start={0}
                    placeholderRating={avalibleTot}
                    placeholderSymbol={<FaStar />}
                    stop={5}
                    emptySymbol={<FiStar />}
                    readonly
                    className={Styled.totRating}
                  />
                </p>
              </div>
              <div>
                <strong>Categoria:</strong>
                <p>{post.categoria}</p>
              </div>
              <div>
                <strong>Download:</strong>
                <Link to={`/projetoxis/download/${post.id}`}>
                  Clique aqui <span>para visualizar</span>
                </Link>
              </div>
            </article>
          </section>
          <article className={Styled.view_description}>
            <p>{post.description}</p>
          </article>
        </article>
        <aside
          className={mark.length > 0 ? `${Styled.post_area_two}` : `${Styled.post_area_hidden}`}
        >
          {manualAds[2].id.length > 0 ?
            (
              <a
                rel="noreferrer"
                href={manualAds[2].link}
                key={manualAds[2].id}
                target="_blank"
                className={manualAds[2] !== undefined && manualAds[2] !== null ? "" : `${Styled.hiddenPicture}`}
              >
                <img
                  src={manualAds[2].capa}
                  alt={`nome do anuncio: ${manualAds[2].name}`}
                />
              </a>
            )
            :
            <Link to="/projetoxis/">
              <img src={webStructures.backgroundUrl} alt="Banner de capa" />
            </Link>
          }

          {mark.length > 0 && <h3>Veja também:</h3>}

          {mark.length > 0
            && mark.map((post, index) => {
              return (
                <div key={index}>
                  <FaBookmark />
                  <Link to={`/projetoxis/post/${post.id}`}>{post.title}</Link>
                </div>
              );
            })}
        </aside>
      </section>
      <section className={Styled.post_comments}>
        <h2>Faça um comentário</h2>
        <article className={Styled.comment}>
          <div className={Styled.comment_action}>
            <article className={Styled.commment_user}>
              <FaUserCircle className={Styled.icon_user} />
              <input
                type="text"
                placeholder="Seu nome"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                maxLength={47}
              />
              <button type="button" onClick={handleSaveName}>
                {lock === true ? <FiLock /> : <FiUnlock />}
              </button>
              <span className={Styled.data_time}>
                <time dateTime={dates.date}>{dates.date}</time>
                <time dateTime={dates.hours}>{dates.hours}</time>
              </span>
            </article>
            <article className={Styled.comment_input}>
              <div className={Styled.comment_avalible}>
                <p>Avaliar:</p>
                <Rating
                  className={Styled.rating}
                  start={0}
                  stop={5}
                  emptySymbol={<FiStar />}
                  fullSymbol={<FaStar />}
                  initialRating={lockAvalible ? star : 0}
                  placeholderSymbol={<FaStar />}
                  onClick={(rate) => handleAvaliar(rate)}
                  readonly={lockAvalible}
                />
              </div>
              <textarea
                placeholder="Escreva algo..."
                maxLength={412}
                value={myComment}
                onChange={(e) => setMyComment(e.target.value)}
              />
              <button type="button" onClick={prePubliish}>
                Publicar
              </button>
            </article>
          </div>
          <div className={Styled.comment_view}>
            {comments.length !== 0 ? (
              comments.map((comment, index) => {
                return (
                  <article key={index} className={Styled.comment_card}>
                    <p>
                      <FaUserCircle />
                      {comment.userName}
                    </p>
                    <p>{comment.comentario}</p>
                    <span className={Styled.comment_view_date}>
                      <time dateTime={comment.data}>{comment.data}</time>
                      <time dateTime={comment.hours}>{comment.hours}</time>
                    </span>
                  </article>
                );
              })
            ) : (
              <div className={Styled.comment_empty}>
                <span>Nenhum comentario</span>
              </div>
            )}
          </div>
        </article>
      </section>
    </section>
  );
}

export default Descricao;
