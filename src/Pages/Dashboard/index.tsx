import { useEffect, useContext, useState } from "react"
import { Link } from "react-router-dom"
import { BlogContext } from "../../Context"
import { fireload } from "../../Services/firebaseConection"
import { FaBell, FaTrashAlt, FaSignOutAlt, FaRegTimesCircle } from 'react-icons/fa'
import { FiSettings, FiPlusCircle, FiHome } from 'react-icons/fi'
import { FadeLoader } from 'react-spinners'
import { SectionBackground } from "../../Components/Global"
import Configuracoes from "./Configuracoes"
import Inicio from './Inicio'
import Cadastro from "./Cadastro"
import Styled from './dashboard.module.css'
import Footer from '../../Components/Footer'
import EditPost from "./EditPost"
import Loading from "../../Components/Loading"

function Dashboard() {
    const { signOut, getMessagens,loading,setLoading, getContribuicoes, getPosts,verificUser, userDatas, getWebStructures, getTotPosts, webStructures, setTotalDatas, pageDash, setPageDash, mensagens, contribuicoes, handlDeleteNotification, postAll } = useContext(BlogContext)

    const [popupNotify, setPopupNotify] = useState({
        status: false,
        pageActive: 'mensagens'
    })
    const [popupProfile, setPopupProfile] = useState({
        status: false,
    })

    const popups = {
        notification,
        profile
    }

    function notification() {
        if (!popupNotify.status) {
            setPopupProfile({ ...popupProfile, status: false })
        }

        setPopupNotify({ ...popupNotify, status: !popupNotify.status })
    }

    function profile() {
        if (!popupProfile.status) {
            setPopupNotify({ ...popupNotify, status: false })
        }

        setPopupProfile({ ...popupProfile, status: !popupProfile.status })
    }

    useEffect(() => {
        setLoading(true)
        try {
            fireload()
            verificUser()
            getPosts()
            getTotPosts()
            getMessagens()
            getContribuicoes()
            getWebStructures()
        } catch (error) {
            console.log(error)
            setLoading(false) 
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {

        if (postAll.length > 0) {
            const calc = (tot: number, currentTot: number) => tot + currentTot

            const views = postAll.map((post) => {
                return post.view
            })

            const comments = postAll.map((post) => {
                return post.numberComments
            })

            const rating = postAll.map((post) => {
                return post.avaliacao
            })

            const share = postAll.map((post) => {
                return post.share
            })

            setTotalDatas({
                views: views.reduce(calc),
                comments: comments.reduce(calc),
                rating: rating.reduce(calc),
                share: share.reduce(calc)
            })
        } else {
            setTotalDatas({
                views: 0,
                comments: 0,
                rating: 0,
                share: 0
            })
        }
        // eslint-disable-next-line
    }, [postAll])

    function handleNavegationPage(page: string) {
        setPageDash(page)
        popups.profile()
    }

    if(!loading){
        return (
            <section className={Styled.content_dash}>
                <header>
                    <Link to="/projetoxis/" rel="noreferrer" className={Styled.content_logo}>
                        {webStructures.logoUrl ?
                            <img src={webStructures.logoUrl} alt={webStructures.logoName} />
                            : <FadeLoader color="#fff" />
                        }
                        <strong>{webStructures.logoName ? webStructures.logoName : 'BlogPlay'}</strong>
                    </Link>
    
                    <nav className={Styled.nav_dash}>
                        <button type="button" onClick={() => setPageDash('inicio')} className={pageDash === 'inicio' ? `${Styled.dash_active}` : ''}>Inicio</button>
                        <button type="button" onClick={() => setPageDash('cadastro')} className={pageDash === 'cadastro' ? `${Styled.dash_active}` : ''}>Cadastro</button>
                        <button type="button" onClick={() => setPageDash('configuracoes')} className={pageDash === 'configuracoes' ? `${Styled.dash_active}` : ''}>Configurações</button>
                    </nav>
    
                    <section className={Styled.section_profile}>
    
                        <div className={Styled.content_notification}>
                            <button type="button" className={Styled.btn_notify} onClick={() => popups.notification()}>
                                <FaBell />
                            </button>
                            {popupNotify.status === true && popupProfile.status === false ?
                                (
                                    <div className={Styled.notification}>
                                        <section className={Styled.not_section_one}>
                                            <SectionBackground className={Styled.section_header_not} background={webStructures.backgroundUrl}>
                                                <h3>Notificações</h3>
                                                <p>Você tem {
                                                    popupNotify.pageActive === 'mensagens' ?
                                                        mensagens.length
                                                        :
                                                        contribuicoes.length
                                                } {popupNotify.pageActive === 'mensagens' ? 'Mensagens' : 'Contribuições'}</p>
                                            </SectionBackground>
    
                                            <section className={Styled.section_action_not}>
                                                <div className={Styled.button_group}>
                                                    <button type="button" className={popupNotify.pageActive === 'mensagens' ? `${Styled.ativo}` : `${Styled.inativo}`} onClick={
                                                        () => setPopupNotify({
                                                            ...popupNotify, pageActive: 'mensagens'
                                                        })
                                                    }>Mensagens</button>
                                                    <button type="button" className={popupNotify.pageActive === 'contribuicoes' ? `${Styled.ativo}` : `${Styled.inativo}`} onClick={
                                                        () => setPopupNotify({
                                                            ...popupNotify, pageActive: 'contribuicoes'
                                                        })
                                                    }>Contribuições</button>
                                                </div>
                                                <hr />
                                            </section>
                                        </section>
                                        <section className={Styled.not_section_two}>
                                            <ul>
                                                {popupNotify.pageActive === 'mensagens' && mensagens.length > 0 ?
                                                    mensagens.map((msg) => {
                                                        return (
                                                            <li key={msg.id}>
                                                                <p className={Styled.name}><strong>Nome: </strong>{msg.name}</p>
                                                                <p className={Styled.textLarge}><strong>Mensagem: </strong>{msg.mensagem}</p>
                                                                <button type="button" onClick={() => handlDeleteNotification(msg.id, 'mensagens')}>
                                                                    <FaTrashAlt />
                                                                </button>
                                                            </li>
                                                        )
                                                    })
                                                    : popupNotify.pageActive === 'mensagens' && mensagens.length === 0 ?
                                                        <span>Nada a ser exibido!!!</span>
                                                        :
                                                        popupNotify.pageActive === 'contribuicoes' && contribuicoes.length > 0 ? contribuicoes.map((contri) => {
                                                            return (
                                                                <li key={contri.id}>
                                                                    <p className={Styled.name}><strong>Nome: </strong>{contri.name}</p>
                                                                    <p className={Styled.title}><strong>Titulo: </strong>{contri.title}</p>
                                                                    <p className={Styled.link}><strong>Link: </strong><a href={contri.link} target="_blank" rel="noreferrer">{contri.link}</a></p>
                                                                    <button type="button" onClick={() => handlDeleteNotification(contri.id, 'contribuicoes')}>
                                                                        <FaTrashAlt />
                                                                    </button>
                                                                </li>
                                                            )
                                                        })
    
                                                            : popupNotify.pageActive === 'contribuicoes' && contribuicoes.length === 0 ? <span>Nada a ser exibido!!!</span> : ''
                                                }
                                            </ul>
                                        </section>
                                    </div>
                                )
                                : ''
                            }
    
    
    
    
                        </div>
                        <button type="button" className={Styled.btn_profile} onClick={() => popups.profile()}>
                            {userDatas.imgProfile ?
                                <img src={userDatas.imgProfile} alt="Imagem de perfil" />
                                : <FadeLoader color="#fff" />
                            }
                        </button>
    
                        {
                            popupNotify.status === false && popupProfile.status === true ?
                                (
                                    <section className={Styled.popup_profile}>
                                        <button type="button" className={Styled.close_btn_profile} onClick={() => popups.profile()}>
                                            <FaRegTimesCircle />
                                        </button>
                                        <SectionBackground className={Styled.profile_header} background={webStructures.backgroundUrl}>
                                            <img src={userDatas.imgProfile} alt="Imagem de perfil" />
                                        </SectionBackground>
                                        <section className={Styled.profile_body}>
                                            <div className={Styled.profile_datas_user}>
                                                <label><strong>Nome: </strong> {userDatas.name} </label>
                                                <label><strong>Email: </strong> {userDatas.email} </label>
                                            </div>
                                            <nav className={Styled.nav_profile}>
                                                <hr />
                                                <button type="button" onClick={() => handleNavegationPage('inicio')}>
                                                    <FiHome /> Inicio</button>
                                                <button type="button" onClick={() => handleNavegationPage('cadastro')} >
                                                    <FiPlusCircle /> Cadastro</button>
                                                <button type="button" onClick={() => handleNavegationPage('configuracoes')} >    <FiSettings /> Configurações
                                                </button>
                                                <hr />
                                            </nav>
                                        </section>
                                        <section className={Styled.profile_footer}>
                                            <button type="button" onClick={signOut}>
                                                <FaSignOutAlt />
                                                Logout
                                            </button>
                                        </section>
                                    </section>
                                )
                                : ''
                        }
                    </section>
                </header>
    
                {
                    pageDash === 'inicio' ? <Inicio />
                        : pageDash === 'cadastro' ? <Cadastro />
                            : pageDash === 'editPost' ? <EditPost /> : <Configuracoes />
                }
    
                <Footer />
    
            </section>
        )
    }else{
        return <Loading />
    }
}


export default Dashboard