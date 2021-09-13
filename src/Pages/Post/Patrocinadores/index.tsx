import { useContext } from "react"
import { BlogContext } from "../../../Context"
import { FaUserGraduate } from 'react-icons/fa'
import { FiAward, FiArrowRight } from 'react-icons/fi'
import Styled from './patrocinadores.module.css'
import { Link } from 'react-router-dom'

function Patrocinadores() {
    const { patrocinadores } = useContext(BlogContext)

    return (
        <section className={Styled.container_patrocinadores}>
            <h2>Patrocinadores</h2>
            <p className={Styled.subTitle}>Veja alguns de nossos apoiadores e aproveite o melhor que eles tem a oferecer.</p>

            <section className={Styled.section_patrocinadores}>
                <div className={patrocinadores.length > 0 ? Styled.section_members_center : Styled.section_members_hidden}>
                    {patrocinadores.length > 0 &&
                        patrocinadores.map((member, index) => {
                            return (
                                <div className={Styled.anchorApoiador} key={index.toString()}>
                                    <FiAward className={Styled.icon_member} />
                                    <label>{member.name}</label>
                                    <a href={member.link} rel="noreferrer" target="_blank">
                                        Acessar
                                        <FiArrowRight />
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>

                {patrocinadores.length === 0 && (
                    <p className={Styled.members_is_empty}>
                        Nenhum patrocinador disponivel
                    </p>
                )}
            </section>

            <Link to="#" className={Styled.checkup_members}>
                <FaUserGraduate />
                <strong>Seja apoiador</strong>
            </Link>
        </section>
    )
}

export default Patrocinadores