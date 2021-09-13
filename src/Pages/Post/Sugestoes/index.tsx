import { BlogContext } from '../../../Context'
import { useState, useContext } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { toast } from "react-toastify"
import Styled from './sugestoes.module.css'

function Sugestoes() {
    const [name, setName] = useState('')
    const [feedBack, setFeedBack] = useState('')
    const { handleMessagens } = useContext(BlogContext)

    function handleSendFeed(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (name !== '' && feedBack !== '') {

            handleMessagens(name, feedBack)
            setName('')
            setFeedBack('')
        } else {
            toast.info("Preencha todos os dados!")
            return
        }
    }


    return (
        <section className={Styled.section_sugestoes}>
            <h2>Deixe sua opinião</h2>
            <p>Agradecemos pelo feedBack.</p>
            <form onSubmit={handleSendFeed}>
                <div className={Styled.form_group}>
                    <label>Seu nome( Obrigatório )</label>
                    <input maxLength={78} type="text" placeholder="Digite seu nome" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className={Styled.form_group}>
                    <label>Comente( Obrigatório )</label>
                    <textarea maxLength={500} value={feedBack} placeholder="Comente sua opinião aqui" onChange={e => setFeedBack(e.target.value)} />
                </div>
                <button type="submit">
                    <FaPaperPlane />
                    Enviar
                </button>
            </form>
        </section>
    )
}

export default Sugestoes