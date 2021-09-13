import { BrowserRouter, Switch } from 'react-router-dom'
import Rota from './router'

// Pages
import Home from  '../Pages/Home'
import Erro from '../Pages/Erro'
import Post from '../Pages/Post'
import PageTop from '../Pages/PageTop'
import EnvioArquivo from '../Pages/EnvioArquivo'
import Download from '../Pages/Download'
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard'

function Routers(){

    return(
        <BrowserRouter>
            <Switch>
                <Rota exact path="/projetoxis/" isPrivate={ false } privateException={ false } component={ Home }/>
                <Rota exact path="/projetoxis/post/:id" isPrivate={ false } privateException={ false } component={ Post }/>
                <Rota exact path="/projetoxis/posts/top-10" isPrivate={ false } privateException={ false } component={ PageTop }/>
                <Rota exact path="/projetoxis/posts/envio-arquivo" isPrivate={ false } privateException={ false } component={ EnvioArquivo }/>
                <Rota exact path="/projetoxis/download/:id" isPrivate={ false } privateException={ false } component={ Download }/>
                <Rota exact path="/projetoxis/private/login" isPrivate={ false } privateException={ true } component={ Login }/>
                <Rota exact path="/projetoxis/dashboard" isPrivate={ true } privateException={ false } component={ Dashboard }/>
                <Rota path="*" isPrivate={ false } privateException={ false } component={ Erro }/>
            </Switch>
        </BrowserRouter>
    )
}


export default Routers