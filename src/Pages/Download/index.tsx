import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import { BlogContext } from "../../Context";
import { fireload } from "../../Services/firebaseConection";
import Styled from "./download.module.css";
import { IoReturnDownBackOutline } from "react-icons/io5";

let interval: NodeJS.Timeout;
type Id = {
  id: string;
};

function Download() {
  const [time, setTime] = useState(5);
  const [timeStatus, setTimeStatus] = useState(false);
  const [anchorLocal, setAnchorLocal] = useState("/");
  const { id } = useParams<Id>();

  const {
    post,
    isEmptyPost,
    loading,
    downloadAds,
    handlePost,
    getDownloadAds,
    getWebStructures,
    setLoading
  } = useContext(BlogContext);

  useEffect(() => {
    setLoading(true)
    try {
      fireload();
      handleGetLink();
      getDownloadAds()
      getWebStructures()
    } catch (error) {
      console.log(error);
      setLoading(false)
    }

    handleTime()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(interval);
      setTimeStatus(true);
    }
  }, [time]);

  function handleTime() {
    interval = setInterval(() => {
      setTime((timeInsideState) => timeInsideState - 1);
    }, 2000);
  }

  function handleGetLink() {
    if (Object.values(post).length > 0) {
      setAnchorLocal(post.link);
    } else {
      handlePost(id);
    }
  }

  useEffect(() => {
    if (isEmptyPost === false) {
      handleGetLink();
    }
    // eslint-disable-next-line
  }, [isEmptyPost]);

  if (!loading) {
    return (
      <section className={Styled.section_download}>
        <article className={ !isEmptyPost ? Styled.section_ads : Styled.section_ads_hidden}>
          {
            Object.values(downloadAds).map((ads, index) => {
              if (index < 5) {
                if (ads.id !== '') {
                  return (
                    <a href={ads.link} rel="noreferrer" key={`downAds-${index}`} target="_blank">
                      <img src={ads.capa} alt={ads.name} />
                    </a>
                  );
                }else{
                  return ''
                }
              }else{
                return ''
              }
            })}
        </article>
        <article className={Styled.section_actionAnchor}>
          <h4>Seu link estará disponível em breve...</h4>

          {!timeStatus && time >= 0 ? (
            <time className={Styled.span_time}>
              <strong>{time}</strong>
            </time>
          ) : (
            <a href={anchorLocal} rel="noreferrer" className={Styled.anchorTime} target="_blank">
              Acessar link
            </a>
          )}

          <Link to="/projetoxis/" className={Styled.span_return}>
            <IoReturnDownBackOutline />
          </Link>
        </article>
        <article className={!isEmptyPost ? Styled.section_ads : Styled.section_ads_hidden}>
          {
            Object.values(downloadAds).map((ads, index) => {
              if (index >= 5 && index < 10) {
                if (ads.id !== '') {
                  return (
                    <a href={ads.link} rel="noreferrer" key={`downAds-${index}`} target="_blank">
                      <img src={ads.capa} alt={ads.name} />
                    </a>
                  )
                }else{
                  return ''
                }
              }else{
                return ''
              }
            })}
        </article>
      </section>
    );
  } else {
    return <Loading />;
  }
}

export default Download;
