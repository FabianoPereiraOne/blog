import { useContext } from 'react'
import CadastroPost from './CadastroPost'
import CadastroAnuncios from './CadastroAnuncios'
import Stylead from './cadastro.module.css'
import { BlogContext } from '../../../Context'

function Cadastro(){
    const { setActivePage,activePage } = useContext(BlogContext)

    return (
        <section className={ Stylead.section_cadastro }>
            <nav className={ Stylead.nav_group }>
                <button onClick={()=> setActivePage('post')} className={ activePage === 'post'? `${ Stylead.activeBtn }` : ''}>Publicação</button>
                <button onClick={()=> setActivePage('ads')} className={ activePage === 'ads'? `${ Stylead.activeBtn }` : ''}>Anuncios</button>
            </nav>

            {
                activePage === 'post' ?
                (
                    <CadastroPost/>
                )
                :
                (
                    <CadastroAnuncios/>
                )
            }
        </section>
    )
}

export default Cadastro 