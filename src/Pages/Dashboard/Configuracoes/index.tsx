import { LabelBackground, LabelLogo } from "../../../Components/Global";
import Styled from "./configuracoes.module.css";
import { FaUpload, FaDesktop, FaRegTimesCircle, FaEraser, FaSave } from "react-icons/fa";
import { useContext, useState } from "react";
import { BlogContext } from "../../../Context";
import { toast } from "react-toastify";

function Configuracoes() {
  const { updateConfig } = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [logoName, setLogoName] = useState("");
  const [logo, setLogo] = useState({ file: "" });
  const [background, setBackground] = useState({ file: "" });
  const [backgroundFile, setBackgroundFile] = useState({ file: {} as React.ChangeEvent<HTMLInputElement> });
  const [logoFile, setLogoFile] = useState({ file: {} as React.ChangeEvent<HTMLInputElement> });

  function preview(file:React.ChangeEvent<HTMLInputElement>, ref: string) {
    if(file.target.files !== null){
      if (file.target.files[0]) {
        if (
          file.target.files[0].type === "image/png" ||
          file.target.files[0].type === "image/jpg" ||
          file.target.files[0].type === "image/jpeg"
        ) {
          if (ref === "logo") {
            const url = URL.createObjectURL(file.target.files[0]);
            setLogo({ file: url });
            setLogoFile({ file: file });
          } else {
            const url = URL.createObjectURL(file.target.files[0]);
            setBackground({ file: url });
            setBackgroundFile({ file: file });
          }
        } else {
          toast.info("Formato invalido! [ PNG ou JPG ]");
          return;
        }
      } else {
        return;
      }
    }
  }

  function clearInputs() {
    setTitle("");
    setLogoName("");
    setBackground({ file: "" });
    setBackgroundFile({ file: {} as React.ChangeEvent<HTMLInputElement> });
    setLogo({ file: "" });
    setLogoFile({ file: {} as React.ChangeEvent<HTMLInputElement> });
  }

  function clearImages(ref: string) {
    if (ref !== 'logo') {
      setBackground({ file: "" });
      setBackgroundFile({ file: {} as React.ChangeEvent<HTMLInputElement>});
    } else {
      setLogo({ file: "" });
      setLogoFile({ file: {} as React.ChangeEvent<HTMLInputElement> });
    }
  }

  return (
    <section className={Styled.containerConfig}>
      <form
        className={Styled.config_center}
        onSubmit={(e) => {
          e.preventDefault();
          updateConfig(title, logoName, logoFile, backgroundFile);
          clearInputs();
        }}
      >
        <h2>Website | alterações</h2>
        <div className={Styled.form_title}>
          <label>Titulo(*)</label>
          <input
            maxLength={ 70 }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o titulo principal"
            type="text"
          />
        </div>
        <div className={Styled.form_logo}>
          <div className={Styled.input_group}>
            <label>Nome(*)</label>
            <input
              value={logoName}
              maxLength={10}
              onChange={(e) => setLogoName(e.target.value)}
              placeholder="Nome da marca"
              type="text"
            />
          </div>
          <LabelLogo
            background={logo.file !== "" ? logo.file : "transparent"}
            className={Styled.file_upload}
          >
            {logo.file !== "" ? (
              <button type="button" onClick={() => clearImages('logo')}>
                <FaRegTimesCircle />
              </button>
            ) : (
              <>
                <FaUpload />
                <input
                  type="file"
                  onChange={(e) => preview(e, "logo")}
                  hidden
                />
              </>
            )}
          </LabelLogo>
        </div>
        <div className={Styled.content_banner}>
          <LabelBackground
            background={
              background.file !== "" ? background.file : "transparent"
            }
            className={Styled.file_banner}
          >
            {background.file !== "" ? (
              <button type="button" onClick={() => clearImages('banner')}>
                <FaRegTimesCircle />
              </button>
            ) : (
              <>
                <FaDesktop />
                <span>
                  <strong>Clique</strong> para trocar o banner principal
                </span>
                <input
                  type="file"
                  onChange={(e) => preview(e, "background")}
                  hidden
                />
              </>
            )}
          </LabelBackground>
        </div>
        <div className={Styled.button_group}>
          <button type="button" onClick={clearInputs}>
            <FaEraser />
            Limpar
          </button>
          <button type="submit">
            <FaSave />
            Salvar
          </button>
        </div>
      </form>
    </section>
  );
}

export default Configuracoes;
