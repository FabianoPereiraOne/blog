import {
  FaTrashAlt,
  FaUserGraduate,
  FaPlusCircle,
  FaRegTimesCircle,
} from "react-icons/fa";
import {
  FiEye,
  FiMessageCircle,
  FiStar,
  FiShare2,
  FiTrash2,
  FiEdit
} from "react-icons/fi";
import Styled from "./inicio.module.css";
import { useContext, useState } from "react";
import { BlogContext } from "../../../Context";
import { toast } from "react-toastify";
import emptyClient from "../../../assets/empty_client.svg";
import { Post } from '../../../Context/Types'

function Inicio() {
  const { postAll,
    totalDatas,
    patrocinadores,
    handleEditPost,
    addMembers,
    deletarMember,
    handleDeletarPost,
    getMembers
  } =
    useContext(BlogContext);
  const [isAddMembers, setIsAddMembers] = useState(false);
  const [statusPopupMembers, setStatusPopupMembers] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleAddMembers(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name !== "" && link !== "") {
      addMembers(name, link);
      setName("");
      setLink("");
    } else {
      toast.info("Preencha todos os dados!");
    }
  }

  function deleteMembers(id: string) {
    const response = window.confirm("Deseja excluir esse patrocinador?")
    if (response === true) {
      deletarMember(id)
    } else {
      return
    }
  }

  function deletePost(id: string) {
    const response = window.confirm("Deseja excluir esse post?")
    if (response === true) {
      handleDeletarPost(id)
    } else {
      return
    }
  }

  function handleViewMembers() {
    getMembers()
    setStatusPopupMembers(true)
  }
  return (
    <section className={Styled.section_inicio_dash}>
      <section className={Styled.section_datas_tot}>
        <button
          type="button"
          onClick={() => setIsAddMembers(!isAddMembers)}
          className={Styled.toogleMembers}
        >
          <strong>Clique aqui</strong> para{" "}
          {isAddMembers ? "fechar" : "adicionar"} patrocinadores
        </button>

        {!isAddMembers ? (
          <div className={Styled.content_datas}>
            <section className={Styled.content_datas_row}>
              <p>
                <FiEye />
                <label>Total de views:</label>
              </p>
              <p>{totalDatas.views ? totalDatas.views : 0}</p>
            </section>
            <section className={Styled.content_datas_row}>
              <p>
                <FiMessageCircle />
                <label>Total de comentários:</label>
              </p>
              <p>{totalDatas.comments ? totalDatas.comments : 0}</p>
            </section>
            <section className={Styled.content_datas_row}>
              <p>
                <FiStar />
                <label>Total de avaliações:</label>
              </p>
              <p>{totalDatas.rating ? totalDatas.rating : 0}</p>
            </section>
            <section className={Styled.content_datas_row}>
              <p>
                <FiShare2 />
                <label>Total de Share:</label>
              </p>
              <p>{totalDatas.share ? totalDatas.share : 0}</p>
            </section>
          </div>
        ) : (
          <form className={Styled.content_form} onSubmit={handleAddMembers}>
            <div className={Styled.form_group}>
              <label>Nome(*)</label>
              <input
                type="text"
                maxLength={30}
                value={name}
                placeholder="Digite o nome"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={Styled.form_group}>
              <label>Website(*)</label>
              <input
                type="text"
                maxLength={70}
                value={link}
                placeholder="Https://www.blog.com.br"
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <button type="submit">
              <FaPlusCircle />
              adicionar
            </button>
            <button type="button" onClick={handleViewMembers}>
              <FaUserGraduate />
              Visualizar
            </button>
          </form>
        )}
      </section>
      <section className={Styled.section_view_posts}>
        <ul className={Styled.container_posts}>
          {postAll.length > 0 ? postAll.map((Post: Post, index) => {
            return (
              <li key={index.toString()} className={Styled.post_row}>
                <div className={Styled.content_title}>
                  <p>{Post.title}</p>
                </div>

                <div className={Styled.post_action}>
                  <a  rel="noreferrer" href={ `/projetoxis/post/${Post.id}` }>
                    <FiEye />
                  </a>
                  <button type="button" onClick={() => handleEditPost(Post.id)}>
                    <FiEdit />
                  </button>
                  <button type="button" onClick={() => deletePost(Post.id)}>
                    <FiTrash2 />
                  </button>
                </div>
              </li>
            );
          }) : (
            <li className={Styled.empty_posts}>
              <img src={emptyClient} alt="Nenhum post disponivel" />
              <span>Nenhum post disponivel</span>
            </li>
          )}
        </ul>
      </section>

      {statusPopupMembers ? (
        <div className={Styled.popup_members}>
          <ul>
            <button
              type="button"
              className={Styled.btnCircle_close}
              onClick={() => setStatusPopupMembers(false)}
            >
              <FaRegTimesCircle />
            </button>
            {patrocinadores.length > 0 ? (
              patrocinadores.reverse().map(
                (member, index) => {
                  return (
                    <li key={index.toString()}>
                      <div className={Styled.member_group}>
                        <strong>Nome: </strong>
                        <label>{member.name}</label>
                      </div>
                      <div className={Styled.member_group}>
                        <strong>Website: </strong>
                        <a href={member.link} target="_black">
                          {member.link}
                        </a>
                      </div>
                      <button className={Styled.btn_del} type="button" onClick={() => deleteMembers(member.id)}>
                        <FiTrash2 />
                      </button>
                      <button className={Styled.btn_mobile} type="button" onClick={() => deleteMembers(member.id)}>
                        <FaTrashAlt />
                        <span>Deletar</span>
                      </button>
                      <hr />
                    </li>
                  );
                }
              )
            ) : (
              <li className={Styled.emptyClient}>
                <img
                  src={emptyClient}
                  alt="Imagem de nenhum cliente disponivel"
                />
                <span>Nenhum membro disponivel</span>
              </li>
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default Inicio;
