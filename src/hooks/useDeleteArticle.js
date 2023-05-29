import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useParams } from "react-router-dom";

const useDeleteArticle = (pk, setArticles) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/articles/${pk}/`);
      if (id) {
        navigate(-1);
      } else {
        setArticles((prevArticles) => ({
          ...prevArticles,
          results: prevArticles.results.filter((article) => article.id !== pk),
        }));
      }
    } catch (err) {
      setError(err);
    }
  };

  return { handleDelete, error };
};

export default useDeleteArticle;
