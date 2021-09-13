import Styled from './empty.module.css'
import empty from "../../assets/empty_client.svg";

function Empty(){
    return(
        <div className={Styled.post_empty}>
                <img src={empty} alt="Nenhum post" />
                <article>
                  <h2>Nenhum post a ser exibido.</h2>
                  <p>Volte mais tarde!!!</p>
                </article>
              </div>
    )
}

export default Empty