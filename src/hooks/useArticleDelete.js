import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";

const useArticleDelete = (pk, setArticles) => {
  const [error, setError] = useState(null);
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();
  const navigate = useNavigate();

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
      setSuccessToast("Article Deleted");
    } catch (err) {
      setError(err);
      setFailToast(
        `Unable to delete article (status: ${err.response?.status})`
      );
    }
  };

  return { handleDelete, error };
};

export default useArticleDelete;
