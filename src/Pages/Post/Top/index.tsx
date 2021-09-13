import { BlogContext } from "../../../Context";
import { useContext, useEffect } from "react";
import Loading from "../../../Components/Loading";
import SectionPostTen from "../../../Components/SectionPostTen";

function Top() {
  const {
    loading,
    setLoading,
    handlePostTen,
  } = useContext(BlogContext);

  useEffect(() => {
    setLoading(true)

    try {
      handlePostTen();
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
    // eslint-disable-next-line
  }, []);


  if (!loading) {
    return <SectionPostTen />
  } else {
    return <Loading />
  }
}

export default Top;
