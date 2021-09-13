import { useState, useContext } from 'react'
import  { FaPaperPlane } from 'react-icons/fa'
import { toast } from "react-toastify"
import Styled from './send.module.css'
import { BlogContext } from '../../Context/index'

function Send(){
    const [ name, setName ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ link, setLink ] = useState('')
    const { handleContribuicoes } = useContext(BlogContext)

    async function handleSendPost(e:React.ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        
        if( name !== ''&& title !== '' && link !== ''){
            handleContribuicoes(name,title,link)
            setName('')
            setTitle('')
            setLink('')
        }else{
            toast.info("Preencha todos os dados!")
            return
        }
    }

    return(
        <section className={ Styled.section_send }>
            <h2>Envie um post</h2>
            <p>Ajude a comunidade a crescer.</p>

            <form onSubmit={ handleSendPost }>
                <div className={ Styled.form_group }>
                    <label>Seu nome(*)</label>
                    <input maxLength={ 70 } placeholder="Digite seu nome" type="text" value={ name } onChange={ e => setName(e.target.value)}/>               
                </div> 
                <div className={ Styled.form_group }>
                    <label>Titulo do post(*)</label>
                    <input maxLength={ 70 }  placeholder="Escreva o nome do post" type="text" value={ title } onChange={ e => setTitle(e.target.value)}/>               
                </div> 
                <div className={ Styled.form_group }>
                    <label>Insira o link aqui(*)</label>
                    <input maxLength={ 70 } placeholder="Exemplo: Https://www.blogplay.com.br" type="text" value={ link } onChange={ e => setLink(e.target.value)}/>               
                </div> 
                <button type="submit">
                <FaPaperPlane/>
                <strong>Enviar</strong>
            </button>
            </form>
        </section>
    )
}

export default Send