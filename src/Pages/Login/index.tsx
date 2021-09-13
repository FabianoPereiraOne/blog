import { useContext, useEffect, useState } from 'react';
import { Background } from '../../Components/Global';
import { BlogContext } from '../../Context';
import { fireload } from '../../Services/firebaseConection';
import Styled from './login.module.css'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading';


function Login() {

    const { webStructures, getWebStructures, loading, resetPassword, signInUser, verificUser, setLoading } = useContext(BlogContext)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [resetEmail, setResetEmail] = useState('')
    const [checkStatus, setCheckStatus] = useState(false)
    const [popupResetPassword, setPopupResetPassword] = useState(false)

    useEffect(() => {
        setLoading(true)
        try {
            fireload()
            verificUser()
            getWebStructures()
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [])

    function login(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (email === '' && senha === '') {
            toast.info("Preencha todos os campos!")
        } else {
            signInUser(email, senha, checkStatus)
        }
    }

    if (!loading) {
        return (
            <Background className={Styled.section_login} background={webStructures.backgroundUrl && webStructures.backgroundUrl}>
                <Link to="/projetoxis/" className={Styled.closeHome}>
                    <img src={webStructures.logoUrl} alt="logo" />
                    <strong>{webStructures.logoName}</strong>
                </Link>

                {!popupResetPassword ? (
                    <form onSubmit={login} className={Styled.form_sign}>
                        <h5>Login</h5>
                        <div className={Styled.form_group}>
                            <label>Email:</label>
                            <input maxLength={60} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={Styled.form_group}>
                            <label>Senha:</label>
                            <input maxLength={50} type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>
                        <div className={Styled.form_check_save}>
                            <label>
                                <input type="checkbox" onChange={() => setCheckStatus(!checkStatus)} />
                                <span>Lembrar</span>
                            </label>
                        </div>

                        <button type="submit" className={Styled.btn_login}>
                            Acessar
                        </button>
                        <button className={Styled.btnResetPass} onClick={() => setPopupResetPassword(!popupResetPassword)}>
                            Esqueceu a senha?
                        </button>
                    </form>
                )

                    : (
                        <form className={Styled.form_reset_password} onSubmit={ (e:React.ChangeEvent<HTMLFormElement>)=> {
                            e.preventDefault()
                            resetPassword(resetEmail)
                            setResetEmail('')
                        } }>
                            <h5>Recuperação</h5>
                            <div className={Styled.form_group}>
                                <label>Digite seu email:</label>
                                <input maxLength={60} type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
                            </div>

                           <footer className={ Styled.form_footer }>
                            <button type="submit" className={Styled.btn_login}>
                                    Redefinir
                                </button>
                                <button className={Styled.btnResetPass} onClick={() => setPopupResetPassword(!popupResetPassword)}>
                                    Acessar dashboard?
                                </button>
                           </footer>
                        </form>
                    )}
            </Background>
        )
    } else {
        return <Loading />
    }
}

export default Login