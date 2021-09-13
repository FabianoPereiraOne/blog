import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { BlogContext } from '../Context/index'

type Params = {
    component: any,
    privateException: boolean,
    isPrivate: boolean,
    exact?: boolean,
    path: string
}

function Rota({
    component: Component,
    privateException,
    isPrivate,
    ...rest
}: Params){


    const { signed } = useContext(BlogContext)

    if(privateException && signed){
        return <Redirect to="/projetoxis/dashboard"/>
    }
    
    if(!signed && isPrivate){
        return <Redirect to="/projetoxis/private/login"/>
    }

    return (
        <Route { ...rest } render={ props => (
            <Component { ...props} />
        )}/>
    )
}

export default Rota