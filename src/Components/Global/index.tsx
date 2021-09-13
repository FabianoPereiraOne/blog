import styled from "styled-components";
import { Link } from "react-router-dom";

type AnchorProps = {
  capa?: string;
  as?: React.ElementType | keyof JSX.IntrinsicElements;
};

type MainProps = {
  background?: string;
  as?: React.ElementType | keyof JSX.IntrinsicElements;
};

type AnchorTop = {
  capa?: string;
  as?: React.ElementType | keyof JSX.IntrinsicElements;
};

type LabelArchive = {
  background?: string;
  as?: React.ElementType | keyof JSX.IntrinsicElements;
};

type LabelUpAds = {
  background?: string;
  as?: React.ElementType | keyof JSX.IntrinsicElements;
}

export const BtnPrivate = styled(Link)`
  width: 190px;
  height: 50px;
  background: #75aeae;
  border-radius: 2.8rem;
  color: #fff;
  padding: 0.5rem 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: 0.3s ease;
`;

export const Card = styled(Link) <AnchorProps>`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0.3)),
    Url(${(props) => props.capa});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;


export const CardTop = styled.button<AnchorTop>`
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0.3)),
    Url(${(props) => props.capa});
  border: none;
`;


export const Main = styled.main<MainProps>`
  background: Url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Background = styled.section<MainProps>`
  background: Url(${(props) => props.background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
export const BannerAds = styled.a<MainProps>`
  background: Url(${(props) => props.background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 0.5rem;
`
export const SectionBackground = styled.section<MainProps>`
  background: Url(${(props) => props.background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const CapaUpload = styled.label<LabelArchive>`
  background: Url(${props => props.background});
`

export const LabelUpload = styled.label<LabelArchive>`
  background: Url(${props => props.background});
`

export const LabelUploadAds = styled.label<LabelUpAds>`
  background: ${props => props.background === "transparent" ? "#fff" : `Url(${props.background})`};
  border: ${props => props.background === "transparent" ? "1px solid var(--gray-600)" : "none"};
`

export const LabelLogo = styled.label<LabelUpAds>`
  background: ${props => props.background === "transparent" ? "#fff" : `Url(${props.background})`};
  border: 1px solid var(--gray-600);
  background-size: 80%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: transparent;
`

export const LabelBackground = styled.label<LabelUpAds>`
  background: ${props => props.background === "transparent" ? "#fff" : `Url(${props.background})`};
  border: ${props => props.background === "transparent" ? "1px solid var(--gray-600)" : "none"};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`