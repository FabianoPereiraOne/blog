import { CapaUpload, LabelUpload } from "../../../Components/Global";
import { FaRegTimesCircle, FaPlus, FaSave } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { BlogContext } from "../../../Context";
import Styled from "./editPost.module.css";
import { toast } from "react-toastify";
import { DefaultObjectImages } from "../../../Context/DefaultObjects";

function EditPost() {
  const { galeryFiles, post, setGaleryFiles, updateGaleryFiles, setPageDash, handleSaveEditPost } =
    useContext(BlogContext);
  const [capa, setCapa] = useState({
    file: {} as React.ChangeEvent<HTMLInputElement>,
    url: "",
  });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [autor, setAutor] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    handleSetPost();
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

  function handleSetPost() {
    setTitle(post.title);
    setCategory(post.categoria);
    setLink(post.link);
    setAutor(post.autor);
    setDescription(post.description);
    setCapa({
      file: {} as React.ChangeEvent<HTMLInputElement>,
      url: post.capaUrl,
    });

    let images = DefaultObjectImages
    post.imageGalery.forEach((image) => {
      images = ({
        ...images, [image.index]: {
          file: {} as React.ChangeEvent<HTMLInputElement>,
          url: image.url,
          index: image.index,
          name: image.name
        }
      })
    })

    setGaleryFiles(images)
  }

  function handleCancelEditPost() {
    setTitle('');
    setCategory('');
    setLink('');
    setAutor('');
    setDescription('');
    setCapa({
      file: {} as React.ChangeEvent<HTMLInputElement>,
      url: '',
    });
    setGaleryFiles(DefaultObjectImages)
    setPageDash('inicio')
  }

  return (
    <section className={Styled.section_Edit_center}>
      <h3>Edição</h3>
      <form className={Styled.form_Edit_center} onSubmit={(e) => {
        e.preventDefault()
        if (title.length > 0 && category.length > 0 && description.length > 0 && capa.url.length > 0) {
          handleSaveEditPost(capa, title, category, link, autor, description)
        } else {
          toast.info("Preencha todos os campos!")
        }
      }}>
        <div className={Styled.row_one_edit}>
          {capa.url.length > 0 ? (
            <CapaUpload className={Styled.capa} background={capa.url}>
              <button
                className={Styled.clearCapa}
                onClick={() => {
                  setCapa({
                    file: {} as React.ChangeEvent<HTMLInputElement>,
                    url: "",
                  });
                }}
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
                maxLength={35}
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
                maxLength={35}
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
                maxLength={35}
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
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className={Styled.row_two_edit}>
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
                      className={Styled.clearCapa}
                      onClick={() =>
                        setGaleryFiles({
                          ...galeryFiles,
                          [index]: { file: {} as React.ChangeEvent<HTMLInputElement>, url: "", index },
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
        <div className={Styled.row_three_edit}>
          <button type="submit">
            <FaSave />
            Salvar
          </button>
          <button type="button" onClick={handleCancelEditPost}>
            X Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditPost;
