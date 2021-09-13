
import { useContext } from "react";
import { BlogContext } from "../../../../../Context";
import { LabelUploadAds } from "../../../../../Components/Global";
import {
  FaPlus,
  FaRegTimesCircle,
} from "react-icons/fa";
import Styled from '../cadastroAnuncios.module.css'


function DownloadAds() {
  const { setFile, downloadAds, handleDeleteAds, setEditAds } = useContext(BlogContext);


  return (
    <>
      {
        Object.values(downloadAds).map((item, index) => {
          if (item.capa !== '') {
            return (
              <LabelUploadAds
                key={index.toString()}
                data-texto={`Campanhia ${index + 1}`}
                background={item.capa}
              >
                <button onClick={() => handleDeleteAds({
                  id: item.id,
                  ref: 'downloadAds',
                  nameImg: item.nameImg,
                  index
                })}>
                  <FaRegTimesCircle />
                </button>
              </LabelUploadAds>
            )
          } else {
            return (
              <LabelUploadAds
                key={index.toString()}
                data-texto={''}
                background={'transparent'}
              >
                <span className={Styled.addAds}>
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      setFile({
                        file: e,
                        ref: 'downloadAds',
                        index: item.index
                      })
                      setEditAds(true)
                    }}
                  />
                  <FaPlus />
                </span>
              </LabelUploadAds>
            )
          }
        })
      }

    </>
  )
}

export default DownloadAds