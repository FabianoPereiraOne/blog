import { useContext, useEffect } from "react"
import { BlogContext } from "../../Context"
import { fireload } from "../../Services/firebaseConection"
import Footer from "../../Components/Footer"
import Header from "../../Components/Header"
import Nav from "../../Components/Nav"
import Send from "../../Components/Send"
import Styled from './envioArquivo.module.css'

function EnvioArquivo() {
    const { handlePostTen } = useContext(BlogContext)

    useEffect(() => {
        try {
            fireload();
            handlePostTen()
        } catch (e) {
            console.error(e);
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className={Styled.page}>
            <Header />
            <Nav active="archive" />
            <Send />
            <Footer />
        </div>
    )
}

export default EnvioArquivo