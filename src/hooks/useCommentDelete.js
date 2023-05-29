import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";

const useCommentDelete = (id, setArticle, setComments) => {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setArticle((prevArticle) => ({
        results: [
          {
            ...prevArticle.results[0],
            comments_count: prevArticle.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      setError(err);
    }
  };

  return { handleDelete, error };
};

export default useCommentDelete;
