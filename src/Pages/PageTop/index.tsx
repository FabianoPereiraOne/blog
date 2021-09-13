import Footer from "../../Components/Footer"
import Header from "../../Components/Header"
import Nav from "../../Components/Nav"
import { BlogContext } from "../../Context"
import { useContext, useEffect } from 'react'
import { fireload } from "../../Services/firebaseConection";
import Loading from "../../Components/Loading";
import Styled from './pageTop.module.css'
import SectionPostTen from "../../Components/SectionPostTen"

function PageTop() {
    const { loading, handlePostTen,setLoading } = useContext(BlogContext)

    useEffect(() => {
        setLoading(true)
        try {
            fireload();
            handlePostTen()
        } catch (e) {
            console.error(e);
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [])

    if (!loading) {
        return (
            <div className={Styled.page}>
                <Header />
                <Nav active="top" />
                <SectionPostTen />
                <Footer />
            </div>
        )
    } else {
        return <Loading />
    }
}

export default PageTop