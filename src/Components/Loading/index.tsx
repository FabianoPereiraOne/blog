import { ScaleLoader } from "react-spinners";
import Styled from './loading.module.css'

function Loading(){
    return (
        <article className={ Styled.loading }>
          <p>
            <ScaleLoader color="#75AEAE" loading={true} />
            <span>Carregando...</span>
          </p>
        </article>
      );
}

export default Loading