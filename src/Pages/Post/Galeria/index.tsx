
import { useContext } from 'react'
import { BlogContext } from '../../../Context'
import Styled from './galeria.module.css'

function Galeria(){
    const { post } = useContext(BlogContext)

    return (
        <section className={ Styled.card_images }>
            <h2>Galeria de imagens</h2>
            <h4>Veja algumas das fotos desse post.</h4>

            <div className={ Styled.card_imagesCenter }>
                {
                    post.imageGalery.length > 0 ?
                    post.imageGalery.map(( photo, index )=>{
                        return(
                            <img key={ index } src={ photo.url } alt={ `Foto ${ index + 1 }` } />
                        )
                    })
                    : 
                    (   
                        <span>Nenhuma imagem a ser exibida</span>
                    )
                }
            </div>
        </section>
    )
}

export default Galeria