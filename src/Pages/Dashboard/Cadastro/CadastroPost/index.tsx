import Styled from "./cadastro_post.module.css";
import { FaPlus } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import { BlogContext } from "../../../../Context";
import { toast } from "react-toastify";
import { CapaUpload, LabelUpload } from "../../../../Components/Global";
import { FaRegTimesCircle, FaPlusCircle } from "react-icons/fa";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { DefaultObjectImages } from "../../../../Context/DefaultObjects";

export default function CadastroPost() {
  const [capa, setCapa] = useState({
    file: {} as React.ChangeEvent<HTMLInputElement>,
    url: "",
  });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [autor, setAutor] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const {
    registerPost,
    galeryFiles,
    updateGaleryFiles,
    setGaleryFiles,
    setLoading
  } = useContext(BlogContext);

  useEffect(() => {
    getDate();
    setGaleryFiles(DefaultObjectImages)
    // eslint-disable-next-line
  }, []);

  function previousCapa(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/jpeg"
      ) {
        setCapa({
          file: e,
          url: URL.createObjectURL(e.target.files[0]),
        });
      } else {
        toast.info("Tipo invalido[ PNG ou JPG ]");
      }
    } else {
      return;
    }
  }

  function getDate() {
    let response = format(new Date(), "yyyy-MM-dd HH:mm", {
      locale: ptBR,
    });

    setDate(response);
  }

  function clearInputs() {
    setTitle("");
    setCategory("");
    setLink("");
    setAutor("");
    setDescription("");
    setCapa({ file: {} as React.ChangeEvent<HTMLInputElement>, url: "" });
    setGaleryFiles(DefaultObjectImages);
  }

  return (
    <form
      className={Styled.section_cadastro_center}
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true)
        try {
          registerPost(title, autor, category, link, description, capa, date);
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
        clearInputs();
      }}
    >
      <div className={Styled.row_one}>
        {capa.url.length > 0 ? (
          <CapaUpload className={Styled.capa} background={capa.url}>
            <button
              onClick={() => {
                setCapa({
                  file: {} as React.ChangeEvent<HTMLInputElement>,
                  url: "",
                });
              }}
              className={Styled.clear_capa}
            >
              <FaRegTimesCircle />
            </button>
          </CapaUpload>
        ) : (
          <CapaUpload className={Styled.capa} background={"transparent"}>
            <input type="file" hidden onChange={(e) => previousCapa(e)} />
            <strong>Clique aqui </strong> para adicionar uma capa ao post(*)
          </CapaUpload>
        )}

        <div className={Styled.content_input_group}>
          <div className={Styled.input_group}>
            <label>Titulo(*)</label>
            <input
              type="text"
              name="titulo"
              maxLength={100}
              placeholder="Titulo do post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={Styled.input_group}>
            <label>Autor( opcional )</label>
            <input
              type="text"
              name="autor"
              maxLength={100}
              placeholder="Autor da publicação"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
          </div>
          <div className={Styled.input_group}>
            <label>Categoria(*)</label>
            <input
              type="text"
              name="categoria"
              maxLength={100}
              placeholder="Digite a categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className={Styled.input_group}>
            <label>Link( opcional )</label>
            <input
              type="text"
              name="link"
              maxLength={100}
              placeholder="Link de download"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>
        <div className={Styled.descricao_post}>
          <label>Descrição(*)</label>
          <textarea
            placeholder="Escreva alguma descrição"
            name="descricao"
            maxLength={2000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className={Styled.row_two}>
        <div className={Styled.content_title}>
          <h2>Galeria de imagens</h2>
          <hr />
        </div>

        <div className={Styled.upload_images}>
          {Object.values(galeryFiles).map((img, index) => {
            if (img.url.length > 0) {
              return (
                <LabelUpload key={index.toString()} background={img.url}>
                  <button
                    className={Styled.clear_capa}
                    onClick={() =>
                      setGaleryFiles({
                        ...galeryFiles,
                        [index]: { file: {}, url: "", index },
                      })
                    }
                  >
                    <FaRegTimesCircle />
                  </button>
                </LabelUpload>
              );
            } else {
              return (
                <LabelUpload
                  key={index.toString()}
                  background={"transparent"}
                >
                  <input
                    type="file"
                    hidden
                    onChange={(e) => updateGaleryFiles(e, index)}
                  />
                  <FaPlus />
                </LabelUpload>
              );
            }
          })}
        </div>
      </div>
      <div className={Styled.row_three}>
        <button type="submit">
          <FaPlusCircle />
          Cadastrar
        </button>
      </div>
    </form>
  );
}
