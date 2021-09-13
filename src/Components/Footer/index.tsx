import logo from '../../assets/logo.svg'
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Styled from './footer.module.css'
import { useContext } from 'react'
import { BlogContext } from '../../Context'

function Footer() {

    const {
        webStructures
    } = useContext(BlogContext)

    function handleScroll() {
        let element = document.querySelector('.page')
        element?.scrollIntoView()
    }

    return (
        <footer className={Styled.rodape}>
            <nav>
                <h5>Menu</h5>
                <ul>
                    <li><Link to="#" onClick={handleScroll}>Home</Link></li>
                    <li><Link to="/projetoxis/posts/top-10">Top 10</Link></li>
                    <li><Link to="/projetoxis/private/login">Login</Link></li>
                </ul>
            </nav>
            <article className={Styled.copy}>
                <section>
                    <img src={webStructures.logoUrl ? `${webStructures.logoUrl}` : logo} alt="Logo" />
                    <span>{webStructures.logoName ? `${webStructures.logoName}` : 'BlogPlay'}</span>
                </section>
                <section>
                    <small>&copy; Copyright 2021</small>
                </section>
                <section>
                    <small>Desenvolvido por Fabiano Pereira</small>
                </section>
            </article>
            <article className={Styled.social}>
                <div>
                    <Link to="#"><FaFacebook /></Link>
                    <Link to="#"><FaYoutube /></Link>
                </div>
                <div>
                    <Link to="#"><FaInstagram /></Link>
                    <Link to="#"><FaTwitter /></Link>
                </div>
            </article>
        </footer>
    )
}

export default Footer