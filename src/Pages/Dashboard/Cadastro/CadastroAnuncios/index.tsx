import Styled from "./cadastroAnuncios.module.css";
import {
  FaRegImages,
  FaTimes,
  FaSave
} from "react-icons/fa";
import { useEffect, useContext, useState } from "react";
import { BlogContext } from "../../../../Context";
import ManualAds from "./ManualAds";
import DownloadAds from "./DownloadAds";

export default function CadastroAnuncios() {
  const { file, getDownloadAds, getManualAds, handleCreatedAds, editAds, setEditAds,setLoading } = useContext(BlogContext);
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    setLoading(true)
    try {
      getManualAds();
      getDownloadAds()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className={Styled.containerAds}>
      <div className={Styled.containerAds_center}>
        <section className={Styled.sectionAds}>
          <article>
            <h3>
              {" "}
              <FaRegImages /> Anuncios | Blog
            </h3>
            <hr />
          </article>

          <div className={Styled.config_ads_one}>

            <ManualAds />
            {
              editAds ?
                (
                  <div className={Styled.editAds}>

                    <form onSubmit={(e) => {
                      e.preventDefault()
                      handleCreatedAds(name, link, file)
                      setName('')
                      setLink('')
                    }}>
                      <div className={Styled.form_group}>
                        <input placeholder="Nome da campanhia (*)" type="text" value={name} onChange={e => setName(e.target.value)} />
                      </div>
                      <div className={Styled.form_group}>
                        <input placeholder="Link da campanhia (*)" type="text" value={link} onChange={e => setLink(e.target.value)} />
                      </div>

                      <div className={Styled.button_group}>
                        <button type="submit">
                          <FaSave />
                          <span>Salvar</span>
                        </button>
                        <button onClick={() => setEditAds(false)}>
                          <FaTimes />
                          <span>Fechar</span>
                        </button>
                      </div>

                    </form>
                  </div>
                )
                :
                ''
            }
          </div>
        </section>
        <section className={Styled.sectionAds}>
          <article>
            <h3>
              {" "}
              <FaRegImages /> Anuncios | Download
            </h3>
            <hr />
          </article>

          <div className={Styled.config_ads_two}>
            <DownloadAds />
          </div>
        </section>
      </div>
    </section>
  );
}
