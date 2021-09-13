import { Link } from "react-router-dom"
import erro from '../../assets/error-404.svg'
import Styled from './erro.module.css'

function Erro() {
    return (
        <section className={Styled.not_found}>
            <img src={erro} alt="Imagem de pagina não encontrada" />
            <h2>|Pagina não encontrada </h2>
            <Link to="/projetoxis/">Quero voltar a pagina home</Link>
        </section>
    )
}

export default Erro