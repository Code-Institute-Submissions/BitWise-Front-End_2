import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useParams } from "react-router-dom";

const useArticleDelete = (pk, setArticles) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/articles/${pk}/`);

      if (
        window.location.pathname === "" ||
        window.location.pathname === "/" ||
        window.location.pathname.startsWith("/profile/")
      ) {
        setArticles((prevArticles) => ({
          ...prevArticles,
          results: prevArticles.results.filter((article) => article.id !== pk),
        }));
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err);
    }
  };

  return { handleDelete, error };
};

export default useArticleDelete;
